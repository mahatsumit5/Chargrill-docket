"use server";
type ReturnType<TResult> = Promise<{
  data: TResult | undefined;
  error: any;
  status: "error" | "success";
  message: string;
}>;

type options = {
  successMessage?: string;
  errorMessage?: string;
};

export async function databaseActionHandle<TParams, TResult>(
  params: TParams,
  fn: (params: TParams) => Promise<unknown>,
  options?: options
): ReturnType<TResult> {
  try {
    return {
      data: JSON.parse(JSON.stringify(await fn(params))) as TResult,
      error: undefined,
      status: "success",
      message: options?.successMessage || "Query success",
    };
  } catch (error) {
    console.error("Database action error:", error);
    return {
      data: undefined,
      error: error instanceof Error ? error.message : "Unknown error",
      status: "error",
      message: error instanceof Error ? error.message : "Error message",
    };
  }
}
