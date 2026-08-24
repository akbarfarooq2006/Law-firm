import * as React from "react";
import { cn } from "@/lib/utils";

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      className={cn(
        "block text-sm font-semibold text-navy-900 select-none",
        className
      )}
      {...props}
    />
  );
}

export { Label };
