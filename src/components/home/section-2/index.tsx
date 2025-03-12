"use client";

import { useEffect, useState, forwardRef } from "react";

import Image from "next/image";

import { motion, AnimatePresence } from "framer-motion";
import { Resizable } from "re-resizable";
import { useRecoilState, useRecoilValue } from "recoil";

import { useIsMobile, useWindowWidth } from "@/lib/hooks";
import { cn, scrollToSection } from "@/lib/utils";

import { globePhaseAtom, selectedGlobeMarkerAtom } from "@/store";

import { Button } from "@/components/button";
import GlobeMap from "@/components/globe-map";
import { VideoSyncProvider } from "@/components/globe-map/video-sync-context";
import ScrollStep from "@/components/scroll-step";
import StepDots from "@/components/step-dots";

import ArrowDown from "@/svgs/arrow-down.svg";
import ArrowRight from "@/svgs/arrow-right.svg";
import CaretRight from "@/svgs/caret-right.svg";

import InfoPopover from "../../info-popover";

import FallbackPopups from "./fallback-popups";

const ResizeButton = () => (
  <>
    <Button
      className={cn(
        "absolute -left-[130px] top-[85%] z-10 border-0 bg-green-950 px-[18px] py-[14px] font-semibold text-white xl:-left-[180px]",
      )}
    >
      <div className="text-center text-2xs uppercase xl:text-sm">low resolution</div>
      <CaretRight className="h-4 w-4 rotate-180" />
      <div className="h-6 w-px bg-green-800/10"></div>
      <CaretRight className="h-4 w-4" />
      <div className="text-center text-2xs uppercase xl:text-sm">high resolution</div>
    </Button>
  </>
);

const STEPS = ["section-2-step-1", "section-2-step-2", "section-2-step-3"];

type Phase2ContentProps = {
  isMobile: boolean;
  mobileGlobeTextIndex: number;
};

