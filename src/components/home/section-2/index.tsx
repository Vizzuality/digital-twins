'use client';

import { useRef, useEffect, useState, useMemo } from 'react';
import Lines from "@/components/lines";
import GlobeMap from "@/components/globe-map";
import { Resizable } from 're-resizable';
import { Button } from "@/components/button";
import CaretRight from '@/svgs/caret-right.svg';
import { cn } from "@/lib/utils";
import { useScroll, useTransform, motion, useMotionValueEvent, useInView, AnimatePresence } from "framer-motion";
import { useScreenWidthWithResize } from '@/lib/hooks';
import { scrollToSection } from "@/lib/utils";
import { useIsMobile } from '@/lib/hooks';
import InfoPopover from '../../info-popover';
import ArrowRight from '@/svgs/arrow-right.svg';

const ResizeButton = () => (
  <>
    <Button
      className={cn(
        "absolute z-10 top-2/3 -left-[130px] xl:-left-[180px] py-[14px] px-[18px] bg-light-green text-green-700 border-0"
      )}
    >
      <div className="text-center text-2xs xl:text-sm text-green-700 uppercase">low resolution</div>
      <CaretRight className="h-4 w-4 rotate-180" />
      <div className='bg-green-800/10 w-px h-6'></div>
      <CaretRight className="h-4 w-4" />
      <div className="text-center text-2xs xl:text-sm text-green-700 uppercase">high resolution</div>
    </Button>
  </>
);

const SECTION_STARTS = [0.1, 0.2, 0.6];

