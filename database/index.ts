import { ServerReturnType } from "@/types";
import { Prisma, PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();
type ReturnType<TResult> = Promise<{
  result: TResult | undefined;
  error: any;
}>;

interface options {
  successMessage?: string;
  errorMessage?: string;
}

export async function executeQuery<TResult>(query: any): ReturnType<TResult> {
  try {
    const result: TResult = await query;

    return {
      result,
      error: undefined,
    };
  } catch (error) {
    console.log("Error coming from database");
    let message = "Unknown database operation failed";
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log("this is error code", error.code);
      const code = error.code;
      message = PrismaErrorCode[code] || message;
    } else {
      message =
        error instanceof Error ? error.message : "Unknown error occurred";
    }
    return {
      result: undefined,
      error: { message },
    };
  } finally {
    await prisma.$disconnect();
  }
}

export async function executeDatabaseAction<T>({
  error,
  result,
  options,
}: {
  result: T | undefined;
  error: any;
  options?: options;
}): ServerReturnType<T> {
  try {
    return {
      status: "success",
      message: options?.successMessage || "Operation sucess",
      data: JSON.parse(JSON.stringify(result)),
      error: undefined,
    };
  } catch (error) {
    return {
      data: undefined,
      error:
        error instanceof Error
          ? error.message
          : options?.errorMessage || "Error Ocurred. Please try again.",
      status: "error",
      message: "error occured",
    };
  }
}

const PrismaErrorCode: Record<string, string> = {
  P1000: "Authentication failed against database server",
  P1001: "Can't reach database server",
  P1002: "Database server timed out",
  P1003: "Database does not exist",
  P1008: "Operations timed out",
  P1009: "Database already exists",
  P1010: "User denied access on the database",
  P1011: "Error opening TLS connection",
  P1012: "Schema validation error",
  P1013: "Invalid database connection string",
  P1014: "Model does not exist",
  P1015: "Unsupported features in Prisma schema",
  P1016: "Incorrect number of parameters in raw query",
  P1017: "Server closed the connection",
  P2000: "Value too long for column",
  P2001: "Record not found",
  P2002: "Unique constraint failed.Record already exist",
  P2003: "Foreign key constraint failed",
  P2004: "Constraint failed",
  P2005: "Invalid value for field type",
  P2006: "Invalid value for field",
  P2007: "Data validation error",
  P2008: "Failed to parse query",
  P2009: "Query validation error",
  P2010: "Raw query failed",
  P2011: "Null constraint violation",
  P2012: "Missing required value",
  P2013: "Missing argument for field",
  P2014: "Required relation violated",
  P2015: "Related record not found",
  P2016: "Query interpretation error",
  P2017: "Relation records not connected",
  P2018: "Required connected records not found",
  P2019: "Input error",
  P2020: "Value out of range for the type",
  P2021: "Table does not exist",
  P2022: "Column does not exist",
  P2023: "Inconsistent column data",
  P2024: "Timed out fetching a new connection",
  P2025: "Operation failed due to missing records",
  P2026: "Feature not supported by database provider",
  P2027: "Multiple errors during query execution",
  P2028: "Transaction API error",
  P2029: "Query parameter limit exceeded",
  P2030: "No fulltext index for search",
  P2031: "MongoDB replica set required",
  P2033: "Number too large for query",
  P2034: "Write conflict or deadlock in transaction",
  P2035: "Assertion violation in database",
  P2036: "External connector error",
  P2037: "Too many database connections",
  P3000: "Failed to create database",
  P3001: "Migration has destructive changes",
  P3002: "Migration rolled back",
  P3003: "Invalid migration format",
};
