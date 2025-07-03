import { ServerReturnType } from "@/types";

type DatabaseAction = () => Promise<any>;
export async function databaseActionHandle<T>(fn: () => any) {
  try {
    return {
      data: JSON.parse(JSON.stringify(await fn())),
      error: undefined,
    };
  } catch (error) {
    console.error("Database action error:", error);
    return {
      data: undefined,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
