'use client';
import Lines from "@/components/lines";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import KnowMoreButton from "@/components/know-more-button";
import { cn } from "@/lib/utils";
import ArrowRight from '@/svgs/arrow-right.svg';
import Link from "next/link";

export default function Section3() {
  const [openedKnowMore, setOpenedKnowMore] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const gridColumns = {
    'grid transition-all duration-500': true,
    'grid-cols-[1.4fr_0.9fr_0.9fr_0.9fr_0.9fr]': hoveredIndex === 0,
    'grid-cols-[0.9fr_1.4fr_0.9fr_0.9fr_0.9fr]': hoveredIndex === 1,
    'grid-cols-[0.9fr_0.9fr_1.4fr_0.9fr_0.9fr]': hoveredIndex === 2,
    'grid-cols-[0.9fr_0.9fr_0.9fr_1.4fr_0.9fr]': hoveredIndex === 3,
    'grid-cols-[0.9fr_0.9fr_0.9fr_0.9fr_1.4fr]': hoveredIndex === 4,
    'grid-cols-[1fr_1fr_1fr_1fr_1fr]': hoveredIndex === null,
  };

  const [visibleCircle, setVisibleCircle] = useState<number | null>(null);
  const [hoveredCircle, setHoveredCircle] = useState<number | null>(null);
  const visualizationRef = useRef(null);
  const isInView = useInView(visualizationRef);
  const [revealedImageIndex, setRevealedImageIndex] = useState(0);

  useEffect(() => {
    if (isInView) {
      let fullReveal = false;
      let i = 0;

      const runLoop = () => {
        if (i === 3) {
          // wait 10s before starting the loop again
          setTimeout(() => {
            fullReveal = true;
            i = 0;
          }, 10000);
        }

        if (!fullReveal && i < 4) {
          setRevealedImageIndex(i);
        }
        setVisibleCircle(i);
        i++;
      };

      runLoop()
      const interval = setInterval(runLoop, 1000);

      return () => clearInterval(interval);
    }
  }, [isInView, setRevealedImageIndex]);

  return (
    <section className="relative bg-white pt-20 scroll-mt-8" id="section-3">
      <Lines verticalClassName="pl-[152px] pr-[152px]" sectionName="section-3" rows={[1074]} colorClass="bg-blue-900/10" columnsNumber={5} hoveredIndex={hoveredIndex} />
      <div className="container px-[150px]">
        <div className="flex pb-[150px] gap-[69px]">
          <div className="relative" ref={visualizationRef}>
            <Image
              alt=""
              src="/images/home-models.svg"
              width={316}
              height={906}
            />
            <div className="absolute top-8 left-8 group">
              {revealedImageIndex > 0 && < Image
                className="absolute inset-0 w-[240px] h-[240px] z-0"
                alt=""
                src="/images/home-integrating-1.png"
                width={240}
                height={240}
              />}
              <div
                onMouseEnter={() => setHoveredCircle(0)}
                onMouseLeave={() => setHoveredCircle(null)}
                className={cn("relative flex h-60 w-60 items-center justify-center rounded-full bg-light-green transition-opacity z-10",
                  {
                    "opacity-1": visibleCircle === 0 || hoveredCircle === 0,
                    "opacity-0": visibleCircle !== 0 && hoveredCircle !== 0
                  }
                )} >
                <div className="text-center text-blue-800 text-lg font-medium uppercase tracking-tight">CLIMATE MODELS SIMULATIONS</div>
              </div>
            </div>
            <div className="absolute top-[318px] left-8">
              {revealedImageIndex > 1 && <Image
                alt=""
                className="absolute inset-0 w-[240px] h-[240px] z-0"
                src="/images/home-integrating-2.png"
                width={217}
                height={212}
              />}
              <div
                onMouseEnter={() => setHoveredCircle(1)}
                onMouseLeave={() => setHoveredCircle(null)}
                className={cn("relative flex h-60 w-60 items-center justify-center rounded-full bg-light-green transition-opacity z-10",
                  {
                    "opacity-1": visibleCircle === 1 || hoveredCircle === 1,
                    "opacity-0": visibleCircle !== 1 && hoveredCircle !== 1
                  }
                )} >
                <div className="text-center text-blue-800 text-lg font-medium uppercase tracking-tight">Data streaming</div>
              </div>
            </div>
            <div className="absolute top-[614px] left-8">
              {revealedImageIndex > 2 && <Image
                alt=""
                className="absolute inset-0 w-[240px] h-[240px] z-0 fade-in-100"
                src="/images/home-integrating-3.png"
                width={202}
                height={206}
              />}
              <div
                onMouseEnter={() => setHoveredCircle(2)}
                onMouseLeave={() => setHoveredCircle(null)}
                className={cn("relative flex flex-col h-60 w-60 items-center justify-center rounded-full bg-light-green transition-opacity z-10",
                  {
                    "opacity-1": visibleCircle === 2 || hoveredCircle === 2,
                    "opacity-0": visibleCircle !== 2 && hoveredCircle !== 2
                  }
                )} >
                <div className="text-center text-blue-800 text-lg font-medium uppercase tracking-tight pb-1">Impact models</div>
                <div className="text-center text-blue-800 text-xs font-medium uppercase tracking-tight leading-5">Applications in <br />different sectors</div>
              </div>
            </div>
          </div>
          <div className="max-w-[594px] text-green-700 space-y-5 pb-10">
            <div className="text-lg font-medium uppercase">From data to impact</div>
            <h2 className="text-3xl font-medium pb-20">Integrating Climate and Impact Models</h2>
            <h3 className="text-2xl pb-10">Digital twins offer a powerful capability: integrating the physical processes simulated in climate models with the modelling of aspects relevant for impact sectors.</h3>
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
        </div>
        <div className={cn("flex w-full h-[498px] overflow-hidden", gridColumns)}>
          <AnimatePresence>
            {Array(5).fill(null).map((_, index) => (
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
                  src={`/images/home-models-${index + 1}.png`}
                  layout="fill"
                  objectFit="cover"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className={cn('min-h-[290px]', gridColumns)}>
          <div className="pt-10 pb-20 pl-1 flex-col gap-4 flex text-green-700 text-base" onMouseEnter={() => setHoveredIndex(0)} onMouseLeave={() => setHoveredIndex(null)}>
            <div className="leading-relaxed">
              <div>01</div>
              <div>Energy</div>
            </div>
            {hoveredIndex === 0 && (
              <motion.div className="flex flex-col gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <div className="text-xs leading-tight">The climate adaptation digital twin in action: simulations to support decisions in the energy sector.</div>
                <Link href="/case-study-energy" className="pl-1 pb-1.5 gap-2 flex group">
                  <div className="text-xs underline font-medium tracking-tight group-hover:-translate-x-1 transition-transform">Explore Wind Energy</div>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            )}
          </div>
          <div className="pt-10 pb-20 pl-1 flex-col gap-4 flex text-green-700 text-base" onMouseEnter={() => setHoveredIndex(1)} onMouseLeave={() => setHoveredIndex(null)}>
            <div className="leading-relaxed">
              <div>02</div>
              <div>Wildfires</div>
            </div>
            {hoveredIndex === 1 && (
              <motion.div className="flex flex-col gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <div className="text-xs leading-tight">Coming soon ...</div>
              </motion.div>
            )}
          </div>
          <div className="pt-10 pb-20 pl-1 flex-col gap-4 flex text-green-700 text-base" onMouseEnter={() => setHoveredIndex(2)} onMouseLeave={() => setHoveredIndex(null)}>
            <div className="leading-relaxed">
              <div>03</div>
              <div>Urban Environments</div>
            </div>
            {hoveredIndex === 2 && (
              <motion.div className="flex flex-col gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <div className="text-xs leading-tight">Coming soon ...</div>
              </motion.div>
            )}
          </div>
          <div className="pt-10 pb-20 pl-1 flex-col gap-4 flex text-green-700 text-base" onMouseEnter={() => setHoveredIndex(3)} onMouseLeave={() => setHoveredIndex(null)}>
            <div className="leading-relaxed">
              <div>04</div>
              <div>Water Management</div>
            </div>
            {hoveredIndex === 3 && (
              <motion.div className="flex flex-col gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <div className="text-xs leading-tight">Coming soon ...</div>
              </motion.div>
            )}
          </div>
          <div className="pt-10 pb-20 pl-1 flex-col gap-4 flex text-green-700 text-base" onMouseEnter={() => setHoveredIndex(4)} onMouseLeave={() => setHoveredIndex(null)}>
            <div className="leading-relaxed">
              <div>05</div>
              <div>Agriculture</div>
            </div>
            {hoveredIndex === 4 && (
              <motion.div className="flex flex-col gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <div className="text-xs leading-tight">Coming soon ...</div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section >);
};