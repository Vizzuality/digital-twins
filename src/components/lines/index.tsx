"use client";
import { AnimatePresence, motion } from "framer-motion";

import { useIsMobile } from "@/lib/hooks";
import { cn } from "@/lib/utils";

type LinesProps = {
  sectionName: string;
  rows?: number[];
  colorClass?: string;
  verticalClassName?: string;
} & (
  | { columnsNumber: number; hoveredIndex?: number | null; columns?: never }
  | { columns?: number[]; columnsNumber?: never; hoveredIndex?: never }
);

const Lines = ({
  sectionName,
  columns = [],
  rows = [],
  colorClass = "bg-white/20",
  verticalClassName,
  columnsNumber = 0,
  hoveredIndex,
}: LinesProps) => {
  const gridColumns2 = "grid transition-all duration-500 grid-cols-[1fr_1fr_1px]";
  const gridColumns3 = {
    "grid transition-all duration-500": true,
    "grid-cols-[1.2fr_0.9fr_0.9fr_1px]": hoveredIndex === 0,
    "grid-cols-[0.9fr_1.2fr_0.9fr_1px]": hoveredIndex === 1,
    "grid-cols-[0.9fr_0.9fr_1.2fr_1px]": hoveredIndex === 2,
    "grid-cols-[1fr_1fr_1fr_1px]": hoveredIndex === null || hoveredIndex === undefined,
  };

  const gridColumns4 = {
    "grid transition-all duration-500": true,
    "grid-cols-[1.3fr_0.9fr_0.9fr_0.9fr_1px]": hoveredIndex === 0,
    "grid-cols-[0.9fr_1.3fr_0.9fr_0.9fr_1px]": hoveredIndex === 1,
    "grid-cols-[0.9fr_0.9fr_1.3fr_0.9fr_1px]": hoveredIndex === 2,
    "grid-cols-[0.9fr_0.9fr_0.9fr_1.3fr_1px]": hoveredIndex === 3,
    "grid-cols-[1fr_1fr_1fr_1fr_1px]": hoveredIndex === null || hoveredIndex === undefined,
  };

  const gridColumns5 = {
    "grid transition-all duration-500": true,
    "grid-cols-[1.4fr_0.9fr_0.9fr_0.9fr_0.9fr_1px]": hoveredIndex === 0,
    "grid-cols-[0.9fr_1.4fr_0.9fr_0.9fr_0.9fr_1px]": hoveredIndex === 1,
    "grid-cols-[0.9fr_0.9fr_1.4fr_0.9fr_0.9fr_1px]": hoveredIndex === 2,
    "grid-cols-[0.9fr_0.9fr_0.9fr_1.4fr_0.9fr_1px]": hoveredIndex === 3,
    "grid-cols-[0.9fr_0.9fr_0.9fr_0.9fr_1.4fr_1px]": hoveredIndex === 4,
    "grid-cols-[1fr_1fr_1fr_1fr_1fr_1px]": hoveredIndex === null || hoveredIndex === undefined,
  };

  const gridColumns = {
    2: gridColumns2,
    3: gridColumns3,
    4: gridColumns4,
    5: gridColumns5,
  }[columnsNumber];

  const isMobile = useIsMobile();
  if (isMobile) return null;

  return (
    <>
      <AnimatePresence>
        {/* Vertical lines */}
        <div
          key={`vertical-lines-${sectionName}`}
          id={`vertical-lines-${sectionName}`}
          className="container pointer-events-none absolute inset-0 h-full w-full"
        >
          <motion.div
            className={cn(
              "absolute inset-0 z-0 h-full w-full",
              verticalClassName,
              columnsNumber && gridColumns,
            )}
          >
            {columnsNumber
              ? Array(columnsNumber + 1)
                  .fill(null)
                  .map((_, index) => (
                    <motion.div
                      key={`line-y-${sectionName}-${index}`}
                      className={cn("h-full w-px", colorClass)}
                    />
                  ))
              : columns.map((x, index) => (
                  <motion.div
                    key={`line-y-${sectionName}-${index}`}
                    initial={{ x: 1000, opacity: 0 }}
                    animate={{ x, opacity: 1 }}
                    transition={{ delay: 0.1 + index * 0.1, duration: 0.1 }}
                    className={cn("absolute h-full w-px", colorClass)}
                  />
                ))}
          </motion.div>
        </div>
        {/* Horizontal lines */}
        <div
          key={`horizontal-lines-${sectionName}`}
          id={`horizontal-lines-${sectionName}`}
          className="pointer-events-none absolute inset-0 z-0 h-full w-full"
        >
          {rows.map((y, index) => (
            <motion.div
              key={`line-x-${sectionName}-${index}`}
              initial={{ y: -1000, opacity: 0 }}
              animate={{ y, opacity: 1 }}
              transition={{ delay: 0.1 + index * 0.1, ease: "linear", duration: 0.1 }}
              className={cn("h-px w-full", colorClass)}
            />
          ))}
        </div>
      </AnimatePresence>
    </>
  );
};

export default Lines;
