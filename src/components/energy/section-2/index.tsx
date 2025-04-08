"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

import { AnimatePresence, motion } from "framer-motion";
import { useRecoilState } from "recoil";

import { useIsMobile } from "@/lib/hooks";
import { cn, scrollToSection } from "@/lib/utils";

import { globePhaseAtom } from "@/store";

import GlobeMap from "@/components/globe-map";
import ScrollStep from "@/components/scroll-step";
import StepDots from "@/components/step-dots";

import ArrowDown from "@/svgs/arrow-down.svg";
import ArrowRight from "@/svgs/arrow-right.svg";

const transition = { duration: 0.2, ease: "linear" };

const STEPS = ["section-2-step-1", "section-2-step-2"];

export default function Section2() {
  const [step, setStep] = useState(STEPS[0]);
  const [globePhase, setGlobePhase] = useRecoilState(globePhaseAtom);
  const [mobileGlobeTextIndex, setMobileGlobeTextIndex] = useState(0);

  useEffect(() => {
    if (globePhase !== 1 && step === STEPS[1]) {
      setGlobePhase(1);
    }
    if (globePhase !== 0 && step !== STEPS[1]) {
      setGlobePhase(0);
    }
  }, [step, globePhase, setGlobePhase]);

  const handleMobileNext = () => {
    if (mobileGlobeTextIndex === 1 && step === STEPS[1]) {
      return;
    }
    if (mobileGlobeTextIndex === 0) {
      setMobileGlobeTextIndex(1);
      return;
    }
    if (step === STEPS[0]) {
      setMobileGlobeTextIndex(0);
      setStep(STEPS[1]);
    }
  };

  const handleMobilePrev = () => {
    if (mobileGlobeTextIndex === 0 && step === STEPS[0]) {
      return;
    }
    if (mobileGlobeTextIndex === 1) {
      setMobileGlobeTextIndex(0);
      return;
    }
    if (step === STEPS[1]) {
      setMobileGlobeTextIndex(1);
      setStep(STEPS[0]);
    }
  };

  const isMobile = useIsMobile();

  const renderArrows = (
    <div className="absolute right-5 top-8 flex items-center gap-2.5">
      <button
        className={cn("flex h-10 w-10 items-center justify-center rounded-full bg-green-700", {
          hidden: step === STEPS[0] && mobileGlobeTextIndex === 0,
        })}
        onClick={handleMobilePrev}
        type="button"
        title="Previous text"
      >
        <div className="sr-only">Previous text</div>
        <ArrowRight className="h-[30px] w-[30px] -rotate-180 p-[2px] text-light-green" />
      </button>
      {step === STEPS[0] && mobileGlobeTextIndex === 0 && (
        <p className="mr-2 text-base">Know more</p>
      )}
      <button
        className={cn("flex h-10 w-10 items-center justify-center rounded-full bg-green-700", {
          hidden: step === STEPS[1] && mobileGlobeTextIndex === 1,
        })}
        onClick={handleMobileNext}
        type="button"
        title="Next text"
      >
        <div className="sr-only">Next text</div>
        <ArrowRight className="h-[30px] w-[30px] p-[2px] text-light-green" />
      </button>
    </div>
  );

  return (
    <section className="relative bg-green-200 text-green-700" id="section-2">
      <div className="relative h-screen xl:h-[250vh]" id="section-2-scroll-parent">
        <ScrollStep
          id={STEPS[0]}
          className="relative hidden h-[100vh] xl:block"
          offset={0.5}
          onEnter={setStep}
        />
        <ScrollStep
          id={STEPS[1]}
          className="hidden h-[110vh] xl:block xl:h-[150vh]"
          offset={0.5}
          onEnter={setStep}
        />

        <div className="absolute top-0 h-screen w-full xl:h-[250vh]">
          <div className="inset-0 top-0 h-[100vh] w-full xl:sticky">
            {/* Desktop */}
            <div className="absolute top-0 z-10 hidden w-full translate-y-[50vh] transform xl:block">
              <div className="absolute right-6 flex h-full w-6 items-center 2xl:right-[138px]">
                <StepDots
                  sectionName="home-2"
                  colorClass="bg-green-700"
                  stepsNumber={2}
                  currentStep={globePhase}
                  onClick={(index: number) => {
                    scrollToSection(`section-2-step-${index + 1}`);
                  }}
                />
              </div>
            </div>
            {step === STEPS[1] && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute bottom-6 right-0 hidden w-[100px] flex-col items-center space-y-2 text-center text-green-700 xl:flex 2xl:right-[106px]"
              >
                Scroll to <br /> continue
                <ArrowDown className="h-6 w-6 animate-bounce" />
              </motion.div>
            )}

            <div className="flex h-screen w-full flex-col-reverse items-center justify-end xl:container xl:h-full xl:flex-row xl:justify-center xl:gap-[63px]">
              <div
                key="section-2-title-1"
                className="flex h-full max-h-[936px] w-full items-center justify-center xl:w-1/2"
              >
                <GlobeMap
                  className="flex h-[130vw] w-[130vw] items-center sm:h-full sm:w-full"
                  videoMaterial={
                    step === STEPS[1]
                      ? "videos/capacity_factor_10km.mp4"
                      : "videos/stream-videos/wind_speed_global_10km/index.m3u8"
                  }
                  rotate={step !== STEPS[1]}
                  fallbackElement={
                    <div className="container flex h-full w-full items-center justify-center p-4 sm:max-h-[80vw]">
                      <Image
                        src={
                          step === STEPS[1]
                            ? "/images/energy-globe-1.png"
                            : "/images/energy-globe-2.png"
                        }
                        alt="Context lost"
                        className="h-full w-full object-contain object-top xl:object-center"
                        width={400}
                        height={400}
                      />
                    </div>
                  }
                />
              </div>

              <div className="flex h-[45vh] w-full flex-col max-xl:container max-xl:max-h-[60vh] max-xl:pt-[100px] sm:h-[30vh] lg:h-[25vh] xl:h-full xl:w-1/2 xl:max-w-[612px] xl:justify-center lg:landscape:h-[30vh]">
                {isMobile && renderArrows}
                <AnimatePresence>
                  {step !== STEPS[1] ? (
                    <motion.div
                      key="section-2-description-1"
                      initial={{ opacity: 0, translateY: !isMobile ? "200px" : 0 }}
                      animate={{ opacity: 1, translateY: 0, transition }}
                      className="max-w-[480px] space-y-3 xl:space-y-6"
                    >
                      <h2
                        className={cn("text-xl xl:text-2xl", {
                          hidden: isMobile && mobileGlobeTextIndex === 1,
                        })}
                      >
                        Digital twins are revolutionising the way to approach wind farm development
                        and energy management.
                      </h2>
                      <div className="relative">
                        {(!isMobile || mobileGlobeTextIndex === 0) && (
                          <motion.div className="text-sm leading-tight xl:text-base">
                            <p>
                              By allowing users to perform simulations that replicate real-world
                              conditions, digital twins can help energy practitioners to map the
                              wind potential of different regions, optimise the location of wind
                              turbines, and predict energy generation.
                            </p>
                          </motion.div>
                        )}
                        {(!isMobile || mobileGlobeTextIndex === 1) && (
                          <motion.div className="text-sm leading-tight xl:text-base">
                            <p>
                              The energy output of a wind turbine depends on a variety of factors,
                              the most important being the wind speed at the height at which the
                              turbines are placed. Current state-of-the-art models only provide wind
                              information at 10 metres, whereas wind turbines are normally placed at
                              around 100 metres height, and this requires an interpolation to
                              convert wind speed from 10 to 100 metres.
                            </p>
                          </motion.div>
                        )}
                      </div>
                      <p
                        className={cn("text-xs leading-tight", {
                          hidden: isMobile && mobileGlobeTextIndex === 0,
                        })}
                      >
                        Legend: wind energy. Data source: nextGEMS
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="section-2-description-2"
                      initial={{ opacity: 0, translateY: isMobile ? 0 : "200px" }}
                      animate={{ opacity: 1, translateY: 0, transition }}
                      className="relative max-w-[480px] space-y-4 xl:space-y-6"
                    >
                      {(!isMobile || mobileGlobeTextIndex === 0) && (
                        <motion.div className="text-sm leading-tight xl:text-base">
                          <p>
                            A wind turbine has a specific power curve that is provided by the
                            manufacturer and depends on several factors (e.g. rotor diameter, rated
                            wind speed, etc.). The measure of how much energy a turbine produces
                            compared to its maximum theoretical output, over a certain period of
                            time, is what is called capacity factor. This is a more meaningful
                            variable to the energy industry than wind speed or energy density.
                            Therefore, it is crucial for energy companies to get access to
                            information about the capacity factor to be able to assess energy supply
                            and meet the demand.
                          </p>
                        </motion.div>
                      )}
                      {(!isMobile || mobileGlobeTextIndex === 1) && (
                        <motion.div className="text-sm leading-tight xl:text-base">
                          <p>
                            Classic energy models require full time series to generate histograms of
                            the capacity factor, which makes using the outputs of the digital twin
                            challenging. However, a streaming setup allows histograms to be built on
                            the fly. This functionality greatly facilitates the interactivity
                            between the results from the climate models with impact model
                            applications, such as applications used by the energy sector.
                          </p>
                        </motion.div>
                      )}
                      <p
                        className={cn("text-xs leading-tight", {
                          hidden: isMobile && mobileGlobeTextIndex === 0,
                        })}
                      >
                        Legend: capacity factor. Data source: nextGEMS
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
