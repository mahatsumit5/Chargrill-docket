import { DropdownMenuDemo } from "@/components/dropdown/DropdownMenu";
import UserAndOrderLayout from "@/components/layout/UserAndOrderLayout";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col w-full m ">
      <div className="flex justify-between flex-row items-center">
        <h4 className="scroll-m-20 text-md font-bold tracking-tight  text-primary text-sm sm:text-xl flex-1">
          User Management
        </h4>

        <DropdownMenuDemo />
      </div>

      {children}
    </div>
  );
}
