import { NextResponse } from "next/server";
import {
  createCoupon,
  getCoupon,
  getAllCoupons,
  deleteCouponById,
  updateCoupon,
} from "@/lib/models/coupon";

export async function POST(req: Request) {
  const { code, discountPercentage, expiryDate } = await req.json();

  try {
    const couponId = await createCoupon(
      code,
      discountPercentage,
      new Date(expiryDate)
    );
    return NextResponse.json({ success: true, id: couponId });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to create coupon" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  try {
    if (code) {
      const specificCoupon = await getCoupon(code);
      if (!specificCoupon) {
        return NextResponse.json(
          { error: "Coupon not found" },
          { status: 404 }
        );
      }
      if (new Date(specificCoupon.expiryDate) < new Date()) {
        return NextResponse.json(
          { error: "Coupon has expired" },
          { status: 400 }
        );
      }
      return NextResponse.json({
        _id: specificCoupon._id,
        code: specificCoupon.code,
        discountPercentage: specificCoupon.discountPercentage,
        expiryDate: specificCoupon.expiryDate,
      });
    } else {
      const coupons = await getAllCoupons();
      return NextResponse.json(coupons);
    }
  } catch {

    console.error("Error fetching coupons");
    return NextResponse.json(
      { error: "Failed to fetch coupons" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const { _id } = await req.json(); 

  try {
    if (_id) {
      const success = await deleteCouponById(_id);
      return success
        ? NextResponse.json({ success: true })
        : NextResponse.json(
            { error: "Failed to delete coupon by ID" },
            { status: 404 }
          );
    } else {
      return NextResponse.json(
        { error: "No valid identifier provided for deletion" },
        { status: 400 }
      );
    }
  } catch {

    console.error("Error deleting coupon");
    return NextResponse.json(
      { error: "Failed to delete coupon" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  const { code, updatedFields } = await req.json();

  try {
    const success = await updateCoupon(code, updatedFields);
    return success
      ? NextResponse.json({ success: true })
      : NextResponse.json(
          { error: "Failed to update coupon or coupon not found" },
          { status: 404 }
        );
  } catch {
  
    return NextResponse.json(
      { error: "Failed to update coupon" },
      { status: 500 }
    );
  }
}
