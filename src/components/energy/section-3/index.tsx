"use client";
import dynamic from "next/dynamic";
const Lines = dynamic(() => import("@/components/lines"), { ssr: false });
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import FadeIn from "@/components/animations/fade-in";
import { useIsMobile } from "@/lib/hooks";

export default function Section3() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const isMobile = useIsMobile();
  const gridColumns = isMobile
    ? "flex flex-col"
    : {
        "grid transition-all duration-500": true,
        "grid-cols-[1.2fr_0.9fr_0.9fr]": hoveredIndex === 0,
        "grid-cols-[0.9fr_1.2fr_0.9fr]": hoveredIndex === 1,
        "grid-cols-[0.9fr_0.9fr_1.2fr]": hoveredIndex === 2,
        "grid-cols-[1fr_1fr_1fr]": hoveredIndex === null,
      };
  return (
    <section className="relative scroll-mt-8 bg-white pb-[60px] xl:pb-20" id="section-3">
      {/* Decorative div to continue previous section */}
      <div className="absolute inset-0 z-0 h-[100px] w-full bg-green-200"></div>
      <Lines
        verticalClassName="pt-[100px] px-[152px]"
        sectionName="section-3"
        rows={[570]}
        colorClass="bg-blue-900/10"
        columnsNumber={3}
        hoveredIndex={hoveredIndex}
      />
      <div className="container relative z-10 xl:px-[150px]">
        {isMobile ? (
          <div className="w-full">
            <Image
              className="h-[141px]"
              alt=""
              src="/images/energy-section-2-1.png"
              height={141}
              width={353}
              style={{ objectFit: "cover" }}
            />
            <Image
              className="h-[141px]"
              alt=""
              src="/images/energy-section-2-2.png"
              height={141}
              width={353}
              style={{ objectFit: "cover" }}
            />
            <Image
              className="h-[141px]"
              alt=""
              src="/images/energy-section-2-3.png"
              height={141}
              width={353}
              style={{ objectFit: "cover" }}
            />
          </div>
        ) : (
          <div className={cn("mb-10 flex h-[480px] w-full overflow-hidden", gridColumns)}>
            <AnimatePresence>
              {Array(3)
                .fill(null)
                .map((_, index) => (
                  <motion.div
                    key={`image-section1-${index}`}
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    transition={{ delay: 0.5 + index * 1, duration: 1, ease: "easeInOut" }}
                    className={cn("relative z-10 flex h-full items-center")}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <Image
                      alt=""
                      src={`/images/energy-section-2-${index + 1}.png`}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        )}
        <div className={cn("mt-6 grid text-green-700 xl:mt-0")}>
          <div className={cn(gridColumns)}>
            <FadeIn delay={0.2}>
              <h4 className="col-span-1 mb-4 max-w-[300px] pr-10 text-lg xl:mb-0 xl:text-xl">
                Planning decisions in the wind energy sector
              </h4>
            </FadeIn>
          </div>
          <FadeIn delay={0.5}>
            <div className={cn(gridColumns, "mb-2 xl:mb-[30px]")}>
              <div className="col-start-2">
                <div className="flex flex-col gap-2 pr-10 xl:gap-4">
                  <div className="flex flex-col">
                    <div className="leading-relaxed xl:text-lg">01</div>
                    <div className="max-w-[300px] leading-relaxed xl:text-lg">
                      Real-time access to capacity factor data:
                    </div>
                  </div>
                  <div className="max-w-[300px] text-xs leading-tight xl:text-sm">
                    Real-time access to capacity factor data revolutionises energy supply
                    management, boosting memory use efficiency and enhancing the integration with
                    climate models.
                  </div>
                </div>
              </div>
              <div className="col-start-3">
                <div className="mt-2 flex flex-col gap-2 pr-10 xl:mt-0 xl:gap-4">
                  <div className="flex flex-col">
                    <div className="leading-relaxed xl:text-lg">02</div>
                    <div className="max-w-[300px] leading-relaxed xl:text-lg">
                      Capacity factor as a universal metric:
                    </div>
                  </div>
                  <div className="max-w-[300px] text-sm leading-tight xl:text-xs">
                    The capacity factor allows a safe comparison between different power plants,
                    irrespective of their size and type, being a relevant metric for wind farm
                    owners, operation and maintenance teams, energy traders and transmission system
                    operators.
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.8}>
            <div className={cn(gridColumns)}>
              <div className="col-start-2">
                <div className="flex flex-col gap-2 pr-10 xl:gap-4">
                  <div className="flex flex-col">
                    <div className="leading-relaxed xl:text-lg">03</div>
                    <div className="max-w-[300px] leading-relaxed xl:text-lg">
                      Impact of future climate conditions:
                    </div>
                  </div>
                  <div className="max-w-[300px] text-xs leading-tight xl:text-sm">
                    Exploring the changes in the capacity factor under different future climate
                    conditions is important for making decisions at both the asset and farm levels.
                  </div>
                </div>
              </div>
              <div className="col-start-3">
                <div className="mt-2 flex flex-col gap-2 pr-10 xl:mt-0 xl:gap-4">
                  <div className="flex flex-col">
                    <div className="leading-relaxed xl:text-lg">04</div>
                    <div className="max-w-[300px] leading-relaxed xl:text-lg">
                      Strategic importance for European energy systems:
                    </div>
                  </div>
                  <div className="max-w-[300px] text-xs leading-tight xl:text-sm">
                    Understanding how the capacity factor may change under different climate
                    conditions is, more broadly, also vital for assessing the risks for the European
                    energy systems and planning the future energy grid.
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
