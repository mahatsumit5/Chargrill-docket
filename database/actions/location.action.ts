import { locations } from "@/constants";
import { prisma } from "..";

export const createLocation = async () => {
  try {
    await prisma.location.createMany({
      data: locations,
      skipDuplicates: true,
    });
  } catch (error) {
    console.log(error);
  }
};
