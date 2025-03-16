import { NextRequest, NextResponse } from "next/server";
import { updateUserPaymentStatus } from "@/lib/models/user";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    if (!secretKey) {
      console.error("🚨 PAYSTACK_SECRET_KEY is missing in env file!");
      return NextResponse.json(
        { error: "Server misconfiguration" },
        { status: 500 }
      );
    }

    const body = await req.text(); // Use raw text to verify signature
    const signature = req.headers.get("x-paystack-signature");

    // 🔍 1️⃣ Validate Signature
    if (!signature) {
      console.error("🚨 Missing x-paystack-signature header!");
      return NextResponse.json({ error: "Signature missing" }, { status: 400 });
    }

    const hash = crypto
      .createHmac("sha512", secretKey)
      .update(body)
      .digest("hex");
    if (hash !== signature) {
      console.error("🚨 Invalid Paystack signature!");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    // 🔍 2️⃣ Process Webhook Event
    const { event, data } = JSON.parse(body);
    console.log("✅ Webhook Event Received:", event);

    if (event === "charge.success") {
      const email = data.customer?.email;
      if (!email) {
        console.error("🚨 Missing email in Paystack response:", data);
        return NextResponse.json(
          { error: "Invalid webhook data" },
          { status: 400 }
        );
      }

      const status = data.status === "success" ? "Paid" : "Failed";

      // 🛠️ Update Payment Status in Database
      await updateUserPaymentStatus(email, status);
      console.log(`✅ Payment status updated for ${email}: ${status}`);
    }

    return NextResponse.json({ message: "Webhook received" }, { status: 200 });
  } catch (error) {
    console.error("❌ Webhook Processing Error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
