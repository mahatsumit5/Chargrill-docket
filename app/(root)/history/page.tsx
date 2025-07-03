"use client";
import CalendarPage from "@/components/FullCalendar";
import React from "react";
import Calendar from "@/components/calendar/Calendar";
const page = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  return (
    <div className=" w-full p-4">
      <Calendar />
    </div>
  );
};

export default page;
