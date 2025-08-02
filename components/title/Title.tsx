import React from "react";

const Title = ({ title }: { title: string }) => {
  return (
    <h4 className="scroll-m-20 text-md font-bold tracking-tight   text-sm sm:text-xl flex-1">
      {title}
    </h4>
  );
};
const Subtitle = ({ subTitle }: { subTitle: string }) => (
  <small className="text-sm leading-none font-medium text-muted-foreground line-clamp-1">
    {subTitle}
  </small>
);

export { Title, Subtitle };
