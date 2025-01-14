import { NextRequest, NextResponse } from "next/server";
import { createUser, updateUserPaymentStatus } from "@/lib/models/user";

export async function POST(req: NextRequest) {
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

    // Verify the transaction with Flutterwave
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

    let paymentStatus = "Pending"; // Default status

    if (verifyData.status === "success") {
      console.log("Transaction verified successfully:", verifyData);
      paymentStatus = "Paid";
    } else {
      console.error("Verification failed:", verifyData);
      paymentStatus = "Failed";
    }

    // Save user data to database
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

    // Added Payment status in case of "Pending" or other transitions
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
