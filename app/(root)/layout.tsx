"use client";
import { AppSidebar } from "@/components/app-sidebar";
import BreadCrumbComponent from "@/components/breadCrumb/BreadCrumb";
import Footer from "@/components/Footer";
import { Modal } from "@/components/modal";
import LoadingModal from "@/components/modal/LoadingModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { persistor, store } from "@/redux/store";
import { MoonStar, ShoppingCart, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { setTheme, theme } = useTheme();
  const router = useRouter();
  return (
    <Provider store={store}>
      <PersistGate loading={<>Please wait</>} persistor={persistor}>
        <SidebarProvider>
          <AppSidebar />
          <LoadingModal />
          <div className="flex w-full flex-col min-h-screen bg-background ">
            {/* header */}
            <div className=" w-full  bg-primary">
              <header className=" flex w-full justify-between items-center p-2   max-w-[1400px] m-auto">
                <div className="flex gap-5 justify-start items-center  w-full">
                  <SidebarTrigger className="text-background" />

                  <Input
                    className="w-[250px]  rounded-full h-6 hidden md:block  "
                    type="text"
                    placeholder="search......"
                  />
                </div>
                <div className="flex w-full justify-end gap-2">
                  <Button
                    variant={"outline"}
                    size={"icon"}
                    onClick={() => {
                      router.push("/cart");
                    }}
                    className="hover:bg-secondary"
                  >
                    <ShoppingCart />
                  </Button>
                  <Button
                    variant={"outline"}
                    size={"icon"}
                    onClick={() =>
                      setTheme(theme === "light" ? "dark" : "light")
                    }
                    className="hover:bg-secondary"
                  >
                    {theme === "light" ? (
                      <Sun color="gold" className="animate-spin" />
                    ) : (
                      <MoonStar color="skyblue" className="animate-bounce" />
                    )}
                  </Button>
                </div>
              </header>
            </div>

            <main className="flex-1 h-full w-full   p-2 max-w-[1400px] mx-auto">
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
