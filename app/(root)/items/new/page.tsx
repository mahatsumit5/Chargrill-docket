import React from "react";
import { ReuseableDialog } from "@/components/dialog/Dialog";
import CatalogueForm from "@/components/form/CatalogueForm";
import CreateNewItemForm from "@/components/form/CreateNewProductForm";
import { executeQuery } from "@/database";
import { getAllCategories } from "@/database/actions/category.action";
import { Category } from "@prisma/client";

const page = async () => {
  const { result } = await getAllCategories();
  return (
    <div className="p-5  h-full border border-border  rounded-lg  my-3 flex flex-col gap-4">
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
        Add a new product
      </h4>
      <div className="flex items-center w-full justify-center">
        <CreateNewItemForm categories={result!} />
      </div>
      {/* <ReuseableDialog
        title="Create new Category"
        btnName="Save"
        description="Create new catalogue for your items"
      >
        <CatalogueForm />
      </ReuseableDialog> */}
    </div>
  );
};

export default page;
