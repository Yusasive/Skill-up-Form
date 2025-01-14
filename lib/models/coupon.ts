import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function createCoupon(
  code: string,
  discountPercentage: number,
  expiryDate: Date
) {
  const { db } = await connectToDatabase();
  const result = await db.collection("coupons").insertOne({
    code,
    discountPercentage,
    expiryDate,
    createdAt: new Date(),
  });
  return result.insertedId;
}

export async function getAllCoupons() {
  const { db } = await connectToDatabase();
  const coupons = await db.collection("coupons").find().toArray();
  return coupons.map((coupon) => ({
    _id: coupon._id,
    code: coupon.code,
    discountPercentage: coupon.discountPercentage,
    expiryDate: coupon.expiryDate,
  }));
}

export async function getCoupon(code: string) {
  const { db } = await connectToDatabase();
  const coupon = await db.collection("coupons").findOne({ code });
  return coupon;
}

export async function deleteCouponById(_id: string) {
  const { db } = await connectToDatabase();
  const result = await db
    .collection("coupons")
    .deleteOne({ _id: new ObjectId(_id) });
  return result.deletedCount > 0;
}


export async function updateCoupon(
  code: string,
  updatedFields: Partial<{ discountPercentage: number; expiryDate: Date }>
) {
  const { db } = await connectToDatabase();
  const result = await db
    .collection("coupons")
    .updateOne({ code }, { $set: updatedFields });
  return result.modifiedCount > 0;
}
