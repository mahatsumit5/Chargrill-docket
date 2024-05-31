"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  return (
    <div className="h-screen w-screen p-4 flex flex-col gap-4 overflow-x-scroll">
      <div>
        <Button
          onClick={() => {
            router.back();
          }}
        >
          Back
        </Button>
      </div>
      {children}
    </div>
  );
}
