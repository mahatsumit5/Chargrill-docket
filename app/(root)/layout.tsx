"use client";
import { AppSidebar } from "@/components/app-sidebar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { store } from "@/redux/store";
import { MoonStar, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Provider } from "react-redux";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { setTheme, theme } = useTheme();
  return (
    <Provider store={store()}>
      <SidebarProvider>
        <AppSidebar />
        <div className="flex w-full flex-col min-h-screen ">
          <header className="flex w-full justify-between items-center p-3 bg-background border-b border-primary/10 ">
            <SidebarTrigger className="" />
            <Button
              variant={"ghost"}
              size={"icon"}
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? (
                <Sun color="gold" className="animate-spin" />
              ) : (
                <MoonStar color="skyblue" className="animate-bounce" />
              )}
            </Button>
          </header>
          <main className="flex-1 h-full w-full">{children}</main>
          <Footer />
        </div>
      </SidebarProvider>
    </Provider>
  );
}
