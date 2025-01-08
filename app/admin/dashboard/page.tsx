'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignOut = () => {
    signOut();
    router.push('/admin/login');
  };

  if (!session) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p>Welcome, {session.user.email}</p>
      <button
        onClick={handleSignOut}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Logout
      </button>

      <div className="mt-8 space-y-4">
        <button
          onClick={() => router.push('/admin/dashboard/users')}
          className="block w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          View Registered Users
        </button>
        <button
          onClick={() => router.push('/admin/dashboard/coupons')}
          className="block w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Manage Coupons
        </button>
      </div>
    </div>
  );
}
