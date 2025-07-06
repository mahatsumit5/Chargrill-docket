import UserAndOrderLayout from "@/components/layout/UserAndOrderLayout";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserAndOrderLayout btnName="Add new item" title="Catalogue">
      {children}
    </UserAndOrderLayout>
  );
}
