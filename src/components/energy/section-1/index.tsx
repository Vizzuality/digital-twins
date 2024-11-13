"use client";

import { useState } from "react";

import dynamic from "next/dynamic";
import Image from "next/image";

import { AnimatePresence, motion } from "framer-motion";

import { useIsMobile } from "@/lib/hooks";
import { cn } from "@/lib/utils";

import FadeIn from "@/components/animations/fade-in";
import KnowMoreButton from "@/components/know-more-button";

const Lines = dynamic(() => import("@/components/lines"), { ssr: false });
import VideoPlayer from "@/components/video-player";

export default function Section1() {
  const [openedKnowMore, setOpenedKnowMore] = useState(false);
  const [openedKnowMoreWind, setOpenedKnowMoreWind] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const isMobile = useIsMobile();

  const gridColumns = isMobile
    ? "flex flex-col"
    : {
      "grid transition-all duration-500": true,
      "grid-cols-[1.3fr_0.9fr_0.9fr_0.9fr]": hoveredIndex === 0,
      "grid-cols-[0.9fr_1.3fr_0.9fr_0.9fr]": hoveredIndex === 1,
      "grid-cols-[0.9fr_0.9fr_1.3fr_0.9fr]": hoveredIndex === 2,
      "grid-cols-[0.9fr_0.9fr_0.9fr_1.3fr]": hoveredIndex === 3,
      "grid-cols-[1fr_1fr_1fr_1fr]": hoveredIndex === null,
    };

  return (
    <section className="relative scroll-mt-8 bg-white" id="section-1">
      <div className="relative z-10 flex h-[348px] items-center justify-center overflow-hidden xl:h-[548px]">
        <VideoPlayer
          src="videos/stream-videos/energy-intro-bg/index.m3u8"
          className="absolute z-0 w-screen object-fill"
        />
        <div className="xl relative z-10 px-2 text-center text-white xl:px-0">
          <div className="text-center uppercase tracking-tight xl:text-lg">
            Wind energy production
          </div>
          <div className="max-w-[830px] text-center text-[36px] leading-[32px] xl:text-4xl">
            Advanced simulations for a climate resilient energy sector
          </div>
        </div>
      </div>
      <Lines
        verticalClassName="px-[152px] z-0"
        sectionName="section-1"
        rows={[
          openedKnowMore ? 980 : 830,
          openedKnowMore ? 1614 : 1468,
          openedKnowMore ? 2274 : 2108,
          openedKnowMore ? 2760 : 2574,
        ]}
        colorClass="bg-blue-900/10"
        columnsNumber={4}
        hoveredIndex={hoveredIndex}
      />
      <div className="container relative z-10 xl:px-[150px] xl:pt-20">
        <div className="mb-6 mt-4 max-w-[594px] space-y-5 border-b pb-6 text-green-700 xl:mb-0 xl:mt-0 xl:border-0 xl:pb-20">
          <h3 className="text-xl xl:text-2xl">
            The green transition boosts resilience to climate disruptions through renewable energy
            and advanced digital simulations.
          </h3>
          <KnowMoreButton
            onClick={() => setOpenedKnowMore(!openedKnowMore)}
            opened={openedKnowMore}
          />
          <AnimatePresence>
            {openedKnowMore && (
              <motion.div
                key="know-more-green-transition"
                initial={{ opacity: 0, height: 0 }}
                exit={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="text-sm xl:text-base"
              >
                Effective planning and implementation of renewable energy sources, such as wind
                power, can significantly reduce our dependence on fossil fuels, leading to a cleaner
                and more stable energy future. By providing advanced simulations and data-driven
                insights, the climate adaptation digital twin is instrumental in this
                transformation.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {isMobile ? (
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
          </div>
        ) : (
          <div className={cn("mb-10 flex h-[480px] w-full overflow-hidden", gridColumns)}>
            <div></div>
            <AnimatePresence>
              {Array(3)
                .fill(null)
                .map((_, index) => (
                  <motion.div
                    key={`image-section1-${index + 1}`}
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    transition={{ delay: 0.5 + index * 1, duration: 1, ease: "easeInOut" }}
                    className={cn("relative z-10 flex h-full items-center")}
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
          </div>
        )}
        <div className={cn("mt-6 grid text-green-700 xl:mt-0")}>
          <div className={cn(gridColumns)}>
            <FadeIn delay={0.2}>
              <h4 className="col-span-1 mb-4 max-w-[260px] pr-10 text-lg xl:mb-0 xl:text-xl">
                How can a digital twin help the energy sector?
              </h4>
            </FadeIn>
          </div>
          <FadeIn delay={0.2}>
            <div className={cn(gridColumns, "mb-2 xl:mb-[30px]")}>
              <div className="col-start-2">
                <div className="flex flex-col gap-2 pr-10 xl:gap-4">
                  <div className="flex flex-col">
                    <div className="leading-relaxed xl:text-lg">01</div>
                    <div className="max-w-[260px] leading-relaxed xl:text-lg">
                      Predicting renewable energy production:
                    </div>
                  </div>
                  <div className="max-w-[260px] text-xs leading-tight xl:text-sm">
                    The advanced simulations of the digital twin enable users to explore different
                    climate scenarios and predict renewable energy production according to the
                    variability of climate conditions.
                  </div>
                </div>
              </div>
              <div className="col-start-3">
                <div className="mt-2 flex flex-col gap-2 pr-10 xl:mt-0 xl:gap-4">
                  <div className="flex flex-col">
                    <div className="leading-relaxed xl:text-lg">02</div>
                    <div className="max-w-[260px] leading-relaxed xl:text-lg">
                      Enhancing grid stability and reliability:
                    </div>
                  </div>
                  <div className="max-w-[260px] text-sm leading-tight xl:text-xs">
                    A more accurate prediction of renewable energy production facilitates a smoother
                    integration of renewable sources to the energy grid, enhancing grid stability
                    and reducing the dependence on less reliable energy sources. This is key to
                    ensure that the energy supply can meet the energy demand.
                  </div>
                </div>
              </div>
              <div className="col-start-4">
                <div className="mt-2 flex flex-col gap-2 pr-10 xl:mt-0 xl:gap-4">
                  <div className="flex flex-col">
                    <div className="leading-relaxed xl:text-lg">03</div>
                    <div className="max-w-[260px] leading-relaxed xl:text-lg">
                      Developing strategies for climate extremes:
                    </div>
                  </div>
                  <div className="max-w-[260px] text-sm leading-tight xl:text-xs">
                    A digital twin allows the analysis of past extreme events to understand the
                    conditions under which they had occurred. This allows the development of more
                    efficient adaptation strategies in the light of the future increase in the
                    frequency and the intensity of extreme events, offering a powerful combination
                    of retrospective and prospective analysis.
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
        <div className="flex flex-col-reverse items-center gap-6 pb-[20px] xl:mt-[184px] xl:flex-row xl:items-start xl:gap-[69px] xl:pb-[150px]">
          <div className="xl:pt-[121px]">
            <VideoPlayer
              src="/videos/stream-videos/energy-section-1/index.m3u8"
              className="w-full xl:ml-0.5 xl:min-w-[546px]"
            />
          </div>
          <div className="max-w-[536px] space-y-3 pt-10 text-green-700 xl:w-[536px] xl:space-y-5 xl:pt-0">
            <h2 className="pb-8 text-2xl font-medium xl:-translate-y-1 xl:pb-20 xl:text-4xl">
              Transforming wind to energy
            </h2>
            <h3 className="pb-4 text-xl xl:pb-10 xl:text-2xl">
              The renewable energy sector is significantly impacted by climate variability and
              change.
            </h3>
            <KnowMoreButton
              onClick={() => setOpenedKnowMoreWind(!openedKnowMoreWind)}
              opened={openedKnowMoreWind}
            />
            <AnimatePresence>
              {openedKnowMoreWind && (
                <motion.div
                  key="know-more-renewable-sector"
                  initial={{ opacity: 0, height: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                >
                  Phenomena such as wind droughts, heatwaves, and droughts can both affect energy
                  supply and demand. In the case of wind, daily variability is especially relevant,
                  which makes high-resolution information desirable.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
