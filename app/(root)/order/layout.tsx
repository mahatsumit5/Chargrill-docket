import UserAndOrderLayout from "@/components/layout/UserAndOrderLayout";
import { TopHeaderButtons } from "@/components/order/OrderPageComponents";
import { Subtitle, Title } from "@/components/title/Title";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col w-full gap-2 ">
      <div className="flex justify-between w-full items-center flex-col gap-5 lg:flex-row">
        <div className="flex flex-col items-start w-full">
          <Title title="Orders" />
          <Subtitle subTitle="An overview of recent data of orders,product details and analysis." />
        </div>
        <TopHeaderButtons />
      </div>

      {children}
    </div>
  );
}