const Phase2Content = forwardRef<HTMLDivElement, Phase2ContentProps>((props, ref) => {
  const { isMobile, mobileGlobeTextIndex } = props;

  return (
    <motion.div
      key="section-2-phase-2-content"
      className="mx-5 flex items-center justify-center bg-white/30 p-6 leading-relaxed text-green-950 backdrop-blur-lg xl:mx-0 xl:w-[517px]"
      ref={ref}
      initial={{ opacity: 0, y: !isMobile ? "100%" : 0 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          ease: "linear",
        },
      }}
    >
      <div className="flex flex-col gap-2 xl:gap-6">
        <AnimatePresence>
          {(!isMobile || mobileGlobeTextIndex === 0) && (
            <motion.div key="mobile-text-1" className="flex flex-col gap-2 xl:gap-6">
              <p>
                At the{" "}
                <InfoPopover
                  variant="dark"
                  content={
                    <>
                      The resolution of a model refers to the size of each grid box. When increasing
                      the resolution, the grid boxes become smaller, allowing for more detailed
                      calculations and the model output to be more relevant to users (source:{" "}
                      <a target="_blank" rel="noreferrer noopener" href="https://www.ecmwf.int/">
                        ECMWF
                      </a>
                      )
                    </>
                  }
                >
                  resolutions
                </InfoPopover>{" "}
                that global climate models use today, a number of small-scale processes that are
                important for the simulation of extreme events and the evolution of the climate
                system, are not directly represented. Increasing the model resolution (i.e. reducing
                the size of grid cells used in climate models both horizontally and vertically)
                allows researchers to represent these processes more directly.
              </p>
            </motion.div>
          )}
          {(!isMobile || mobileGlobeTextIndex === 1) && (
            <motion.div key="mobile-text-2" className="flex flex-col gap-2 xl:gap-6">
              <p>
                The climate adaptation digital twin provides high-quality information at scales that
                matter to society, based on better simulations performed with more realistic
                Earth-system models and a better integration of observations and simulations. This
                unprecedented level of detail, towards the km-scale, allows users to study localised
                impacts and devise more targeted solutions for climate adaptation and mitigation.
              </p>
              <p>
                An evaluation of the simulations and a quantification of uncertainties is regularly
                done to ensure the quality and transparency of the information provided by the
                digital twin.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
});

Phase2Content.displayName = "Phase2Content";

type MobileArrowsProps = {
  step: string;
  handleMobileNext: () => void;
  handleMobilePrev: () => void;
};
const MobileArrows = ({ step, handleMobileNext, handleMobilePrev }: MobileArrowsProps) => {
  const selectedMarker = useRecoilValue(selectedGlobeMarkerAtom);

  return (
    <div className="absolute right-5 top-8 z-30">
      <div className="flex items-center gap-2.5">
        <button
          className={cn("flex h-10 w-10 items-center justify-center rounded-full bg-light-green", {
            hidden: step === STEPS[0] || selectedMarker !== null,
          })}
          onClick={handleMobilePrev}
          type="button"
          title="Previous text"
        >
          <div className="sr-only">Previous text</div>
          <ArrowRight className="h-[30px] w-[30px] -rotate-180 p-[2px] text-green-700" />
        </button>
        <button
          className={cn("flex h-10 w-10 items-center justify-center rounded-full bg-light-green", {
            hidden: step === STEPS[2],
          })}
          onClick={handleMobileNext}
          type="button"
          title="Next text"
        >
          <div className="sr-only">Next text</div>
          <ArrowRight className="h-[30px] w-[30px] p-[2px] text-green-700" />
        </button>
      </div>
      {step === STEPS[0] && (
        <p className="absolute w-[100px] -translate-x-8 translate-y-10 -rotate-90 text-base text-light-green">
          Know more
        </p>
      )}
    </div>
  );
};

export default function Section2() {
  const isMobile = useIsMobile();

  const [globePhase, setGlobePhase] = useRecoilState(globePhaseAtom);
  let screenWidth = useWindowWidth();
  if (!screenWidth) {
    screenWidth = isMobile ? 400 : 800;
  }

  const [resizableWidth, setResizableWidth] = useState(screenWidth ? screenWidth / 2 : 800);
  const [step, setStep] = useState(STEPS[0]);
  useEffect(() => {
    setGlobePhase(STEPS.indexOf(step));
  }, [step, setGlobePhase]);

  useEffect(() => {
    if (globePhase !== 0 && screenWidth) {
      // Prevent errors on reload
      setResizableWidth(screenWidth);
    } else if (screenWidth || resizableWidth === 0) {
      // Set the resizable width to initial half the size
      setResizableWidth(screenWidth / 2);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenWidth, globePhase]);

  const [mobileGlobeTextIndex, setMobileGlobeTextIndex] = useState(0);

  const handleMobileNext = () => {
    if (step === STEPS[2]) {
      return;
    }
    if (step === STEPS[1] && mobileGlobeTextIndex === 0) {
      setMobileGlobeTextIndex(1);
      return;
    }
    setMobileGlobeTextIndex(0);
    const nextStep = STEPS[STEPS.indexOf(step) + 1];
    setStep(nextStep);
  };

  const handleMobilePrev = () => {
    if (step === STEPS[0]) {
      return;
    }
    if (step === STEPS[1] && mobileGlobeTextIndex === 1) {
      setMobileGlobeTextIndex(0);
      return;
    }
    setMobileGlobeTextIndex(1);
    const prevText = STEPS[STEPS.indexOf(step) - 1];
    setStep(prevText);
  };

  return (
    <section className="relative bg-green-800" id="section-2">
      <div className="relative h-screen xl:h-[350vh]" id="section-2-scroll-parent">
        {isMobile && (
          <MobileArrows {...{ step, mobileGlobeTextIndex, handleMobileNext, handleMobilePrev }} />
        )}
        <div className="absolute top-0 h-screen w-full justify-center xl:h-[350vh]">
          <div
            className="inset-0 top-0 flex h-[100vh] items-end justify-center xl:sticky"
            id="globe-phase-1"
          >
            <div className="absolute top-0 z-40 hidden w-full translate-y-[50vh] transform xl:block">
              <div className="absolute right-[138px] flex h-full w-6 items-center">
                <StepDots
                  sectionName="home-2"
                  colorClass="bg-green-300"
                  stepsNumber={3}
                  currentStep={globePhase}
                  onClick={(index: number) => scrollToSection(`section-2-step-${index + 1}`)}
                />
              </div>
            </div>
            {globePhase === 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute bottom-6 right-14 hidden w-[200px] flex-col items-center space-y-2 text-center text-green-300 xl:flex"
              >
                Scroll to <br /> continue
                <ArrowDown className="h-6 w-6 animate-bounce" />
              </motion.div>
            )}
            <VideoSyncProvider>
              <div
                className="apt-[10vh] relative h-[100vh] w-full overflow-hidden xl:pt-0"
                id="high-globe-container"
              >
                {/* High globe */}
                <GlobeMap
                  className={cn("mt-[10vh] h-[120vh] xl:mt-0 xl:h-full", {
                    "opacity-1": globePhase === 0,
                    "opacity-0": globePhase > 0,
                  })}
                  videoMaterial="videos/stream-videos/wind_speed_global_10km/index.m3u8"
                  style={{ width: screenWidth }}
                  syncId="section-2"
                  fallbackElement={
                    <div className="flex h-[90vh] w-full items-end justify-center xl:mt-[10vh]">
                      <Image
                        src="/images/globe_video.png"
                        alt="Context lost"
                        className="h-[120vw] w-[120vw] object-cover xl:h-full xl:object-contain"
                        width={400}
                        height={400}
                      />
                    </div>
                  }
                />
                <div className="absolute inset-0 z-20 w-full">
                  <Resizable
                    className={cn("w-full", {
                      "border-r border-red-700/25": globePhase === 0,
                    })}
                    size={{ width: resizableWidth, height: "100%" }}
                    onResizeStop={(e, direction, ref, d) => {
                      setResizableWidth(resizableWidth + d.width);
                    }}
                    enable={{
                      right: globePhase === 0,
                    }}
                    maxWidth={screenWidth}
                    minWidth="1"
                    handleComponent={{
                      right: <ResizeButton />,
                    }}
                  >
                    <div className="h-full overflow-hidden">
                      {/* Low globe */}
                      <GlobeMap
                        className={cn(
                          "mt-[10vh] h-[120vh] transform transition-all duration-500 xl:mt-0 xl:h-full",
                          step === STEPS[2] && "h-[80vh] xl:h-full",
                        )}
                        style={{ width: screenWidth }}
                        hasMarkers={globePhase > 1}
                        rotate={globePhase === 1}
                        videoMaterial={
                          // 100km is not compressed to keep the lofi look
                          globePhase === 0
                            ? "videos/wind_speed_global_100km.mp4"
                            : globePhase === 1
                              ? "videos/stream-videos/wind_speed_global_10km/index.m3u8"
                              : undefined
                        }
                        syncId="section-2"
                        fallbackElement={
                          <div className="flex h-[90vh] w-full items-end justify-center xl:mt-[10vh]">
                            <Image
                              src={
                                globePhase === 0
                                  ? "/images/globe_video_lq.png"
                                  : globePhase === 1
                                    ? "/images/globe_video.png"
                                    : "/images/globe-line.png"
                              }
                              alt="Context lost"
                              className={cn(
                                "h-[120vw] w-[120vw] object-cover xl:h-full xl:object-contain",
                                step === STEPS[2] && "h-full w-full object-contain px-4",
                              )}
                              width={400}
                              height={400}
                            />
                            {step === STEPS[2] && <FallbackPopups />}
                          </div>
                        }
                      />
                    </div>
                  </Resizable>
                </div>
              </div>
              <AnimatePresence>
                {globePhase < 2 && (
                  <motion.div
                    key="section-2-content"
                    className={cn(
                      "absolute z-20 flex h-full w-full flex-col items-center justify-center",
                      { "pointer-events-none": globePhase !== 1 },
                    )}
                  >
                    {globePhase === 0 && (
                      <motion.div
                        key="section-2-phase-1-content"
                        initial={{ opacity: 0, y: isMobile ? 0 : "100%" }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          transition: {
                            ease: "linear",
                          },
                        }}
                        className="pointer-events-none flex h-full w-full items-center justify-center text-center"
                      >
                        <div>
                          <h2 className="text-base font-bold uppercase tracking-tight text-green-950 xl:text-lg xl:font-normal">
                            UNLOCKING CLIMATE POTENTIAL
                          </h2>
                          <div className="max-w-[90vw] text-2xl font-bold text-green-950 xl:max-w-[720px] xl:text-4xl xl:font-normal">
                            High-quality information <br />
                            from global to local scale
                          </div>
                        </div>
                      </motion.div>
                    )}
                    {globePhase === 1 && (
                      <Phase2Content
                        {...{
                          isMobile,
                          globePhase,
                          mobileGlobeTextIndex,
                        }}
                      />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </VideoSyncProvider>
          </div>
        </div>
        <ScrollStep
          id={STEPS[0]}
          className="hidden h-[100vh] xl:block"
          offset={0.5}
          onEnter={setStep}
        />
        <ScrollStep
          id={STEPS[1]}
          className="hidden h-[100vh] xl:block"
          offset={0.5}
          onEnter={setStep}
        />
        <ScrollStep
          id={STEPS[2]}
          className="hidden h-[110vh] xl:block xl:h-[150vh]"
          offset={0.5}
          onEnter={setStep}
        />
      </div>
    </section>
  );
}
