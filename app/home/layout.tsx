"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen ">
      <Header />
      <main className="flex h-full justify-center items-center m-5 min-h-screen">
        {children}
      </main>
      <Footer />
    </div>
  );
}
