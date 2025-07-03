"use client";
import CustomerTable from "@/components/cart/CustomerTable";
import OrderTable from "@/components/cart/OrderTable";
import PdfFile from "@/components/pdf/PdfGenerator";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import React from "react";

export default function Page() {
  const { items } = useAppSelector((s) => s.cart);
  const { customer } = useAppSelector((store) => store.cart);
  return items.length ? (
    <>
      <p className="text-xl font-bold"> Customer details</p>
      <CustomerTable />
      <p className="text-2xl font-bold">Order details</p>
      <OrderTable />
      <PDFViewer className="">
        <PdfFile cart={items} customer={customer} />
      </PDFViewer>
      <div>
        <PDFDownloadLink
          document={<PdfFile cart={items} customer={customer} />}
          fileName={"order-name"}
        >
          {({ loading }) =>
            loading ? (
              <Button variant={"outline"} disabled>
                loading....
              </Button>
            ) : (
              <Button variant={"outline"}>Download</Button>
            )
          }
        </PDFDownloadLink>
      </div>
    </>
  ) : (
    <div>Cart is empty</div>
  );
}
