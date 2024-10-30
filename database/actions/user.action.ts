"use server";

import { createUserParams } from "@/types";
import { prisma } from "..";
export async function createUser(user: createUserParams) {
  try {
    const newUser = await prisma.user.create({
      data: {
        clerkId: "",
        email: "",
        firstName: "",
        lastName: "",
        userName: "",
        photo: "",
        location: { connect: { id: 1 } },
      },
    });

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    // todo handle error

    console.log(error);
  }
}
