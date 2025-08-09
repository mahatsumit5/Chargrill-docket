"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import React from "react";

const BreadCrumbComponent = () => {
  const pathname = usePathname();
  const links = pathname.split("/").filter(Boolean);

  return (
    <Breadcrumb className="py-3 ">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="text-lg">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {links.map((item, index) => (
          <div key={index} className="flex items-center gap-">
            <BreadcrumbItem>
              <BreadcrumbLink href={`/${item}`} className="text-lg">
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumbComponent;
