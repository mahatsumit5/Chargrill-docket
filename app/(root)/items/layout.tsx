import SemiLayout from "@/components/layout/SemiLayout";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SemiLayout
      title="Items"
      subTitle="List of available items"
      btnName="New Item"
    >
      {children}
    </SemiLayout>
  );
}
