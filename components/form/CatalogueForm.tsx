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
import { executeQuery } from "@/database";
import { createCategory } from "@/database/actions/category.action";
import { Categories } from "@prisma/client";
import { toast } from "sonner";
const formSchema = z.object({
  name: z
    .string({ message: "Must be a string" })
    .min(3, {
      message: "Must be at least 3 characters long.",
    })
    .max(50),
});
const CatalogueForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const name = values.name as Categories;
    const { data, error, status, message } = await createCategory({ name });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Catagory Name</FormLabel>
              <FormControl>
                <Input placeholder="Salad" {...field} />
              </FormControl>
              <FormDescription>Enter a category name.</FormDescription>
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

export default CatalogueForm;
