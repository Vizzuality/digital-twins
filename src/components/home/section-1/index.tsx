"use client";

import { useState } from "react";

import dynamic from "next/dynamic";

const Lines = dynamic(() => import("@/components/lines"), { ssr: false });
import Image from "next/image";

import { AnimatePresence, motion } from "framer-motion";

import { useIsMobile } from "@/lib/hooks";
import { cn } from "@/lib/utils";

import FadeIn from "@/components/animations/fade-in";
import KnowMoreButton from "@/components/know-more-button";

export default function Section1() {
  const [openedKnowMore, setOpenedKnowMore] = useState(false);
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
    <section
      className="relative scroll-mt-8 bg-white py-6 pb-[60px] sm:py-10 xl:py-20"
      id="section-1"
    >
      <Lines
        verticalClassName="px-[152px]"
        sectionName="section-1"
        rows={[openedKnowMore ? 632 : 474, !hoveredIndex || hoveredIndex === 0 ? 1130 : 1154]}
        colorClass="bg-blue-900/10"
        columnsNumber={3}
        hoveredIndex={hoveredIndex}
      />
      <div className="container xl:px-[150px]">
        <div className="mb-6 max-w-[594px] space-y-5 border-b pb-6 text-green-700 xl:mb-0 xl:border-0 xl:pb-20">
          <h2 className="text-sm font-medium uppercase sm:text-lg">Understanding digital twins</h2>
          <div className="text-xl sm:text-2xl">
            A digital twin is a highly sophisticated virtual replica of a physical system, process,
            or object. It includes a tight integration between models, data and decisions with
            applications across multiple areas of science, technology, and society.
          </div>
          <KnowMoreButton
            onClick={() => setOpenedKnowMore(!openedKnowMore)}
            opened={openedKnowMore}
          />
          <AnimatePresence>
            {openedKnowMore && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                exit={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="text-sm sm:text-base"
              >
                In the context of climate science, a digital twin of the Earth system integrates
                extensive data sets from real-world observations and simulations to create a
                dynamic, interactive model. This virtual environment allows the climate adaptation
                and mitigation community to experiment, predict, and analyse different scenarios
                with unprecedented detail, quality and consistency, while allowing users to address
                relevant ‘what-if’ questions.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {isMobile ? (
          <div className="w-full">
            <Image
              className="h-[142px] w-full"
              alt=""
              src="/images/home-understanding-1.png"
              height={498}
              width={386}
              style={{ objectFit: "cover" }}
            />
            <Image
              className="h-[142px] w-full"
              alt=""
              src="/images/home-understanding-2.png"
              height={498}
              width={386}
              style={{ objectFit: "cover" }}
            />
            <Image
              className="h-[142px] w-full"
              alt=""
              src="/images/home-understanding-3.png"
              height={498}
              width={386}
              style={{ objectFit: "cover" }}
            />
          </div>
        ) : (
          <div className={cn("mb-10 flex h-[498px] w-full overflow-hidden", gridColumns)}>
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
                      src={`/images/home-understanding-${index + 1}.png`}
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
              <h3 className="col-span-1 mb-4 text-lg sm:text-xl xl:mb-0 xl:max-w-[350px] xl:pr-10">
                How the digital twin for climate change adaptation helps research and society?
              </h3>
            </FadeIn>
          </div>
          <FadeIn delay={0.5}>
            <div className={cn(gridColumns, "mb-2 xl:mb-[30px]")}>
              <div className="col-start-2">
                <div className="flex flex-col gap-2 xl:gap-4 xl:pr-10">
                  <div className="flex flex-col">
                    <div className="leading-relaxed xl:text-lg">01</div>
                    <div className="leading-relaxed xl:text-lg">Understanding processes:</div>
                  </div>
                  <div className="text-sm leading-tight xl:max-w-[350px] xl:text-xs">
                    The digital twin produces simulations that allow researchers to understand the
                    complex interactions of phenomena in the Earth-system that determine how our
                    planet evolves.
                  </div>
                </div>
              </div>
              <div className="col-start-3">
                <div className="mt-2 flex flex-col gap-2 xl:mt-0 xl:gap-4 xl:pr-10">
                  <div className="flex flex-col">
                    <div className="leading-relaxed xl:text-lg">02</div>
                    <div className="leading-relaxed xl:text-lg">Simulating scenarios:</div>
                  </div>
                  <div className="text-sm leading-tight xl:max-w-[350px] xl:text-xs">
                    The digital twin allows researchers, policy makers and practitioners to develop
                    and test different climate and impact scenarios that help understand what might
                    happen under various conditions.
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.8}>
            <div className={cn(gridColumns)}>
              <div className="col-start-2">
                <div className="flex flex-col gap-2 xl:gap-4 xl:pr-10">
                  <div className="flex flex-col">
                    <div className="leading-relaxed xl:text-lg">03</div>
                    <div className="leading-relaxed xl:text-lg">Improving decision-making:</div>
                  </div>
                  <div className="text-sm leading-tight xl:max-w-[350px] xl:text-xs">
                    By providing clear and accurate insights on the past, present and future, the
                    digital twin can support decision-makers, policy-makers and world leaders make
                    better informed decisions to address climate-related risks effectively and
                    sustainably
                  </div>
                </div>
              </div>
              <div className="col-start-3">
                <div className="mt-2 flex flex-col gap-2 xl:mt-0 xl:gap-4 xl:pr-10">
                  <div className="flex flex-col">
                    <div className="leading-relaxed xl:text-lg">04</div>
                    <div className="leading-relaxed xl:text-lg">
                      Enhancing interdisciplinary and transdisciplinarity:
                    </div>
                  </div>
                  <div className="text-sm leading-tight xl:max-w-[350px] xl:text-xs">
                    Virtual models support collaboration among users from different disciplines,
                    impact sectors, and geographical locations, ensuring a holistic approach to
                    studying and solving real climate challenges.
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
