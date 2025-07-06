"use server";

import { CreateUserParams } from "@/types";
import { executeQuery, prisma } from "..";
export async function createUser(data: CreateUserParams) {
  try {
    const newUser = executeQuery<{ id: string }>(
      await prisma.user.create({
        data,
      })
    );

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    // todo handle error

    console.log(error);
  }
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
