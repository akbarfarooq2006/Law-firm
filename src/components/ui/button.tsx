import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-[1.1em] [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-gold-500 text-navy-950 shadow-md shadow-gold-600/25 hover:bg-gold-400 active:bg-gold-600",
        navy: "bg-navy-900 text-white shadow-md shadow-navy-950/20 hover:bg-navy-800",
        outline:
          "border border-navy-200 bg-transparent text-navy-900 hover:border-navy-300 hover:bg-navy-50",
        outlineLight:
          "border border-white/30 bg-transparent text-white hover:border-gold-300 hover:text-gold-200",
        ghost: "text-navy-700 hover:bg-navy-100",
        link: "text-gold-700 underline-offset-4 hover:underline px-0",
      },
      size: {
        default: "h-11 px-6 text-sm",
        sm: "h-9 px-4 text-xs",
        lg: "h-13 px-8 text-base",
        icon: "size-11 p-0",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}

export { Button, buttonVariants };
