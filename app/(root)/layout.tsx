"use client";
import { AppSidebar } from "@/components/app-sidebar";
import BreadCrumbComponent from "@/components/breadCrumb/BreadCrumb";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { persistor, store } from "@/redux/store";
import { MoonStar, ShoppingCart, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { setTheme, theme } = useTheme();

  return (
    <Provider store={store}>
      <PersistGate loading={<>Please wait</>} persistor={persistor}>
        <SidebarProvider>
          <AppSidebar />
          <div className="flex w-full flex-col min-h-screen bg-background ">
            {/* header */}
            <header className=" flex w-full justify-between items-center p-2  border-b border-border  ">
              <div className="flex gap-5 justify-start items-center  w-full">
                <SidebarTrigger className="" />

                <Input
                  className="w-[250px]  rounded-full h-6 hidden md:block bg-card "
                  type="text"
                  placeholder="search......"
                />
              </div>
              <div className="flex w-full justify-end gap-2">
                <Button variant={"secondary"} size={"icon"}>
                  <ShoppingCart />
                </Button>
                <Button
                  variant={"secondary"}
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
            <main className="flex-1 h-full w-full   p-2">
              <div className="">
                <BreadCrumbComponent />
              </div>
              {children}
            </main>
            <Footer />
          </div>
        </SidebarProvider>
      </PersistGate>
    </Provider>
  );
}
