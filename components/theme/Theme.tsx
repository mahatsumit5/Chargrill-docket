"use client";

import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

export function SwitchTheme() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant={"ghost"}
      size={"sm"}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="hover:bg-secondary"
    >
      {theme === "light" ? (
        <SunIcon color="orange" className="animate-spin" />
      ) : (
        <MoonIcon color="skyblue" className="animate-pulse" scale={1.5} />
      )}
    </Button>
  );
}
