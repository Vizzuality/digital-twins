'use client';

import dynamic from 'next/dynamic';
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import KnowMoreButton from "@/components/know-more-button";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/lib/hooks";
import FadeIn from "@/components/animations/fade-in";
const Lines = dynamic(() => import('@/components/lines'), { ssr: false });

export default function Section1() {
  const [openedKnowMore, setOpenedKnowMore] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const isMobile = useIsMobile();

  const gridColumns = isMobile ? 'flex flex-col' : {
    'grid transition-all duration-500': true,
    'grid-cols-[1.3fr_0.9fr_0.9fr_0.9fr]': hoveredIndex === 0,
    'grid-cols-[0.9fr_1.3fr_0.9fr_0.9fr]': hoveredIndex === 1,
    'grid-cols-[0.9fr_0.9fr_1.3fr_0.9fr]': hoveredIndex === 2,
    'grid-cols-[0.9fr_0.9fr_0.9fr_1.3fr]': hoveredIndex === 3,
    'grid-cols-[1fr_1fr_1fr_1fr]': hoveredIndex === null
  };

  return (
    <section className="relative bg-white scroll-mt-8" id="section-1">
      <div className="relative xl:h-[548px] overflow-hidden flex items-center justify-center z-10 h-[348px]">
        <video autoPlay muted playsInline loop className="absolute w-screen object-fill z-0">
          <source src="/videos/energy-intro-bg.webm" type="video/webm" />
        </video>
        <div className="relative z-10 text-white text-center px-2 xl xl:px-0">
          <div className="text-center xl:text-lg uppercase tracking-tight">Wind energy production</div>
          <div className="text-center text-[36px] leading-[32px] xl:text-4xl max-w-[830px]">
            Advanced simulations for a climate resilient energy sector
          </div>
        </div>
      </div>
      <Lines verticalClassName="px-[152px] z-0" sectionName="section-1" rows={[openedKnowMore ? 980 : 830, openedKnowMore ? 1614 : 1468, openedKnowMore ? 2274 : 2124, openedKnowMore ? 2760 : 2600]} colorClass="bg-blue-900/10" columnsNumber={4} hoveredIndex={hoveredIndex} />
      <div className="container xl:px-[150px] xl:pt-20 relative z-10">
        <div className="max-w-[594px] text-green-700 space-y-5 mb-6 border-b xl:border-0 xl:mb-0 pb-6 xl:pb-20 mt-4 xl:mt-0">
          <h3 className="text-xl xl:text-2xl">The green transition boosts resilience to climate disruptions through renewable energy and advanced digital simulations.</h3>
          <KnowMoreButton onClick={() => setOpenedKnowMore(!openedKnowMore)} opened={openedKnowMore} />
          <AnimatePresence>
            {openedKnowMore && <motion.div
              key="know-more-green-transition"
              initial={{ opacity: 0, height: 0 }}
              exit={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="text-sm xl:text-base"
            >
              Effective planning and implementation of renewable energy sources, such as wind power, can significantly reduce our dependence on fossil fuels, leading to a cleaner and more stable energy future. By providing advanced simulations and data-driven insights, the climate adaptation digital twin is instrumental in this transformation.
            </motion.div>}
          </AnimatePresence>
        </div>
        {isMobile ?
          <div className="w-full">
            <Image
              className="h-[141px]"
              alt=""
              src="/images/energy-section-1-1.png"
              height={141}
              width={353}
              style={{ objectFit: "cover" }}
            />
            <Image
              className="h-[141px]"
              alt=""
              src="/images/energy-section-1-2.png"
              height={141}
              width={353}
              style={{ objectFit: "cover" }}
            />
            <Image
              className="h-[141px]"
              alt=""
              src="/images/energy-section-1-3.png"
              height={141}
              width={353}
              style={{ objectFit: "cover" }}
            />
          </div> : <div className={cn("flex w-full h-[480px] overflow-hidden mb-10", gridColumns)}>
            <div></div>
            <AnimatePresence>
              {Array(3).fill(null).map((_, index) => (
                <motion.div
                  key={`image-section1-${index + 1}`}
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  transition={{ delay: 0.5 + index * 1, duration: 1, ease: "easeInOut" }}
                  className={cn("relative z-10 flex items-center h-full")}
                  onMouseEnter={() => setHoveredIndex(index + 1)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <Image
                    alt=""
                    src={`/images/energy-section-1-${index + 1}.png`}
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
              <h4 className="text-lg xl:text-xl pr-10 mb-4 xl:mb-0 col-span-1 max-w-[260px]">
                How can a digital twin help the energy sector?
              </h4>
            </FadeIn>
          </div>
          <FadeIn delay={0.2}>
            <div className={cn(gridColumns, 'mb-2 xl:mb-[30px]')}>
              <div className="col-start-2">
                <div className="flex-col gap-2 xl:gap-4 flex pr-10">
                  <div className="flex-col flex " >
                    <div className="xl:text-lg leading-relaxed">01</div>
                    <div className="xl:text-lg leading-relaxed max-w-[260px]">Predicting renewable energy production:</div>
                  </div>
                  <div className="text-xs xl:text-sm leading-tight max-w-[260px]">The advanced simulations of the digital twin enable users to explore different climate scenarios and predict renewable energy production according to the variability of climate conditions.</div>
                </div>
              </div>
              <div className="col-start-3">
                <div className="flex-col gap-2 mt-2 xl:mt-0 xl:gap-4 flex pr-10">
                  <div className="flex-col flex">
                    <div className="xl:text-lg leading-relaxed">02</div>
                    <div className="xl:text-lg leading-relaxed max-w-[260px]">Enhancing grid stability and reliability:</div>
                  </div>
                  <div className="xl:text-xs text-sm leading-tight max-w-[260px]">A more accurate prediction of renewable energy production facilitates a smoother integration of renewable sources to the energy grid, enhancing grid stability and reducing the dependence on less reliable energy sources. This is key to ensure that the energy supply can meet the energy demand.</div>
                </div>
              </div>
              <div className="col-start-4">
                <div className="flex-col gap-2 mt-2 xl:mt-0 xl:gap-4 flex pr-10">
                  <div className="flex-col flex">
                    <div className="xl:text-lg leading-relaxed">03</div>
                    <div className="xl:text-lg leading-relaxed max-w-[260px]">Developing strategies for climate extremes:</div>
                  </div>
                  <div className="xl:text-xs text-sm leading-tight max-w-[260px]">A digital twin allows the analysis of past extreme events to understand the conditions under which they had occurred. This allows the development of more efficient adaptation strategies in the light of the future increase in the frequency and the intensity of extreme events, offering a powerful combination of retrospective and prospective analysis.</div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
        <div className="flex flex-col-reverse items-center xl:items-start xl:flex-row pb-[60px] xl:mt-[184px] xl:pb-[150px] gap-6 xl:gap-[69px]">
          <div className="xl:pt-[121px]">
            <video autoPlay muted playsInline loop className="w-full xl:ml-0.5 xl:min-w-[546px]">
              <source src="/videos/energy-section-1.webm" type="video/webm" />
            </video>
          </div>
          <div className="max-w-[536px] xl:w-[536px] text-green-700 space-y-3 xl:space-y-5 pb-10 pt-10 xl:pt-0">
            <h2 className="text-2xl xl:text-4xl font-medium pb-8 xl:pb-20 xl:-translate-y-1">Transforming wind to energy</h2>
            <h3 className="text-xl xl:text-2xl pb-4 xl:pb-10">The renewable energy sector is significantly impacted by climate variability and change.</h3>
            <KnowMoreButton onClick={() => setOpenedKnowMore(!openedKnowMore)} opened={openedKnowMore} />
            <AnimatePresence>
              {openedKnowMore && <motion.div
                key="know-more-renewable-sector"
                initial={{ opacity: 0, height: 0 }}
                exit={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
              >
                Phenomena such as wind droughts, heatwaves, and droughts can both affect energy supply and demand. In the case of wind, daily variability is especially relevant, which makes high-resolution information desirable.
              </motion.div>}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section >);
};