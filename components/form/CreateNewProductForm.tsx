"use client";
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CldImage, CldOgImage, CldUploadButton } from "next-cloudinary";
import { Categories, Category, Dietary, SizeEnum } from "@prisma/client";

import { Textarea } from "../ui/textarea";
const SIZE: SizeEnum[] = [
  "REGULAR",
  "LARGE",
  "FAMILY",
  "EXTRA_LARGE",
  "SMALL",
  "MEDIUM",
];
const DIETARY = [
  "VEGAN",
  "VEGETARIAN",
  "GLUTEN_FREE",
  "DAIRY_FREE",
  "NUT_FREE",
];
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { createItem } from "@/database/actions/item.action";
import { Size } from "@/types";
import { executeDatabaseAction } from "@/database";
import { toast } from "sonner";
import { BadgePlus, RotateCcw, Save } from "lucide-react";
const imageSchema = z
  .array(
    z
      .instanceof(File)
      .refine((file) => file.size < 5 * 1024 * 1024, {
        message: "File must be smaller than 5MB",
      })
      .refine((file) => ["image/png", "image/jpeg"].includes(file.type), {
        message: "Only PNG and JPEG files are allowed",
      })
  )
  .optional();
const formSchema = z.object({
  name: z
    .string({ message: "Must be a string" })
    .min(3, {
      message: "Must be at least 3 characters long.",
    })
    .max(50),
  description: z.string({ message: "Must be a string" }).optional(),
  images: z.string().url(), // Use string for URL
  dietary: z.array(
    z.enum(["GLUTEN_FREE", "VEGAN", "VEGETARIAN", "NUT_FREE", "DAIRY_FREE"])
  ),
  sizeAndPrice: z.array(
    z.object({
      size: z.enum([
        "REGULAR",
        "LARGE",
        "FAMILY",
        "EXTRA_LARGE",
        "SMALL",
        "MEDIUM",
      ]),
      price: z.number(),
    })
  ),
  categoryId: z.string({}),
});
const CreateNewItemForm = ({ categories }: { categories: Category[] }) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      sizeAndPrice: [],
      dietary: [],
      images: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    const { message, status, data, error } = await executeDatabaseAction({
      ...(await createItem(values)),
      options: {
        successMessage: "Item created",
        errorMessage: "Unable to create item",
      },
    });
    toast[status](error);
    if (status === "success") {
      form.reset();
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col md:flex-row gap-5 items-start w-full rounded-md "
      >
        <div className="flex flex-col gap-3 bg-background-secondary p-5 rounded-md w-full md:w-3/5">
          <p className="leading-7 font-semibold">General Information</p>
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Name</FormLabel>
                <FormControl>
                  <Input placeholder="Salad" {...field} className="sm:h-10" />
                </FormControl>
                <FormDescription>Enter a item name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter item details"
                    {...field}
                    className=" resize-none h-40   items-center justify-center bg-input   rounded-md "
                  />
                </FormControl>
                <FormDescription>
                  Enter a description of your item
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* size and diet */}
          <div className="grid grid-cols-2 gap-4">
            {/* size and Price */}
            <FormField
              control={form.control}
              name="sizeAndPrice"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start">
                  <FormLabel> Size</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger className="flex w-full  text-muted-foreground sm:h-10  items-center justify-center bg-input text-center  rounded-md ">
                        {field.value.length > 0
                          ? field.value.length + " selected"
                          : "Select your size"}
                      </PopoverTrigger>
                      <PopoverContent>
                        {SIZE.map((item, index) => (
                          <div
                            className="flex items-center justify-between  w-full gap-3"
                            key={index}
                          >
                            <Input
                              key={index}
                              type="checkbox"
                              id={item}
                              className="w-5"
                              name={item}
                              onChange={(e) => {
                                const { value } = e.target;
                                const previousState =
                                  form.getValues("sizeAndPrice");

                                if (
                                  previousState.some(
                                    (item) => item.size === value
                                  )
                                ) {
                                  const newFilteredArray = previousState.filter(
                                    (item) => item.size !== value
                                  );
                                  form.setValue(
                                    "sizeAndPrice",
                                    newFilteredArray
                                  );
                                } else {
                                  form.setValue("sizeAndPrice", [
                                    ...previousState,
                                    { size: value as Size, price: 0 },
                                  ]);
                                }

                                console.log(previousState);
                              }}
                              checked={field.value.some((i) => i.size === item)}
                              value={item}
                            />
                            <label htmlFor={item}>{item}</label>
                            <Input
                              type="number "
                              className="w-18 mt-1"
                              id={item}
                              disabled={
                                !form
                                  .getValues("sizeAndPrice")
                                  // check Size is already in the array
                                  .some(({ size }) => size === item)
                              }
                              onChange={(e) => {
                                const { id } = e.target;
                                const previousState =
                                  form.getValues("sizeAndPrice");
                                const newValueWithPrice = previousState.map(
                                  (item) => {
                                    if (item.size === id) {
                                      return {
                                        price: Number(e.target.value),
                                        size: item.size,
                                      };
                                    } else {
                                      return {
                                        price: item.price,
                                        size: item.size,
                                      };
                                    }
                                  }
                                );
                                form.setValue(
                                  "sizeAndPrice",
                                  newValueWithPrice
                                );
                              }}
                              value={
                                field.value.find((i) => i.size === item)
                                  ?.price || 0
                              }
                              placeholder="Price"
                              required
                            />
                          </div>
                        ))}
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormDescription>
                    Select available size for your product.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Dietary */}
            <FormField
              control={form.control}
              name="dietary"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start">
                  <FormLabel> Dietary</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger className="flex w-full sm:h-10  items-center justify-center text-muted-foreground bg-input text-center  rounded-md ">
                        {field.value.length > 0
                          ? field.value.length + " selected"
                          : "Select your diet"}
                      </PopoverTrigger>
                      <PopoverContent>
                        {DIETARY.map((item, id) => (
                          <div
                            className="flex items-center justify-start gap-3"
                            key={id}
                          >
                            <Input
                              key={id}
                              type="checkbox"
                              id={item}
                              className="w-5"
                              name={item}
                              onChange={(e) => {
                                const { value } = e.target;
                                const currentState = form.getValues("dietary");
                                if (currentState?.includes(value as Dietary)) {
                                  const filtered = currentState?.filter(
                                    (i) => i !== value
                                  );
                                  form.setValue("dietary", filtered);
                                } else {
                                  form.setValue("dietary", [
                                    ...currentState,
                                    value as Dietary,
                                  ]);
                                }
                              }}
                              checked={field.value.includes(item as Dietary)}
                              value={item}
                            />
                            <label htmlFor="id">{item}</label>
                          </div>
                        ))}
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormDescription>
                    Select available size for your product.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex  h-full justify-start col-end-2 items-end gap-3"></div>
        </div>
        <div className="flex flex-col gap-3   w-full md:w-2/5 ">
          <div className="flex flex-col gap-3  p-5 bg-background-secondary rounded-md  w-full ">
            <p className="leading-7 font-semibold">Upload Image</p>
            {/* Images */}
            <CldUploadWidget
              options={{
                sources: ["local", "google_drive", "camera", "url"],
                maxFiles: 1,
                multiple: false,
                showPoweredBy: false,
                folder: "docket",
              }}
              signatureEndpoint={"/api/sign-image"}
              onSuccess={(result) => {
                console.log(result?.info); // { public_id, secure_url, etc }

                const imageUrl: CloudinaryUploadWidgetInfo =
                  result?.info as CloudinaryUploadWidgetInfo; // Get the secure URL of the uploaded image

                form.setValue(
                  "images",
                  typeof imageUrl?.secure_url === "string"
                    ? imageUrl.secure_url
                    : ""
                ); // Set the image URL in the form
              }}
              onQueuesEnd={(result, { widget }) => {
                widget.close();
              }}
            >
              {({ open, results }) => {
                if (form.getValues("images").length === 0) {
                  return (
                    <Button
                      onClick={() => open()}
                      type="button"
                      variant={"ghost"}
                      className="border-dashed border-2  h-52 text-input hover:text-primary "
                    >
                      <BadgePlus />
                      Select an Image
                    </Button>
                  );
                } else {
                  return (
                    <CldImage
                      width="960"
                      height="600"
                      src={
                        form.getValues("images") ||
                        "docket/jqglaowddha2j6xrvyvy"
                      }
                      sizes="100vw"
                      alt="Description of my image"
                      className="w-full  object-cover rounded-md hover:opacity-70 transition-opacity duration-300 ease-in-out h-52"
                    />
                  );
                }
              }}
            </CldUploadWidget>
          </div>
          <div className="bg-background-secondary p-5 rounded-md">
            {/* category */}
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Categories</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl className="">
                      <SelectTrigger className="flex w-full sm:h-10  items-center justify-center bg-input text-center border-input rounded-md ">
                        <SelectValue
                          placeholder="Select Category"
                          className="border-input"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.length ? (
                        categories.map((item) => (
                          <SelectItem value={item.id} key={item.id}>
                            {item.name}
                          </SelectItem>
                        ))
                      ) : (
                        <p className="p-2">No categories available</p>
                      )}
                    </SelectContent>
                  </Select>
                  <FormDescription>Select your category.</FormDescription>
                  <Button
                    className="rounded-full font-semibold"
                    variant={"secondary"}
                    size={"sm"}
                    type="button"
                  >
                    Add Category
                  </Button>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Buttons */}
          <Button
            className="text-lg flex gap-2 items-center"
            type="submit"
            size={"default"}
          >
            <Save size={18} /> Save
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateNewItemForm;
