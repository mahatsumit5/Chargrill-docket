"use server";

import { CreateUserParams } from "@/types";
import { executeQuery, prisma } from "..";
import { Prisma, User } from "@prisma/client";
export async function createUser(data: CreateUserParams) {
  return await executeQuery<User>(
    await prisma.user.create({
      data,
    })
  );
}
export async function getUserByEmail(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    // todo handle error

    console.log(error);
    throw new Error("Failed to fetch user by email");
  }
}

export async function updateUser(
  id: string,
  data: Omit<CreateUserParams, "clerkId">
) {
  return await executeQuery<User>(
    prisma.user.update({
      where: {
        clerkId: id,
      },
      data,
    })
  );
}

export async function deleteUser(id: string) {
  return await executeQuery<{ id: string }>(
    prisma.user.delete({
      where: {
        clerkId: id,
      },
    })
  );
}
