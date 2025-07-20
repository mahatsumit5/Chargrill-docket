import ItemCard from "@/components/item-card/ItemCard";
import { getAllItems } from "@/database/actions/item.action";
import React from "react";

const CreateNewOrder = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params)?.id;
  const { error, result } = await getAllItems();

  return error ? (
    <>error</>
  ) : (
    <div className="w-full flex gap-2">
      {result?.map((item) => (
        <ItemCard key={item.id} item={item} orderId={id} />
      ))}
    </div>
  );
};

export default CreateNewOrder;
