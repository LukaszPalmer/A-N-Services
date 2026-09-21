import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const sizes = {
  narrow: "max-w-4xl",
  default: "max-w-7xl",
  wide: "max-w-[90rem]",
} as const;

type ContainerProps = ComponentProps<"div"> & {
  size?: keyof typeof sizes;
};

export function Container({ size = "default", className, ...props }: ContainerProps) {
  return <div className={cn("mx-auto w-full px-5 sm:px-8", sizes[size], className)} {...props} />;
}
