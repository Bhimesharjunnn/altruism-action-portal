
import React from "react";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Spinner({ className, ...props }: SpinnerProps) {
  return (
    <Loader className={cn("h-4 w-4 animate-spin", className)} {...props} />
  );
}
