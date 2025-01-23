import { NextRequest, NextResponse } from "next/server";
import { createUser, updateUserPaymentStatus } from "@/lib/models/user";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function verifyAdmin(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized: No session found" },
      { status: 401 }
    );
  }

  if (session.user.role !== "admin") {
    return NextResponse.json(
      { error: "Forbidden: Insufficient permissions" },
      { status: 403 }
    );
  }

  return null;
}

export async function POST(req: NextRequest) {
  const adminError = await verifyAdmin(req);
  if (adminError) return adminError;

  try {
    const { transactionId, userData } = await req.json();

    if (!transactionId) {
      return NextResponse.json(
        { error: "Transaction ID is required." },
        { status: 400 }
      );
    }

    if (!userData || !userData.email || !userData.skills) {
      return NextResponse.json(
        { error: "Incomplete user data provided." },
        { status: 400 }
      );
    }

    const verifyResponse = await fetch(
      `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`,
      {
        headers: {
          Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const verifyData = await verifyResponse.json();

    let paymentStatus = "Pending";
    if (verifyData.status === "success") {
      console.log("Transaction verified successfully:", verifyData);
      paymentStatus = "Paid";
    } else {
      console.error("Verification failed:", verifyData);
      paymentStatus = "Failed";
    }

    const user = await createUser({
      ...userData,
      paymentStatus,
    });

    if (!user) {
      return NextResponse.json(
        { error: "Failed to save user data." },
        { status: 500 }
      );
    }

    await updateUserPaymentStatus(user.toString(), paymentStatus);

    return NextResponse.json({
      message: "Payment confirmation processed successfully.",
      paymentStatus,
    });
  } catch (error) {
    console.error("Error verifying transaction:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
