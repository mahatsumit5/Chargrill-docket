export const dynamic = "force-dynamic";

import { getAllItems } from "@/database/actions/item.action";
import { GetAllItemsResponse } from "@/types";
import Image from "next/image";
import React, { FC } from "react";

const page = async ({}: {}) => {
  const { error, result } = await getAllItems();
  return !error ? (
    <div className="mt-3">
      <RenderItems data={result!} />
    </div>
  ) : (
    "error"
  );
};

export default page;

const RenderItems: FC<{ data: GetAllItemsResponse[] }> = ({ data }) => {
  return (
    <div className="flex flex-wrap gap-4 ">
      {data.map((item) => (
        <ItemCard item={item} key={item.id} />
      ))}
    </div>
  );
};
const ItemCard: FC<{ item: GetAllItemsResponse }> = ({
  item: { categoryId, description, images, name, dietary, id, category, sizes },
}) => {
  return (
    <div
      key={id}
      className="border border-secondary rounded-md w-full max-w-[320px]  shadow-[0_35px_35px_rgba(0,0,0,0.25)] z-50"
    >
      <div className="relative w-full h-[180px]">
        <Image
          src={images}
          alt={name}
          fill
          objectFit="cover"
          className="rounded-t-md"
          sizes=""
        />
      </div>
      <div className="p-2 flex justify-between items-center mt-2">
        <p className="text-sm font-semibold">{name}</p>
        <p className="text-xs  bg-background-secondary rounded-full p-1 px-3 ">
          {category.name}
        </p>
      </div>
      <div className="p-2 flex justify-between gap-3 items-center">
        <h3 className="scroll-m-20 text-md font-semibold tracking-tight">
          Contains:
        </h3>
        <ul className="   gap-2">
          {dietary.map((item) => (
            <li
              key={item}
              className="text-xs bg-transparent border border-secondary p-1 px-3 rounded-full hover:bg-secondary"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
