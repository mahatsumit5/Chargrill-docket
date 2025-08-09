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
          <Title title="Items" />
          <Subtitle subTitle="List of available items." />
        </div>
      </div>

      {children}
    </div>
  );
}
