import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const payload = await req.json();

    const secretHash = process.env.FLUTTERWAVE_WEBHOOK_SECRET;
    const signature = req.headers.get("verif-hash");

    if (!signature || signature !== secretHash) {
      return NextResponse.json(
        { success: false, message: "Invalid signature" },
        { status: 401 }
      );
    }

    if (
      payload.event === "charge.completed" &&
      payload.data.status === "successful"
    ) {
      console.log("Payment successful:", payload.data);


      return NextResponse.json({
        success: true,
        message: "Payment processed successfully",
        data: payload.data, 
      });
    }

    return NextResponse.json(
      {
        success: false,
        message: "Event not handled or payment not successful",
      },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