export default function Section2() {
  const scrollSectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollSectionRef,
  });
  const [initial, setInitial] = useState(true);
  const [globePhase, setGlobePhase] = useState(0);

  const screenWidth = useScreenWidthWithResize();
  const [resizableWidth, setResizableWidth] = useState(screenWidth ? screenWidth / 2 : 800);
  const isInView = useInView(scrollSectionRef);

  useEffect(() => {
    if (globePhase && isInView) {
      if (initial) {
        setInitial(false);
        scrollToSection(`section-2-scroll-parent`);
      } else {
        scrollToSection(`globe-phase-${globePhase + 1}`);
      }
    }
  }, [globePhase, isInView]);


  useEffect(() => {
    if (screenWidth || resizableWidth === 0) {
      setResizableWidth(screenWidth / 2);
    }
  }
    , [screenWidth]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= SECTION_STARTS[0] && latest < SECTION_STARTS[1] && globePhase !== 0) {
      setGlobePhase(0);
      setResizableWidth(screenWidth / 2);
    }

    if (latest >= SECTION_STARTS[1] && latest < SECTION_STARTS[2] && globePhase !== 1) {
      setGlobePhase(1);
      setResizableWidth(screenWidth);
    }

    if (latest >= SECTION_STARTS[2] && globePhase < 2) {
      setGlobePhase(2);
    }
  });

  const descriptionRef = useRef<HTMLDivElement>(null);

  const descriptionLeft = useMemo(() => {
    if (descriptionRef.current) {
      return descriptionRef.current.getBoundingClientRect().left - 35;
    }
    return 0;
  }, [descriptionRef.current, screenWidth]);

  const isMobile = useIsMobile();
  const titleX = useTransform(scrollYProgress, [SECTION_STARTS[1], SECTION_STARTS[1] + 0.13], [0, isMobile ? 0 : -200]);
  const titleY = useTransform(scrollYProgress, [SECTION_STARTS[1], SECTION_STARTS[1] + 0.13], [0, isMobile ? -180 : -204]);
  const descriptionY = useTransform(scrollYProgress, [SECTION_STARTS[1], SECTION_STARTS[1] + 0.13, SECTION_STARTS[2], SECTION_STARTS[2] + 0.13], [1000, isMobile ? -120 : -210, isMobile ? -120 : -210, -1000]);

  const opacityLine = useTransform(scrollYProgress, [SECTION_STARTS[1], SECTION_STARTS[1] + 0.13, SECTION_STARTS[2], SECTION_STARTS[2] + 0.13], [0, 1, 1, 0]);
  const lineY = useTransform(scrollYProgress, [SECTION_STARTS[1], SECTION_STARTS[1] + 0.13, SECTION_STARTS[2], SECTION_STARTS[2] + 0.13], [500, -40, -40, -1000]);
  const lineX = useTransform(scrollYProgress, [SECTION_STARTS[1], SECTION_STARTS[1] + 0.13, SECTION_STARTS[2], SECTION_STARTS[2] + 0.13], [resizableWidth, descriptionLeft, descriptionLeft, descriptionLeft]);

  const [mobileGlobeTextIndex, setMobileGlobeTextIndex] = useState(0);
  return (
    <section className="relative bg-green-800" id="section-2">
      <div className='relative pointer-events-none'>
        <Lines verticalClassName="left-8" sectionName="section-2" columns={[100]} rows={[100]} colorClass="bg-blue-900/10" />
      </div>
      <div className="relative h-[300vh]" ref={scrollSectionRef} id="section-2-scroll-parent">
        <div className='h-[100vh] flex justify-center sticky inset-0' id="globe-phase-1">
          <div className='relative h-[100vh] w-full overflow-hidden' id='high-globe-container'>
            {/* High globe */}
            <GlobeMap
              className={cn('h-full', {
                'opacity-1': globePhase === 0,
                'opacity-0': globePhase > 0,
              })}
              videoMaterial="videos/wind_speed_global_10km.webm"
              style={{ width: screenWidth }}
              globePhase={globePhase}
            />
            <div className="absolute inset-0 w-full z-30">
              <Resizable
                className={cn("w-full", {
                  "border-light-green/30 border-r": globePhase === 0,
                })}
                size={{ width: resizableWidth, height: '100%' }}
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
                <div className='h-full overflow-hidden'>
                  {/* Low globe */}
                  <GlobeMap
                    className='transform h-full'
                    style={{ width: screenWidth }}
                    hasMarkers={globePhase > 1}
                    rotate={globePhase === 1}
                    videoMaterial={
                      globePhase === 0 ? "videos/wind_speed_global_100km.mp4" : (globePhase === 1 ? "videos/wind_speed_global_10km.webm" : undefined)
                    }
                    globePhase={globePhase}
                  />
                </div>
              </Resizable>
            </div>
          </div>
          {/* Vertical description line */}
          <motion.div
            className='absolute left-0 top-0 w-px h-full bg-light-green/30 z-30'
            style={{ x: lineX, opacity: opacityLine }}
          />
          <motion.div className={cn('absolute w-full h-full z-30 flex flex-col items-center top-[40%] transition-opacity duration-500',
            { 'pointer-events-none': globePhase !== 1 }
          )}
            style={{
              opacity: globePhase > 1 ? 0 : 1,
            }}
          >
            {/* Horizontal description line */}
            <motion.div
              className='absolute left-0 top-0 h-px w-full bg-light-green/30'
              style={{ y: lineY, opacity: opacityLine }}
            />
            <div>
              <motion.div style={{
                x: titleX,
                y: titleY,
              }}>
                <motion.div className={cn('translate-y-3 transition-all duration-500 text-center',
                  {
                    'whitespace-nowrap': !isMobile || globePhase > 0,
                  }
                )}
                  initial={{ width: '100%' }}
                  animate={{ width: globePhase === 1 ? 0 : '100%' }}
                  transition={{ duration: 0.1, ease: 'linear' }}
                >
                  <div className="text-light-green text-base xl:text-lg uppercase tracking-tight">UNLOCKING CLIMATE POTENTIAL</div>
                  <div className="text-light-green text-xl xl:text-4xl max-w-[90vw] xl:max-w-[720px]">
                    High-quality information <br />from global to local scale
                  </div>
                </motion.div>
              </motion.div>
              <motion.div
                className={cn("text-light-green leading-relaxed max-w-[500px] w-[80vw] xl:w-[500px] flex flex-col gap-2 xl:gap-6 transition-opacity",
                  {
                    'hidden opacity-0': globePhase !== 1,
                    'opacity-100': globePhase === 1
                  }
                )}
                style={{ y: descriptionY, x: isMobile ? 0 : 495 }}
                ref={descriptionRef}
              >
                {isMobile && <div className="absolute right-0 -top-8 items-center gap-0.5 flex">
                  <button onClick={() => setMobileGlobeTextIndex(0)}>
                    <div className='sr-only'>Previous text</div>
                    <ArrowRight className={cn("w-6 h-6 p-[2px] -rotate-180 text-light-green",
                      {
                        'opacity-50': mobileGlobeTextIndex === 0
                      }
                    )} />
                  </button>
                  <button onClick={() => setMobileGlobeTextIndex(1)}>
                    <div className='sr-only'>Next text</div>
                    <ArrowRight className={cn("w-6 h-6 p-[2px] text-light-green",
                      {
                        'opacity-50': mobileGlobeTextIndex === 1
                      }
                    )} />
                  </button>
                </div>}
                <AnimatePresence>
                  {(!isMobile || (mobileGlobeTextIndex === 0)) && <motion.div className='flex flex-col gap-2 xl:gap-6'>
                    <p>
                      At the <InfoPopover
                        variant="dark"
                        content={<>The resolution of a model refers to the size of each grid box. When increasing the resolution, the grid boxes become smaller, allowing for more detailed calculations and the model output to be more relevant to users (source: <a target="_blank" rel="noreferrer noopener" href="https://www.ecmwf.int/">ECMWF</a>)</>}>
                        resolutions</InfoPopover> that global climate models use today, a number of small-scale processes that are important for the simulation of extreme events and the evolution of the climate system, are not directly represented. Increasing the model resolution (i.e. reducing the size of grid cells used in climate models both horizontally and vertically) allows researchers to represent these processes more directly.
                    </p>
                  </motion.div>}
                  {(!isMobile || (mobileGlobeTextIndex === 1)) && <motion.div className='flex flex-col gap-2 xl:gap-6'>
                    <p>
                      The climate adaptation digital twin provides high-quality information at scales that matter to society, based on better simulations performed with more realistic Earth-system models and a better integration of observations and simulations. This unprecedented level of detail, towards the km-scale, allows users to study localised impacts and devise more targeted solutions for climate adaptation and mitigation.
                    </p>
                    <p>
                      An evaluation of the simulations and a quantification of uncertainties is regularly done to ensure the quality and transparency of the information provided by the digital twin.
                    </p>
                  </motion.div>}
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.div>
        </div>
        {/* Empty divs for the snap scroll */}
        <div className='h-[100vh]' id="globe-phase-2"></div>
        <div className='h-[100vh]' id="globe-phase-3"></div>
      </div >
    </section >
  );
};
