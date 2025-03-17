import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import {
  createCoupon,
  getCoupon,
  getAllCoupons,
  deleteCouponById,
  updateCoupon,
} from "@/lib/models/coupon";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";

async function verifyAdmin() {
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
 
export async function POST(req: Request) {
  const adminError = await verifyAdmin();
  if (adminError) return adminError;

  const { code, discountPercentage, expiryDate } = await req.json();

  if (!code || !discountPercentage || !expiryDate) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

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
  } catch (error) {
    console.error("Error fetching coupons:", error);
    return NextResponse.json(
      { error: "Failed to fetch coupons" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const adminError = await verifyAdmin();
  if (adminError) return adminError;

  const { _id } = await req.json();

  if (!_id || !ObjectId.isValid(_id)) {
    console.error("Invalid or missing ID:", _id);
    return NextResponse.json(
      { error: "Invalid or missing ID" },
      { status: 400 }
    );
  }

  try {
    console.log("Attempting to delete coupon with ID:", _id);
    const success = await deleteCouponById(String(_id));  

    if (!success) {
      console.error("Coupon not found for ID:", _id);
      return NextResponse.json({ error: "Coupon not found" }, { status: 404 });
    }

    console.log("Coupon deleted successfully:", _id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting coupon:", error);
    return NextResponse.json(
      { error: "Failed to delete coupon" },
      { status: 500 }
    );
  }
}


 
export async function PATCH(req: Request) {
  const adminError = await verifyAdmin();
  if (adminError) return adminError;

  const { code, updatedFields } = await req.json();

  if (!code || typeof code !== "string") {
    return NextResponse.json(
      { error: "Invalid or missing coupon code" },
      { status: 400 }
    );
  }

  if (!updatedFields || typeof updatedFields !== "object") {
    return NextResponse.json(
      { error: "Invalid or missing update fields" },
      { status: 400 }
    );
  }

  try {
    const success = await updateCoupon(code, updatedFields);
    return success
      ? NextResponse.json({ success: true })
      : NextResponse.json({ error: "Coupon not found" }, { status: 404 });
  } catch (error) {
    console.error("Error updating coupon:", error);
    return NextResponse.json(
      { error: "Failed to update coupon" },
      { status: 500 }
    );
  }
}
