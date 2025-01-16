export const metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard for managing the application",
};

export default function AdminParentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
