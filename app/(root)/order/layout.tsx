import UserAndOrderLayout from "@/components/layout/UserAndOrderLayout";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserAndOrderLayout btnName="Create new order" title="Order Management">
      {children}
    </UserAndOrderLayout>
  );
}
