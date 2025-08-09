import SemiLayout from "@/components/layout/SemiLayout";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SemiLayout
      title="Orders"
      subTitle="An overview of recent data of orders,product details and analysis."
      btnName="New Order"
    >
      {children}
    </SemiLayout>
  );
}
