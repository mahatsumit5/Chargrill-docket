"use server";

import { createUserParams } from "@/types";
import { prisma } from "..";
export async function createUser() {
  try {
    const newUser = await prisma.user.create({
      data: {
        clerkId: "asdfasdf",
        email: "mahatsumit5@gmail.com",
        firstName: "sumit",
        lastName: "mahat",
        userName: "",
        photo: "",
        // location: { connect: { id: 1 } },
      },
    });

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    // todo handle error

    console.log(error);
  }
}
