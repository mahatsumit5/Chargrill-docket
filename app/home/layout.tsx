"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { persistor, store } from "@/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <div className="flex flex-col min-h-screen ">
          <Header />
          <main className="flex h-full justify-center items-center m-5 min-h-screen">
            {children}
          </main>
          <Footer />
        </div>
      </PersistGate>
    </Provider>
  );
}
