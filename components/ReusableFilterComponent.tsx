"use client";
import React, { useEffect } from "react";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import _debounce from "lodash/debounce";
const ReuseableFilter = ({
  query,
  children,
  name,
}: {
  query: string;
  children: React.ReactNode;
  name: string;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const delayDebounceFn = _debounce(() => {
    let newUrl = "";

    if (query) {
      console.log(query);
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: name,
        value: query,
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: [`${name}`],
      });
    }

    router.push(newUrl, { scroll: false });
  }, 2);
  useEffect(() => {
    delayDebounceFn();
    return delayDebounceFn.cancel;
  }, [query, searchParams, router]);
  return children;
};

export default ReuseableFilter;
