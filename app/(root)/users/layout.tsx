import SemiLayout from "@/components/layout/SemiLayout";
import { Subtitle, Title } from "@/components/title/Title";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SemiLayout
      title="User Management"
      subTitle="Manage your customer details."
      btnName="Add  Customer"
    >
      {children}
    </SemiLayout>
  );
}
