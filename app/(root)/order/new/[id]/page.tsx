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
    <div className="w-full flex gap-4 mt-2 p-2 flex-wrap">
      {result?.map((item) => (
        <ItemCard key={item.id} item={item} orderId={id} />
      ))}
    </div>
  );
};

export default CreateNewOrder;
