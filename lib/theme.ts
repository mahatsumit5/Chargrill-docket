"use server";
import { cookies } from "next/headers";

export async function setThemeCookie(themeValue: "light" | "dark") {
  const cookieStore = await cookies();
  cookieStore.set({
    name: "theme",
    value: themeValue,
    httpOnly: true,
    path: "/",
  });
}
