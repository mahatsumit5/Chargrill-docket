"use client";

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
  images: imageSchema,
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
      images: [],
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { images, ...rest } = values;
    const { message, status, data, error } = await executeDatabaseAction({
      ...(await createItem({ images: [], ...rest })),
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
        className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-start sm:w-full w-[400px]    rounded-md"
      >
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

        <FormField
          control={form.control}
          name="sizeAndPrice"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel> Size</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger className="flex w-full sm:h-10  items-center justify-center bg-input text-center border-input rounded-md ">
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
                              previousState.some((item) => item.size === value)
                            ) {
                              const newFilteredArray = previousState.filter(
                                (item) => item.size !== value
                              );
                              form.setValue("sizeAndPrice", newFilteredArray);
                            } else {
                              form.setValue("sizeAndPrice", [
                                ...previousState,
                                { size: value as Size, price: 0 },
                              ]);
                            }

                            console.log(previousState);
                          }}
                          value={item}
                        />
                        <label htmlFor={item}>{item}</label>
                        <Input
                          type="number "
                          className="w-18 mt-1"
                          defaultValue={0}
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
                            form.setValue("sizeAndPrice", newValueWithPrice);
                          }}
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
        <FormField
          control={form.control}
          name="dietary"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel> Dietary</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger className="flex w-full sm:h-10  items-center justify-center bg-input text-center border-input rounded-md ">
                    <span className="w-full border p-1 rounded-md hover:bg-accent sm:h-10 h-9">
                      {field.value.length > 0
                        ? field.value.length + " selected"
                        : "Select your diet"}
                    </span>
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
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel> Categories</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={categories?.[0].id}
              >
                <FormControl className="">
                  <SelectTrigger className="flex w-full sm:h-10  items-center justify-center bg-input text-center border-input rounded-md ">
                    <SelectValue
                      placeholder="Select your size"
                      className="border-input"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((item) => (
                    <SelectItem value={item.id} key={item.id}>
                      {item.name}
                    </SelectItem>
                  ))}
                  <Button className="w-full" variant={"outline"} size={"sm"}>
                    Add new category
                  </Button>
                </SelectContent>
              </Select>
              <FormDescription>Select your category.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
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
                  className=" resize-y h-32   items-center justify-center bg-input  border-input rounded-md "
                />
              </FormControl>
              <FormDescription>
                Enter a description of your item
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="grid" type="submit">
          Save
        </Button>
      </form>
    </Form>
  );
};

export default CreateNewItemForm;
