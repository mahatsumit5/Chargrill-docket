import { Subtitle, Title } from "@/components/title/Title";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col w-full gap-2 ">
      <Title title="User Management" />
      <Subtitle subTitle="Manage your customer details here." />

      {children}
    </div>
  );
}
