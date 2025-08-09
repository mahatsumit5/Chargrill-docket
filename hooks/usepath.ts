"use client";

import { CurrentPath } from "@/types";
import { usePathname } from "next/navigation";

const usePathHook = () => {
  const pathName = usePathname();
  const path = pathName.split("/").filter((item) => item !== "");
  const currentPath = path[path.length - 1] as CurrentPath;
  return { path, currentPath };
};
export { usePathHook };
