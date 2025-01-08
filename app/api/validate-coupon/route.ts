import { NextResponse } from 'next/server';

const coupons = {
  DISCOUNT10: 10,
  SAVE20: 20, 
} as const; 

type CouponCode = keyof typeof coupons;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { couponCode, originalPrice } = body as {
      couponCode: CouponCode;
      originalPrice: number;
    };

    if (!couponCode || !originalPrice || isNaN(originalPrice)) {
      return NextResponse.json(
        { success: false, message: 'Invalid request data.' },
        { status: 400 }
      );
    }

    const discount = coupons[couponCode];
    if (!discount) {
      return NextResponse.json(
        { success: false, message: 'Invalid coupon code.' },
        { status: 400 }
      );
    }

    const newPrice = originalPrice - (originalPrice * discount) / 100;

    return NextResponse.json({
      success: true,
      discount,
      newPrice,
      message: `Coupon applied! You received a ${discount}% discount.`,
    });
  } catch (error) {
    console.error('Error validating coupon:', error);
    return NextResponse.json(
      { success: false, message: 'Something went wrong.' },
      { status: 500 }
    );
  }
}
