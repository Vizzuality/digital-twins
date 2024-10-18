'use client';
import Lines from "@/components/lines";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import KnowMoreButton from "@/components/know-more-button";
import { cn } from "@/lib/utils";
import FadeIn from "@/components/animations/fade-in";

export default function Section1() {
  const [openedKnowMore, setOpenedKnowMore] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const gridColumns = {
    'grid transition-all duration-500': true,
    'grid-cols-[1.2fr_0.9fr_0.9fr]': hoveredIndex === 0,
    'grid-cols-[0.9fr_1.2fr_0.9fr]': hoveredIndex === 1,
    'grid-cols-[0.9fr_0.9fr_1.2fr]': hoveredIndex === 2,
    'grid-cols-[1fr_1fr_1fr]': hoveredIndex === null,
  };

  return (
    <section className="relative bg-white py-20 scroll-mt-8" id="section-1">
      <Lines verticalClassName="pl-[152px] pr-[152px]" sectionName="section-1" rows={[openedKnowMore ? 632 : 474, (!hoveredIndex || hoveredIndex === 0) ? 1108 : 1136]} colorClass="bg-blue-900/10" columnsNumber={3} hoveredIndex={hoveredIndex} />
      <div className="container px-[150px]">
        <div className="max-w-[594px] text-green-700 space-y-5 pb-20">
          <div className=" text-lg font-medium uppercase">Understanding digital twins</div>
          <h3 className="text-2xl">A digital twin is a highly sophisticated virtual replica of a physical system, process, or object. It includes a tight integration between models, data and decisions with applications across multiple areas of science, technology, and society.</h3>
          <KnowMoreButton onClick={() => setOpenedKnowMore(!openedKnowMore)} opened={openedKnowMore} />
          <AnimatePresence>
            {openedKnowMore && <motion.div
              initial={{ opacity: 0, height: 0 }}
              exit={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
            >
              In the context of climate science, a digital twin of the Earth system integrates extensive data sets from real-world observations and simulations to create a dynamic, interactive model. This virtual environment allows the climate adaptation and mitigation community to experiment, predict, and analyse different scenarios with unprecedented detail, quality and consistency, while allowing users to address relevant ‘what-if’ questions.
            </motion.div>}
          </AnimatePresence>
        </div>
        <div className={cn("flex w-full h-[480px] overflow-hidden mb-10", gridColumns)}>
          <AnimatePresence>
            {Array(3).fill(null).map((_, index) => (
              <motion.div key={index}
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                transition={{ delay: 0.5 + index * 1, duration: 1, ease: "easeInOut" }}
                className={cn("relative z-10 flex items-center h-full")}
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
        <div className={cn("text-green-700 grid")}
        >
          <div className={cn(gridColumns)}>
            <FadeIn delay={0.5}>
              <h4 className="text-xl pr-10 mb-4 col-span-1 max-w-[350px]">
                How the digital twin for climate change adaptation helps research and society?
              </h4>
            </FadeIn>
          </div>
          <FadeIn delay={1}>
            <div className={cn(gridColumns, 'mb-[30px]')}>
              <div className="col-start-2">
                <div className="flex-col gap-4 flex pr-10">
                  <div className="flex-col flex " >
                    <div className="text-lg leading-relaxed">01</div>
                    <div className="text-lg leading-relaxed">Understanding processes:</div>
                  </div>
                  <div className="text-sm leading-tight max-w-[350px]">The digital twin produces simulations that allow researchers to understand the complex interactions of phenomena in the Earth-system that determine how our planet evolves.</div>
                </div>
              </div>
              <div className="col-start-3">
                <div className="flex-col gap-4 flex pr-10">
                  <div className="flex-col flex">
                    <div className="text-lg leading-relaxed">02</div>
                    <div className="text-lg leading-relaxed">Simulating scenarios:</div>
                  </div>
                  <div className="text-sm leading-tight max-w-[350px]">The digital twin allows researchers, policy makers and practitioners to develop and test different climate and impact scenarios that help understand what might happen under various conditions.</div>
                </div>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={1.3}>
            <div className={cn(gridColumns)}>
              <div className="col-start-2">
                <div className="flex-col gap-4 flex pr-10">
                  <div className="flex-col flex ">
                    <div className="text-lg leading-relaxed">03</div>
                    <div className="text-lg leading-relaxed">Improving decision-making:</div>
                  </div>
                  <div className="text-sm leading-tight max-w-[350px]">By providing clear and accurate insights on the past, present and future, the digital twin can support decision-makers, policy-makers and world leaders make better informed decisions to address climate-related risks effectively and sustainably</div>
                </div>
              </div>
              <div className="col-start-3">
                <div className="flex-col gap-4 flex pr-10">
                  <div className="flex-col flex">
                    <div className="text-lg leading-relaxed">04</div>
                    <div className="text-lg leading-relaxed">Enhancing interdisciplinary and transdisciplinarity:</div>
                  </div>
                  <div className="text-sm leading-tight max-w-[350px]">Virtual models support collaboration among users from different disciplines, impact sectors, and geographical locations, ensuring a holistic approach to studying and solving real climate challenges.</div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section >);
};