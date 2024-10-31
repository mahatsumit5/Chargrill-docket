import { useAppDispatch, useAppSelector } from "@/hooks";
import { CartItem } from "@/types";
import React from "react";
import { Button } from "../ui/button";
import { MdModeEdit } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { removeItem } from "@/redux/features/cart.slice";
export default function OrderTable() {
  const { items } = useAppSelector((store) => store.cart);
  return (
    <table className="">
      <thead>
        <tr className="border ">
          <th>Name</th>
          <th>Quantity</th>
          <th>Size</th>
          <th>Instructions</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody className="border">
        {items.map((item, index) => (
          <OrderRow key={index} item={item} />
        ))}
      </tbody>
    </table>
  );
}

function OrderRow({ item }: { item: CartItem }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  function handleClick(type: "edit" | "delete", item: CartItem) {
    switch (type) {
      case "edit":
        router.push(`/dashboard/cart/${item.id}`);

        break;
      case "delete":
        dispatch(removeItem(item));
        break;
      default:
        break;
    }
  }
  return (
    <>
      <tr className="text-center">
        <td>{item.name}</td>
        <td>{item.quantity}</td>
        <td>{item.size}</td>
        <td>{item.instructions}</td>
        <td className="p-2 flex gap-5 justify-center">
          <Button
            variant={"outline"}
            onClick={() => {
              handleClick("edit", item);
            }}
          >
            <MdModeEdit size={20} />
          </Button>
          <Button
            variant={"destructive"}
            onClick={() => {
              handleClick("delete", item);
            }}
          >
            <AiOutlineDelete size={20} />
          </Button>
        </td>
      </tr>
    </>
  );
}
