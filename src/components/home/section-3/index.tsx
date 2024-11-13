"use client";

import dynamic from "next/dynamic";
const Lines = dynamic(() => import("@/components/lines"), { ssr: false });
import Image from "next/image";
import { useEffect, useRef, useState, Fragment } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import KnowMoreButton from "@/components/know-more-button";
import { cn } from "@/lib/utils";
import ArrowRight from "@/svgs/arrow-right.svg";
import Link from "next/link";
import { useIsMobile } from "@/lib/hooks";

const USE_CASES = [
  {
    number: "01",
    title: "Energy",
    description:
      "The climate adaptation digital twin in action: simulations to support decisions in the energy sector.",
    linkTitle: "Explore Wind Energy",
    link: "/case-study-energy",
  },
  {
    number: "02",
    title: "Wildfires",
    description: "Coming soon ...",
    comingSoon: true,
  },
  {
    number: "03",
    title: "Urban Environments",
    description: "Coming soon ...",
    comingSoon: true,
  },
  {
    number: "04",
    title: "Water Management",
    description: "Coming soon ...",
    comingSoon: true,
  },
  {
    number: "05",
    title: "Agriculture",
    description: "Coming soon ...",
    comingSoon: true,
  },
];

const CasesText = ({
  hoveredIndex,
  setHoveredIndex,
  content,
  index,
}: {
  index: number;
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
  content: (typeof USE_CASES)[0];
}) => {
  const { number, title, description, linkTitle, link, comingSoon } = content;
  const isMobile = useIsMobile();
  const descriptionText = (
    <>
      <div className="text-xs leading-tight">{description}</div>
      {!comingSoon && (
        <Link href={link || "#"} className="group flex gap-2 pb-1.5 pl-1">
          <div className="text-xs font-medium tracking-tight underline transition-transform group-hover:-translate-x-1">
            {linkTitle}
          </div>
          <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </>
  );
  return (
    <div
      key={`use-case-${index}`}
      className="flex flex-col gap-4 pb-4 pl-1 pt-3 text-base text-green-700 xl:pb-20 xl:pt-10"
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <div className="leading-relaxed">
        <div>{number}</div>
        <div>{title}</div>
      </div>
      {isMobile
        ? descriptionText
        : hoveredIndex === index && (
            <motion.div
              className="flex flex-col gap-4"
              key={`use-case-description-${index}`}
              initial={{ opacity: isMobile ? 1 : 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {descriptionText}
            </motion.div>
          )}
    </div>
  );
};

export default function Section3() {
  const [openedKnowMore, setOpenedKnowMore] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const gridColumns = {
    "grid transition-all duration-500": true,
    "grid-cols-[1.4fr_0.9fr_0.9fr_0.9fr_0.9fr]": hoveredIndex === 0,
    "grid-cols-[0.9fr_1.4fr_0.9fr_0.9fr_0.9fr]": hoveredIndex === 1,
    "grid-cols-[0.9fr_0.9fr_1.4fr_0.9fr_0.9fr]": hoveredIndex === 2,
    "grid-cols-[0.9fr_0.9fr_0.9fr_1.4fr_0.9fr]": hoveredIndex === 3,
    "grid-cols-[0.9fr_0.9fr_0.9fr_0.9fr_1.4fr]": hoveredIndex === 4,
    "grid-cols-[1fr_1fr_1fr_1fr_1fr]": hoveredIndex === null,
  };

  const [visibleCircle, setVisibleCircle] = useState<number | null>(null);
  const [hoveredCircle, setHoveredCircle] = useState<number | null>(null);
  const visualizationRef = useRef(null);
  const isInView = useInView(visualizationRef, { once: true });
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

      runLoop();
      const interval = setInterval(runLoop, 1000);

      return () => clearInterval(interval);
    }
  }, [isInView, setRevealedImageIndex]);
  const isMobile = useIsMobile();
  return (
    <section className="relative scroll-mt-8 bg-white pt-20" id="section-3">
      <Lines
        verticalClassName="xl:px-[152px]"
        sectionName="section-3"
        rows={[1074]}
        colorClass="bg-blue-900/10"
        columnsNumber={5}
        hoveredIndex={hoveredIndex}
      />
      <div className="container flex flex-col xl:block xl:px-[150px]">
        <div className="flex flex-col-reverse items-center gap-6 pb-[60px] xl:flex-row xl:items-start xl:gap-[69px] xl:pb-[150px]">
          <div className="relative" ref={visualizationRef}>
            <Image alt="" src="/images/home-models.svg" width={316} height={906} />
            <div className="group absolute left-8 top-8">
              {revealedImageIndex > 0 && (
                <Image
                  className="absolute inset-0 z-0 h-[240px] w-[240px]"
                  alt=""
                  src="/images/home-integrating-1.png"
                  width={240}
                  height={240}
                />
              )}
              <div
                onMouseEnter={() => setHoveredCircle(0)}
                onMouseLeave={() => setHoveredCircle(null)}
                className={cn(
                  "relative z-10 flex h-60 w-60 items-center justify-center rounded-full bg-light-green transition-opacity",
                  {
                    "opacity-1": visibleCircle === 0 || hoveredCircle === 0,
                    "opacity-0": visibleCircle !== 0 && hoveredCircle !== 0,
                  },
                )}
              >
                <div className="text-center text-lg font-medium uppercase tracking-tight text-blue-800">
                  CLIMATE MODELS SIMULATIONS
                </div>
              </div>
            </div>
            <div className="absolute left-8 top-[318px]">
              {revealedImageIndex > 1 && (
                <Image
                  alt=""
                  className="absolute inset-0 z-0 h-[240px] w-[240px]"
                  src="/images/home-integrating-2.png"
                  width={217}
                  height={212}
                />
              )}
              <div
                onMouseEnter={() => setHoveredCircle(1)}
                onMouseLeave={() => setHoveredCircle(null)}
                className={cn(
                  "relative z-10 flex h-60 w-60 items-center justify-center rounded-full bg-light-green transition-opacity",
                  {
                    "opacity-1": visibleCircle === 1 || hoveredCircle === 1,
                    "opacity-0": visibleCircle !== 1 && hoveredCircle !== 1,
                  },
                )}
              >
                <div className="text-center text-lg font-medium uppercase tracking-tight text-blue-800">
                  Data streaming
                </div>
              </div>
            </div>
            <div className="absolute left-8 top-[614px]">
              {revealedImageIndex > 2 && (
                <Image
                  alt=""
                  className="absolute inset-0 z-0 h-[240px] w-[240px] fade-in-100"
                  src="/images/home-integrating-3.png"
                  width={202}
                  height={206}
                />
              )}
              <div
                onMouseEnter={() => setHoveredCircle(2)}
                onMouseLeave={() => setHoveredCircle(null)}
                className={cn(
                  "relative z-10 flex h-60 w-60 flex-col items-center justify-center rounded-full bg-light-green transition-opacity",
                  {
                    "opacity-1": visibleCircle === 2 || hoveredCircle === 2,
                    "opacity-0": visibleCircle !== 2 && hoveredCircle !== 2,
                  },
                )}
              >
                <div className="pb-1 text-center text-lg font-medium uppercase tracking-tight text-blue-800">
                  Impact models
                </div>
                <div className="text-center text-xs font-medium uppercase leading-5 tracking-tight text-blue-800">
                  Applications in <br />
                  different sectors
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-[594px] space-y-3 pb-10 text-green-700 xl:space-y-5">
            <div className="font-medium uppercase xl:text-lg">From data to impact</div>
            <h2 className="pb-8 text-2xl font-medium xl:pb-20 xl:text-4xl">
              Integrating Climate and Impact Models
            </h2>
            <h3 className="pb-4 text-xl xl:pb-10 xl:text-2xl">
              Digital twins offer a powerful capability: integrating the physical processes
              simulated in climate models with the modelling of aspects relevant for impact sectors.
            </h3>
            <KnowMoreButton
              onClick={() => setOpenedKnowMore(!openedKnowMore)}
              opened={openedKnowMore}
            />
            <AnimatePresence>
              {openedKnowMore && (
                <motion.div
                  key="section-3-know-more-description"
                  initial={{ opacity: 0, height: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                >
                  In the context of climate science, a digital twin of the Earth system integrates
                  extensive data sets from real-world observations and simulations to create a
                  dynamic, interactive model. This virtual environment allows the climate adaptation
                  and mitigation community to experiment, predict, and analyse different scenarios
                  with unprecedented detail, quality and consistency, while allowing users to
                  address relevant ‘what-if’ questions.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        {isMobile ? (
          <div className="scroll-mt-12 pb-[60px]" id="use-cases">
            {Array(5)
              .fill(null)
              .map((_, index) => (
                <Fragment key={`home-models-${index}`}>
                  <Image
                    className="h-[130px] w-full"
                    alt=""
                    src={`/images/home-models-${index + 1}.png`}
                    height={130}
                    width={356}
                    style={{ objectFit: "cover" }}
                  />
                  <CasesText
                    key={`cases-text-${index}`}
                    content={USE_CASES[index]}
                    index={index}
                    hoveredIndex={hoveredIndex}
                    setHoveredIndex={setHoveredIndex}
                  />
                </Fragment>
              ))}
          </div>
        ) : (
          <div className={cn("flex h-[498px] w-full overflow-hidden", gridColumns)}>
            <AnimatePresence>
              {Array(5)
                .fill(null)
                .map((_, index) => (
                  <motion.div
                    key={`image-section-3-${index}`}
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    transition={{ delay: 0.5 + index * 1, duration: 1, ease: "easeInOut" }}
                    className={cn("relative z-10 flex h-full items-center")}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <Image
                      alt=""
                      src={`/images/home-models-${index + 1}.png`}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        )}
        {!isMobile && (
          <div className={cn("hidden min-h-[290px] xl:visible", gridColumns)} id="use-cases">
            {Array(5)
              .fill(null)
              .map((_, index) => (
                <CasesText
                  key={`cases-text-${index}`}
                  content={USE_CASES[index]}
                  index={index}
                  hoveredIndex={hoveredIndex}
                  setHoveredIndex={setHoveredIndex}
                />
              ))}
          </div>
        )}
      </div>
    </section>
  );
}
