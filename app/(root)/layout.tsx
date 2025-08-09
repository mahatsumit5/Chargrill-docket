"use client";
import { AppSidebar } from "@/components/app-sidebar";
import BreadCrumbComponent from "@/components/breadCrumb/BreadCrumb";
import Footer from "@/components/Footer";
import { Header } from "@/components/header/Header";
import LoadingModal from "@/components/modal/LoadingModal";
import { LoaderOne } from "@/components/ui/loader";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { persistor, store } from "@/redux/store";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <div className="min-h-screen min-w-screen flex justify-between items-center">
            <LoaderOne />
          </div>
        }
        persistor={persistor}
      >
        <SidebarProvider>
          <AppSidebar />
          <LoadingModal />
          <div className="flex w-full   flex-col min-h-screen bg-background ">
            <Header />

            <main className="flex-1 h-full w-full  max-w-[1400px] mx-auto px-4">
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
