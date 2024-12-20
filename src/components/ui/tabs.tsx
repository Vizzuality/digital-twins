"use client";

import * as React from "react";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 max-w-full overflow-auto text-muted-foreground xl:items-center",
      className,
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const tabsTriggerVariants = cva(
  "inline-flex items-center justify-center ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "whitespace-nowrap py-1.5 pr-10 font-medium uppercase decoration-4 underline-offset-4 data-[state=active]:text-light-green data-[state=active]:underline xl:text-lg",
        // Padding is added on the children to preserve the effect
        whatif:
          "max-xl:w-[120px] mr-2 max-xl:w-[100px] text-sm uppercase data-[state=active]:bg-light-green justify-center items-center flex text-center text-light-green data-[state=active]:text-blue-900 xl:mr-6 font-medium border-[1.5px] border-light-green",
        // Padding is added on the children to preserve the effect
        about:
          "max-xl:w-[213px] mb-2 uppercase text-sm data-[state=active]:bg-green-900 justify-center items-center flex text-center text-green-900 data-[state=active]:text-white xl:mr-6 font-medium border-[1.5px] border-green-900",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> &
    VariantProps<typeof tabsTriggerVariants>
>(({ className, onClick, variant, ...props }, ref) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
  };

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(tabsTriggerVariants({ variant, className }))}
      onClick={handleClick}
      {...props}
    />
  );
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
