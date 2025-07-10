import React, { FC } from "react";
import { Card } from "../ui/card";
import { Customer, User } from "@prisma/client";
import { MapPinCheckInside, Phone } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

const UserCard: FC<{ customer: Customer; user?: User }> = ({
  user,
  customer: {
    id,
    email,
    firstName,
    lastName,
    address,
    city,
    country,
    createdAt,
    phone,
    postCode,
    state,
  },
}) => {
  return (
    <Card key={id} className="w-full sm:w-[300px] pb-0">
      <header className="flex flex-col items-center justify-center gap-4">
        <Avatar className="h-24 w-24">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <small className="text-lg leading-none font-medium">{email}</small>
      </header>

      <section className=" flex flex-col gap-2 items-center justify-center w-full bg-background-secondary p-2">
        <small className="text-sm leading-none font-medium">
          {firstName} {lastName}
        </small>
        <p className="text-muted-foreground text-sm flex items-center ">
          <MapPinCheckInside size={14} /> {address},{state},{postCode}
        </p>
        <p className="text-muted-foreground text-sm flex items-center ">
          {city},{country}
        </p>
        <p className="text-muted-foreground text-sm flex items-center ">
          <Phone size={14} />
          {phone}
        </p>
        <Button variant={"secondary"} className="w-full  ">
          Select
        </Button>
      </section>
    </Card>
  );
};

export default UserCard;
