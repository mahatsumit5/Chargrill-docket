import Footer from "@/components/Footer";
import CalendarPage from "@/components/FullCalendar";
import Header from "@/components/Header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen ">
      <Header />
      <main className="flex h-full justify-center ">
        <CalendarPage />
      </main>
      <Footer />
    </div>
  );
}
