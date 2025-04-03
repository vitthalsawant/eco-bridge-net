
import { cn } from "@/lib/utils";
import React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  as?: React.ElementType;
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

export function Container({
  children,
  as: Component = "div",
  size = "lg",
  className,
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full px-4 sm:px-6",
        {
          "max-w-screen-sm": size === "sm",
          "max-w-screen-md": size === "md", 
          "max-w-screen-lg": size === "lg",
          "max-w-full lg:max-w-[95%] xl:max-w-[90%] 2xl:max-w-[1400px]": size === "xl",
          "max-w-full": size === "full",
        },
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
