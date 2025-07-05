export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col w-full  ">
      <div className="flex justify-between">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Orders Management
        </h4>
      </div>

      {children}
    </div>
  );
}
