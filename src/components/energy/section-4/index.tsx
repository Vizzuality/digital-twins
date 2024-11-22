"use client";

import { useRef, useState } from "react";

import Image from "next/image";

import { AnimatePresence, motion, Variants } from "framer-motion";

import { useIsMobile } from "@/lib/hooks";

import ScrollStep from "@/components/scroll-step";
import StepDots from "@/components/step-dots";
import VideoPlayer from "@/components/video-player";

import ArrowDown from "@/svgs/arrow-down.svg";
import Chart from "@/svgs/chart.svg";

export interface DebugOffsetProps {
  offset: number;
}

export const DebugOffset = ({ offset }: DebugOffsetProps) => {
  return (
    <div
      className="fixed left-0 z-50 h-0 w-full border border-dashed"
      style={{ top: `${offset * 100}%` }}
    >
      <p className="text-xs font-semibold">trigger: {offset}</p>
    </div>
  );
};

const transition = { duration: 0.5, ease: "linear" };

const STEPS = ["step-1", "step-2", "step-3"];

export default function Section4() {
  const scrollSectionRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState("step-1");
  const isMobile = useIsMobile();
  const variantsDescription: Record<string, Variants> = {
    [STEPS[1]]: {
      initial: { top: "100%", opacity: 0 },
      animate: { top: isMobile ? "10%" : "30%", opacity: 1, transition },
      exit: { top: 0, opacity: 0 },
    },
    [STEPS[2]]: {
      initial: { top: "100%", opacity: 0 },
      animate: { top: 0, opacity: 1, transition },
    },
  };

  const legend = (
    <div className="inline-flex h-8 w-full flex-col gap-1 py-1 text-2xs">
      <div className="inline-flex items-start justify-between self-stretch">
        <div>LOW (20º C)</div>
        <div>HIGH (47º C)</div>
      </div>
      <Image
        alt="legend"
        src="/images/energy-legend-observations.svg"
        className="w-full"
        width={378}
        height={100}
      />
    </div>
  );

  const renderChart = (
    <div className="relative max-xl:flex max-xl:w-full max-xl:justify-center sm:max-xl:py-6">
      <div className="relative h-[253px] w-[492px] xl:w-[462px]">
        <Chart className="max-h-[200px] max-w-[100%] xl:max-h-[253px]" />
        <motion.svg
          width="492"
          height="253"
          viewBox="0 0 492 253"
          className="absolute left-0 top-0 max-h-[200px] max-w-[100%] xl:max-h-[253px]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 2,
              ease: "easeInOut",
            }}
            strokeDasharray="0 1"
            stroke="black"
            strokeWidth="3"
            fill="none"
            d="M65 196.201C65.3049 199.621 66.1891 206.87 67.2868 208.511C68.6589 210.563 70.9457 212.615 72.3178 212.908C73.4155 213.142 74.6047 213.006 75.062 212.908C76.1292 172.265 79.7271 90.16 85.5814 86.8774C86.3437 85.3142 88.1426 84.8257 89.2403 95.3771C90.338 105.929 92.137 139.439 92.8992 154.875C94.5762 171.875 98.662 206.577 101.589 209.391C104.516 212.204 107.382 212.908 108.45 212.908C109.059 213.006 110.279 212.732 110.279 210.856C110.279 208.511 115.767 107.687 119.426 104.463C122.353 101.884 123.695 103.388 124 104.463C127.049 138.951 133.513 208.218 134.977 209.391C136.806 210.856 141.38 211.736 142.752 213.201C144.124 214.667 145.039 214.08 145.039 211.736C145.039 209.391 150.07 104.756 153.271 93.6186C156.473 82.4811 160.132 90.6877 160.589 93.6186C161.047 96.5496 167.45 203.236 171.566 205.874C174.859 207.984 177.207 209.098 177.969 209.391C178.579 209 179.798 206.518 179.798 199.719C179.798 191.219 183.915 81.3087 186.202 71.9297C188.488 62.5507 190.318 56.3957 191.69 58.1542C193.062 59.9128 195.349 69.8778 195.806 80.7223C196.264 91.5668 200.837 175.392 204.039 182.133C207.24 188.874 208.612 194.15 209.984 195.322C211.082 196.26 212.271 195.713 212.729 195.322C215.32 153.214 220.504 66.5365 220.504 56.6886C220.504 44.3786 223.705 41.4477 224.62 41.1546C225.535 40.8615 228.279 41.1546 228.279 44.3786C228.279 47.6027 233.767 143.737 235.14 147.255C236.512 150.772 239.713 153.41 239.713 156.927C239.713 160.444 240.628 182.719 242.457 186.236C244.287 189.753 245.202 192.684 245.659 194.443C246.116 196.201 247.488 193.857 247.488 192.391C247.488 190.926 251.147 77.7913 252.519 65.1883C253.891 52.5852 257.093 31.7755 258.922 32.3617C260.752 32.9479 263.039 36.1718 263.039 42.913C263.039 49.6542 264.868 90.9804 266.24 94.4976C267.612 98.0147 268.527 107.687 269.442 110.911C270.174 113.49 273.101 135.433 274.473 146.082C275.235 144.812 276.851 142.565 277.217 143.737C277.674 145.203 279.504 154.289 280.419 152.823C281.333 151.358 286.364 69.5846 285.907 61.9641C285.45 54.3437 290.481 18 292.767 18C295.054 18 295.054 21.8104 296.884 32.3617C298.713 42.913 304.202 139.341 306.488 140.806C308.775 142.272 309.233 142.272 310.605 143.737C311.977 145.203 314.721 172.168 315.636 170.409C316.55 168.65 317.922 137.875 318.38 132.307C318.837 126.738 322.039 44.6716 324.783 39.9821C327.527 35.2926 331.643 34.4133 332.558 39.9821C333.29 44.4371 335.912 100.262 337.132 127.617L344.45 186.236L349.023 194.443C351.463 164.743 356.25 103.935 355.884 98.3078C355.518 92.6804 358.475 64.8951 360 51.7058C360.457 49.2634 361.738 44.3785 363.202 44.3785C365.031 44.3785 365.946 47.6025 365.946 48.4818C365.946 49.1852 369.605 92.9344 371.434 114.721C372.959 132.795 376.008 169.237 376.008 170.409C376.008 171.581 377.532 179.495 378.295 183.305C378.599 187.604 379.484 196.553 380.581 197.96C381.953 199.719 385.155 200.597 385.612 197.96C385.978 195.85 388.814 156.243 390.186 136.703L394.76 69.2915C394.76 66.849 395.217 61.9641 397.047 61.9641C399.333 61.9641 401.62 67.8267 401.62 71.9297C401.62 75.212 404.364 115.503 405.736 135.238L410.767 173.926L413.969 199.719C416.561 200.989 421.561 202.415 420.829 197.96C420.098 193.505 422.049 166.013 423.116 152.823L427.233 113.256L429.519 94.4976C430.129 92.5436 431.806 89.4563 433.636 92.739C435.465 96.0217 435.618 105.635 435.465 110.032L442.326 165.133L444.155 191.219C444.308 193.661 445.436 198.956 448.729 200.598C452.022 202.239 454.37 203.04 455.132 203.235L459.248 150.772L461.992 119.997L464.736 108.566C464.889 108.078 465.377 107.394 466.109 108.566C466.84 109.738 468.548 118.043 469.31 122.048L472.969 150.772L474.341 167.771L478 195.322"
          />
        </motion.svg>
      </div>
    </div>
  );

  return (
    <section className="relative" id="section-4">
      <div className="relative h-[400vh]" ref={scrollSectionRef} id="section-2-scroll-parent">
        <ScrollStep id={STEPS[0]} className="relative h-[50vh]" offset={0.5} onEnter={setStep} />
        <div className="sticky inset-0 flex h-[100vh] w-full justify-center" id="section-4-1">
          <div
            className="absolute top-0 z-10 hidden w-full translate-y-[50vh] transform xl:block"
          >
            <div className="absolute flex h-full w-6 items-center right-[138px]">
              <StepDots
                sectionName="home-2"
                colorClass="bg-green-950"
                stepsNumber={3}
                currentStep={parseInt(step.slice(-1), 10) - 1}
                onClick={(index: number) => {
                  setStep(`step-${index + 1}`);
                }}
              />
            </div>
          </div>
          {step === STEPS[2] && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="z-10 absolute bottom-6 right-16 w-[200px] text-green-950 space-y-2 flex flex-col items-center">
              Scroll to <br /> continue
              <ArrowDown
                className="h-6 w-6 animate-bounce"
              />
            </motion.div>)}
          <VideoPlayer
            src="/videos/stream-videos/observations/index.m3u8"
            className="h-screen w-full"
            fluid
            videoClassName="object-cover max-xl:object-[9%] xl:object-fill !h-screen"
          />
          <motion.div
            className="absolute left-0 top-[calc(50%_-_100px)] flex h-full w-full flex-col gap-4 text-green-950"
            initial="initial"
            animate="animate"
          >
            <AnimatePresence>
              {step === STEPS[0] && (
                <motion.div
                  key="section-4-title-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, translateY: "-200px" }}
                  className="flex w-full flex-col items-center justify-center text-center"
                >
                  <h2 className="uppercase tracking-tight sm:mx-auto xl:text-lg">
                    Exploring energy futures
                  </h2>
                  <h3 className="max-w-[95%] text-[36px] max-xl:leading-[42px] sm:mx-auto xl:max-w-[720px] xl:text-4xl">
                    Inside the 2018 heatwave
                    <br /> on the Iberian Peninsula
                  </h3>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          <AnimatePresence>
            {step !== STEPS[0] && (
              <motion.div
                key="section-4-description-1"
                initial="initial"
                animate="animate"
                variants={variantsDescription[step]}
                className="absolute bottom-0 left-8 h-full w-full max-w-[80vw] text-green-950 xl:left-[60%] xl:max-w-[459px]"
              >
                {step === STEPS[1] && (
                  <motion.div
                    key="section-4-description-2"
                    className="absolute inset-0 h-fit w-full bg-white/30 p-6 text-xl backdrop-blur-lg xl:text-2xl"
                    initial={{ opacity: 0, top: "200px" }}
                    animate={{ opacity: 1, top: 0, transition }}
                    exit={{ opacity: 0, top: "-200px" }}
                  >
                    Imagine using the digital twin to dissect a real-world event like the
                    devastating 2018 European heatwave, which caused the warmest conditions in the
                    Iberian Peninsula since 2003.
                  </motion.div>
                )}
                {step === STEPS[2] && (
                  <div
                    className="flex h-full items-center justify-center"
                    key="section-4-description-3"
                  >
                    <motion.div
                      className="h-fit max-h-screen w-full max-w-[80vw] bg-white/30 p-6 text-base backdrop-blur-lg xl:min-w-[498px] xl:max-w-[498px]"
                      initial={{ opacity: 0, top: "200px" }}
                      animate={{ opacity: 1, top: 0, transition }}
                      exit={{ opacity: 0, top: "-200px" }}
                    >
                      <div className="text-xs xl:pb-10 xl:text-base">
                        According to observations, it can be seen that during the first week of
                        August 2018, temperatures reached 40°C in the southwestern part of the
                        Iberian Peninsula due to a warm air intrusion that moved up from Africa. Two
                        wildfires occurred in Spain during the heatwave, causing more than 4,500
                        burned hectares and thousands of people being evacuated. Some Spanish
                        regions registered the highest number of deaths by heat stroke since
                        official records started in 2004. A portion of health-related impacts could
                        be mitigated by the use of air conditioning, but this caused a 10% rise in
                        Iberian energy consumption and blackouts in Lisbon suburbs.
                      </div>
                      <div className="block max-xl:max-h-[250px]">{renderChart}</div>
                      <div className="flex items-end justify-between gap-4">
                        <div className="max-w-[258px]">{legend}</div>
                        <div className="text-xs">Source: Destination Earth</div>
                      </div>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <ScrollStep id={STEPS[1]} className="h-[100vh]" offset={0.5} onEnter={setStep} />
        <ScrollStep id={STEPS[2]} className="h-[250vh]" offset={0.5} onEnter={setStep} />
      </div>
    </section>
  );
}
