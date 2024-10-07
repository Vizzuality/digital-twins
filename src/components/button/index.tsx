import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, MotionProps } from "framer-motion";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap justify-center items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-2 border-white gap-2.5",
        "light-green": "border-2 border-light-green gap-2.5",
        green: "border-2 border-green-700 gap-2.5",
        // white: "bg-white text-black",
        // outline: "border border-black",
        // "outline-white": "border border-white",
        icon: "gap-2.5",
        // transparent: "bg-transparent",
        // destructive: "bg-red-500 text-neutral-50 hover:bg-red-500/90 ",
        // outline: "border border-neutral-200 bg-white hover:bg-neutral-100 hover:text-neutral-900 ",
        // secondary: "bg-neutral-100 text-neutral-900 hover:bg-neutral-100/80",
        // ghost: "hover:bg-neutral-100 hover:text-neutral-900",
        // link: "text-black",
      },
      size: {
        default: "h-10 px-4 py-3",
        // sm: "px-6 py-1.5",
        // md: "w-[102px] h-10 px-4 py-3",
        // lg: "px-11 py-2.5",
        auto: "",
        // lg: "h-11 rounded-md px-8",
        // icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);

Button.displayName = "Button";

type MotionButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps & MotionProps;

const MotionButton = React.forwardRef<HTMLButtonElement, MotionButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <motion.button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  }
);

MotionButton.displayName = "MotionButton";


export { Button, buttonVariants, MotionButton };
