"use client";
import OrderForm from "@/components/form/OrderForm";
import { useAppSelector } from "@/hook";

export default function Page({ params }: { params: { id: string } }) {
  console.log(params);
  const { items } = useAppSelector((store) => store.cart);
  return <OrderForm item={items.find((item) => item.id === params.id)} />;
}
