'use client';
import dynamic from 'next/dynamic';
const Lines = dynamic(() => import('@/components/lines'), { ssr: false });
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import FadeIn from "@/components/animations/fade-in";
import { useIsMobile } from "@/lib/hooks";

export default function Section3() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const isMobile = useIsMobile();
  const gridColumns = isMobile ? 'flex flex-col' : {
    'grid transition-all duration-500': true,
    'grid-cols-[1.2fr_0.9fr_0.9fr]': hoveredIndex === 0,
    'grid-cols-[0.9fr_1.2fr_0.9fr]': hoveredIndex === 1,
    'grid-cols-[0.9fr_0.9fr_1.2fr]': hoveredIndex === 2,
    'grid-cols-[1fr_1fr_1fr]': hoveredIndex === null,
  };
  return (
    <section className="relative bg-white pb-[60px] xl:pb-20 scroll-mt-8" id="section-3">
      {/* Decorative div to continue previous section */}
      <div className='absolute z-0 bg-green-200 w-full h-[100px] inset-0'></div>
      <Lines verticalClassName="pt-[100px] px-[152px]" sectionName="section-1" rows={[570]} colorClass="bg-blue-900/10" columnsNumber={3} hoveredIndex={hoveredIndex} />
      <div className="container xl:px-[150px]">
        {isMobile ?
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
          </div> : <div className={cn("flex w-full h-[480px] overflow-hidden mb-10", gridColumns)}>
            <AnimatePresence>
              {Array(3).fill(null).map((_, index) => (
                <motion.div
                  key={`image-section1-${index}`}
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  transition={{ delay: 0.5 + index * 1, duration: 1, ease: "easeInOut" }}
                  className={cn("relative z-10 flex items-center h-full")}
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
          </div>}
        <div className={cn("text-green-700 grid mt-6 xl:mt-0")}>
          <div className={cn(gridColumns)}>
            <FadeIn delay={0.2}>
              <h4 className="text-lg xl:text-xl pr-10 mb-4 xl:mb-0 col-span-1 max-w-[300px]">
                Planning decisions in the wind energy sector
              </h4>
            </FadeIn>
          </div>
          <FadeIn delay={0.5}>
            <div className={cn(gridColumns, 'mb-2 xl:mb-[30px]')}>
              <div className="col-start-2">
                <div className="flex-col gap-2 xl:gap-4 flex pr-10">
                  <div className="flex-col flex " >
                    <div className="xl:text-lg leading-relaxed">01</div>
                    <div className="xl:text-lg leading-relaxed max-w-[300px]">Real-time access to capacity factor data:</div>
                  </div>
                  <div className="text-xs xl:text-sm leading-tight max-w-[300px]">Real-time access to capacity factor data revolutionises energy supply management, boosting memory use efficiency and enhancing the integration with climate models.</div>
                </div>
              </div>
              <div className="col-start-3">
                <div className="flex-col gap-2 mt-2 xl:mt-0 xl:gap-4 flex pr-10">
                  <div className="flex-col flex">
                    <div className="xl:text-lg leading-relaxed">02</div>
                    <div className="xl:text-lg leading-relaxed max-w-[300px]">Capacity factor as a universal metric:</div>
                  </div>
                  <div className="xl:text-xs text-sm leading-tight max-w-[300px]">The capacity factor allows a safe comparison between different power plants, irrespective of their size and type, being a relevant metric for wind farm owners, operation and maintenance teams, energy traders and transmission system operators.</div>
                </div>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.8}>
            <div className={cn(gridColumns)}>
              <div className="col-start-2">
                <div className="flex-col gap-2 xl:gap-4 flex pr-10">
                  <div className="flex-col flex ">
                    <div className="xl:text-lg leading-relaxed">03</div>
                    <div className="xl:text-lg leading-relaxed max-w-[300px]">Impact of future climate conditions:</div>
                  </div>
                  <div className="text-xs xl:text-sm leading-tight max-w-[300px]">Exploring the changes in the capacity factor under different future climate conditions is important for making decisions at both the asset and farm levels.</div>
                </div>
              </div>
              <div className="col-start-3">
                <div className="flex-col gap-2 mt-2 xl:mt-0 xl:gap-4 flex pr-10">
                  <div className="flex-col flex">
                    <div className="xl:text-lg leading-relaxed">04</div>
                    <div className="xl:text-lg leading-relaxed max-w-[300px]">Strategic importance for European energy systems:</div>
                  </div>
                  <div className="text-xs xl:text-sm leading-tight max-w-[300px]">Understanding how the capacity factor may change under different climate conditions is, more broadly, also vital for assessing the risks for the European energy systems and planning the future energy grid.</div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section >);
};