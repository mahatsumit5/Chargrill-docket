"use server";

import { createUserParams } from "@/types";
import { connectToDatabase } from "../database";
import User from "../database/model/user.model";
export async function createUser(user: createUserParams) {
  try {
    await connectToDatabase();

    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    // todo handle error

    console.log(error);
  }
}
