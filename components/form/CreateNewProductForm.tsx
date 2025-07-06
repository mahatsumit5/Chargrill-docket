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

import { Categories, Category, Dietary, Size } from "@prisma/client";

import { Textarea } from "../ui/textarea";
const SIZE = ["REGULAR", "LARGE", "FAMILY", "EXTRA_LARGE", "SMALL", "MEDIUM"];
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
import { executeQuery } from "@/database";
import { createItem } from "@/database/actions/item.action";
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
  description: z.string({ message: "Must be a string" }),
  price: z.number({ message: "Must be a number" }),
  images: imageSchema,
  dietary: z.array(
    z.enum(["GLUTEN_FREE", "VEGAN", "VEGETARIAN", "NUT_FREE", "DAIRY_FREE"])
  ),
  size: z.array(
    z.enum(["REGULAR", "LARGE", "FAMILY", "EXTRA_LARGE", "SMALL", "MEDIUM"])
  ),
  category: z.string(),
});
const CreateNewItemForm = ({ categories }: { categories: Category[] }) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 1,
      size: [],
      dietary: [],
      images: [],
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { result } = await createItem(values);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-5 items-start w-[600px] bg-background p-4 rounded-md"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel> Name</FormLabel>
              <FormControl>
                <Input placeholder="Salad" {...field} />
              </FormControl>
              <FormDescription>Enter a item name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel> Price</FormLabel>
              <FormControl>
                <Input
                  placeholder="Salad"
                  {...field}
                  type="number"
                  onChange={(e) => {
                    form.setValue("price", Number(e.target.value));
                  }}
                />
              </FormControl>
              <FormDescription>Enter a item name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="size"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel> Size</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger className="flex w-full">
                    <span className="w-full border p-1 rounded-md hover:bg-accent">
                      {field.value.length > 0
                        ? field.value.length + " selected"
                        : "Select your size"}
                    </span>
                  </PopoverTrigger>
                  <PopoverContent>
                    {SIZE.map((item, index) => (
                      <div className="flex items-center justify-start gap-3">
                        <Input
                          key={index}
                          type="checkbox"
                          id={item}
                          className="w-5"
                          name={item}
                          onChange={(e) => {
                            const { value } = e.target;
                            const currentState = form.getValues("size");
                            if (currentState?.includes(value as Size)) {
                              const filtered = currentState?.filter(
                                (i) => i !== value
                              );
                              form.setValue("size", filtered);
                            } else {
                              form.setValue("size", [
                                ...currentState,
                                value as Size,
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
          name="dietary"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel> Dietary</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger className="flex w-full">
                    <span className="w-full border p-1 rounded-md hover:bg-accent">
                      {field.value.length > 0
                        ? field.value.length + " selected"
                        : "Select your diet"}
                    </span>
                  </PopoverTrigger>
                  <PopoverContent>
                    {DIETARY.map((item, id) => (
                      <div className="flex items-center justify-start gap-3">
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel> Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Salad"
                  {...field}
                  className="resize-y h-28"
                />
              </FormControl>
              <FormDescription>Enter a item name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel> Categories</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={categories?.[0].id}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your size" />
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
        <Button className="grid" type="submit">
          Save
        </Button>
      </form>
    </Form>
  );
};

export default CreateNewItemForm;
