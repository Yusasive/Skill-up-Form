import { connectToDatabase } from '@/lib/mongodb';

export async function createCoupon(code: string, discountPercentage: number, expiryDate: Date) {
  const { db } = await connectToDatabase();
  const result = await db.collection('coupons').insertOne({
    code,
    discountPercentage,
    expiryDate,
    createdAt: new Date(),
  });
  return result.insertedId;
}

export async function getCoupon(code: string) {
  const { db } = await connectToDatabase();
  const coupon = await db.collection('coupons').findOne({ code });
  return coupon;
}

export async function deleteCoupon(code: string) {
  const { db } = await connectToDatabase();
  const result = await db.collection('coupons').deleteOne({ code });
  return result.deletedCount > 0;
}
