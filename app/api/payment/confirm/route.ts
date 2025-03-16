import { NextRequest, NextResponse } from "next/server";
import { createUser, updateUserPaymentStatus } from "@/lib/models/user";

export async function POST(req: NextRequest) {
  try {
    const { reference, userData } = await req.json();

    if (!reference) {
      return NextResponse.json(
        { error: "Transaction reference is required." },
        { status: 400 }
      );
    }

    if (!userData?.email || !userData?.skills) {
      return NextResponse.json(
        { error: "Incomplete user data provided." },
        { status: 400 }
      );
    }

    // Verify transaction with Paystack
    const verifyResponse = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    const verifyData = await verifyResponse.json();

    // Determine payment status
    const paymentStatus =
      verifyData.status === true && verifyData.data?.status === "success"
        ? "Paid"
        : "Failed";

    // Save user payment status
    const user = await createUser({ ...userData, paymentStatus });
    if (!user) {
      return NextResponse.json(
        { error: "Failed to save user data." },
        { status: 500 }
      );
    }

    await updateUserPaymentStatus(user.toString(), paymentStatus);

    if (paymentStatus === "Paid") {
      return NextResponse.json(
        { message: "Payment confirmed successfully.", paymentStatus },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          error: "Payment verification failed despite successful transaction.",
        },
        { status: 400 }
      );
    }
  } catch {
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
