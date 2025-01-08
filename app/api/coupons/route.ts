import { NextResponse } from 'next/server';
import { createCoupon, getCoupon, deleteCoupon } from '@/lib/models/coupon';

export async function POST(req: Request) {
  const { code, discountPercentage, expiryDate } = await req.json();

  try {
    const couponId = await createCoupon(code, discountPercentage, new Date(expiryDate));
    return NextResponse.json({ success: true, id: couponId });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create coupon' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  if (!code) return NextResponse.json({ error: 'Coupon code is required' }, { status: 400 });

  try {
    const coupon = await getCoupon(code);
    return coupon
      ? NextResponse.json(coupon)
      : NextResponse.json({ error: 'Coupon not found' }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch coupon' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const { code } = await req.json();

  try {
    const success = await deleteCoupon(code);
    return success
      ? NextResponse.json({ success: true })
      : NextResponse.json({ error: 'Failed to delete coupon' }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete coupon' }, { status: 500 });
  }
}
