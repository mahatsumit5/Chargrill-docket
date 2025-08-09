"use client";

import { usePathname } from "next/navigation";

const usePathHook = () => {
  const pathName = usePathname();
  const path = pathName.split("/").filter((item) => item !== "");
  const currentPath = path[path.length - 1];
  return { path, currentPath };
};
export { usePathHook };
