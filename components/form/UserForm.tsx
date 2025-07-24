"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { createCustomer } from "@/database/actions/customer.action";
import { toast } from "sonner";

const formSchema = z.object({
  firstName: z.string({
    required_error: "Full Name is required",
  }),
  lastName: z.string({
    required_error: "Last Name is required",
  }),
  email: z.string().email().optional(),
  phone: z
    .string({
      required_error: "Phone number is required",
    })
    .min(12, {
      message:
        "Phone number must be at least 10 digits and should start with +61",
    })
    .max(12, { message: "Phone number must be at most 10 digits   " })
    .startsWith("+61"),

  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postCode: z.string().optional(),
  country: z.string().optional(),
});

function UserForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      state: "",
      postCode: "",
      country: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { data, error, message, status } = await createCustomer(values);
    console.log(status, error, message);
    toast("ghcghc");
    if (data?.id) {
      const newPath = `/${data.id}`;
      // window.history.replaceState(null, "", `${pathname + newPath}`);
      // window.location.reload();
    }
    // form.reset(initialState);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5 w-full  p-3  bg-card rounded-md "
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <h4 className="scroll-m-20 text-lg font-semibold tracking-tight col-span-2 ">
            Create a new user
          </h4>
          <p className="text-muted-foreground text-sm col-span-2 mb-8">
            Let&apos;s start with some facts about you.
          </p>
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Harry " {...field} className="bg-input" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder=" Potter"
                    {...field}
                    className="bg-input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="enter your email" {...field} type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Phone */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mobile</FormLabel>
              <FormControl>
                <Input placeholder="+6145678965" {...field} type="tel" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Address */}
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="100 king st" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-3 gap-2">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="sydney" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input placeholder="NSW" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="postCode"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>PostCode</FormLabel>
                <FormControl>
                  <Input placeholder="2000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* time */}
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type=""
                  className=""
                  placeholder="Australia"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Notes
         */}

        <Button
          type="submit"
          variant={"default"}
          className=" w-full hover:bg-primary/75  hover:cursor-pointer"
        >
          Save
        </Button>
      </form>
    </Form>
  );
}

export default UserForm;
