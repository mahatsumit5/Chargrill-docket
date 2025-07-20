"use server";

import { CreateCustomerParams, ServerReturnType } from "@/types";
import { executeDatabaseAction, executeQuery, prisma } from "..";
import { Customer } from "@prisma/client";

export async function createCustomer(
  data: CreateCustomerParams
): ServerReturnType<Customer> {
  try {
    const { result, error } = await executeQuery<Customer>(
      await prisma.customer.create({
        data,
      })
    );
    if (error) throw new Error(error);

    return {
      data: result,
      message: "User created sucessfully.",
      status: "success",
      error: undefined,
    };
  } catch (error) {
    return {
      data: undefined,
      message:
        error instanceof Error ? error.message : "Unexpected error occured",
      status: "error",
      error: error,
    };
  }
}
// export async function createCustomer(data: CreateCustomerParams) {
//   const { result, error } = await executeQuery<Customer>(
//     await prisma.customer.create({
//       data,
//     })
//   );
//   return executeDatabaseAction<Customer>({ error, result });
// }
export async function getCustomerById(id: string) {
  return await prisma.customer.findFirstOrThrow({
    where: {
      id,
    },
  });
}

export async function getAllCustomers(email: string) {
  const { error, result } = await executeQuery<Customer[]>(
    await prisma.customer.findMany({
      where: {
        email: {
          contains: email,
        },
      },
    })
  );
  if (!result?.length) {
    return { error: { message: "error occurred" }, result: undefined };
  }

  return { error, result };
}
