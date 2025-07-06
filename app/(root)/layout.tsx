"use client";
import { AppSidebar } from "@/components/app-sidebar";
import BreadCrumbComponent from "@/components/breadCrumb/BreadCrumb";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { store } from "@/redux/store";
import { MoonStar, ShoppingBag, ShoppingCart, Sun } from "lucide-react";
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
          {/* header */}
          <header className="flex w-full justify-between items-center p-3 bg-background border-b border-primary/10 ">
            <div className="flex gap-5 justify-start items-center  w-full">
              <SidebarTrigger className="" />
              <span>
                <Input
                  className="w-[250px]  rounded-full shadow-primary shadow-lg "
                  type="text"
                  placeholder="search......"
                />
              </span>
            </div>
            <div className="flex w-full justify-end gap-2">
              <Button variant={"ghost"} size={"icon"}>
                <ShoppingCart />
              </Button>
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
            </div>
          </header>
          <main className="flex-1 h-full w-full p-3">
            <div>
              <BreadCrumbComponent />
            </div>
            {children}
          </main>
          <Footer />
        </div>
      </SidebarProvider>
    </Provider>
  );
}
