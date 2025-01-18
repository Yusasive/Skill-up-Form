// import bcrypt from 'bcrypt';
// import { connectToDatabase } from '@/lib/mongodb';

// async function createAdmin() {
//   const { db } = await connectToDatabase();


//   const hashedPassword = await bcrypt.hash(password, 10);

//   const admin = await db.collection('admins').insertOne({
//     email,
//     password: hashedPassword,
//   });

//   console.log('Admin user created:', admin.insertedId);
// }

// createAdmin().catch(console.error);
