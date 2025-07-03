import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen ">
      <Header />
      <main className="flex-1 h-full justify-center ">{children}</main>
      <Footer />
    </div>
  );
}
