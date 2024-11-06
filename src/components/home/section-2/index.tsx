'use client';

import { useRef, useEffect, useState, useMemo, forwardRef } from 'react';
import dynamic from 'next/dynamic';
const Lines = dynamic(() => import('@/components/lines'), { ssr: false });
import GlobeMap from "@/components/globe-map";
import { Resizable } from 're-resizable';
import { Button } from "@/components/button";
import CaretRight from '@/svgs/caret-right.svg';
import { cn } from "@/lib/utils";
import { useScroll, motion, useMotionValueEvent, useInView, AnimatePresence } from "framer-motion";
import { useScreenWidthWithResize } from '@/lib/hooks';
import { scrollToSection } from "@/lib/utils";
import { useIsMobile } from '@/lib/hooks';
import InfoPopover from '../../info-popover';
import ArrowRight from '@/svgs/arrow-right.svg';
import { useGesture } from "@use-gesture/react";

const ResizeButton = () => (
  <>
    <Button
      className={cn(
        "absolute z-10 top-[85%] -left-[130px] xl:-left-[180px] py-[14px] px-[18px] bg-green-950 text-white font-semibold border-0"
      )}
    >
      <div className="text-center text-2xs xl:text-sm uppercase">low resolution</div>
      <CaretRight className="h-4 w-4 rotate-180" />
      <div className='bg-green-800/10 w-px h-6'></div>
      <CaretRight className="h-4 w-4" />
      <div className="text-center text-2xs xl:text-sm uppercase">high resolution</div>
    </Button>
  </>
);

const SECTION_STARTS = [0.1, 0.2, 0.6];

export default function Section2() {
  const scrollSectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollSectionRef,
  });
  const isMobile = useIsMobile();

  const [initial, setInitial] = useState(true);
  const [globePhase, setGlobePhase] = useState(0);

  const screenWidth = useScreenWidthWithResize();
  const [resizableWidth, setResizableWidth] = useState(screenWidth ? screenWidth / 2 : 800);
  const isInView = useInView(scrollSectionRef);

  // If section 2 is in view change scroll-snap-type to y mandatory. And change it back when its not in view
  useEffect(() => {
    const scrollParent = document.body;
    if (scrollParent) {
      const handleScroll = () => {
        if (isInView) {
          scrollParent.classList.add('snap-y', 'snap-mandatory');
        } else {
          scrollParent.classList?.remove('snap-y', 'snap-mandatory');
        }
      };

      handleScroll();
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isInView]);


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

  const [mobileGlobeTextIndex, setMobileGlobeTextIndex] = useState(0);

  const bind = useGesture({
    onDragEnd: ({ direction: [dx] }) => {
      if (dx > 0) {
        setMobileGlobeTextIndex(1);
      } else if (dx < 0) {
        setMobileGlobeTextIndex(0);
      }
    }
  });

  const Phase2Content = forwardRef<HTMLDivElement, any>((props, ref) => {
    const { isMobile, bind, setMobileGlobeTextIndex, mobileGlobeTextIndex } = props;

    return (
      <motion.div
        key="section-2-phase-2-content"
        className="w-[90vw] xl:w-[517px] flex items-center justify-center text-green-950 leading-relaxed bg-white/30 backdrop-blur-lg p-6"
        ref={ref}
        initial={{ opacity: 0, y: '100%' }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            ease: 'linear',
          }
        }}
        {...bind()}
      >
        <div className='flex flex-col gap-2 xl:gap-6'>
          {isMobile && <div className="absolute right-0 -top-8 items-center gap-0.5 flex">
            <button
              onClick={() => setMobileGlobeTextIndex(0)}
              type="button"
              title="Previous text"
            >
              <div className='sr-only'>Previous text</div>
              <ArrowRight className={cn("w-6 h-6 p-[2px] -rotate-180 text-green-950",
                {
                  'opacity-50': mobileGlobeTextIndex === 0
                }
              )} />
            </button>
            <button onClick={() => setMobileGlobeTextIndex(1)}
              type="button"
              title="Next text"
            >
              <div className='sr-only'>Next text</div>
              <ArrowRight className={cn("w-6 h-6 p-[2px] text-green-950",
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
        </div>
      </motion.div>
    );
  });

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
                  "border-red-700/25 border-r": globePhase === 0,
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
                      globePhase === 0 ? "videos/wind_speed_global_100km.webm" : (globePhase === 1 ? "videos/wind_speed_global_10km.webm" : undefined)
                    }
                    globePhase={globePhase}
                  />
                </div>
              </Resizable>
            </div>
          </div>
          <AnimatePresence>
            {globePhase < 2 && <motion.div
              key="section-2-content"
              className={cn('absolute w-full h-full z-30 flex flex-col items-center justify-center',
                { 'pointer-events-none': globePhase !== 1 }
              )}
            >
              {globePhase === 0 &&
                <motion.div
                  key="section-2-phase-1-content"
                  initial={{ opacity: 0, y: '100%' }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      ease: 'linear',
                    }
                  }}
                  className='w-full h-full text-center flex items-center justify-center pointer-events-none'>
                  <div>
                    <div className="text-green-950 text-base xl:text-lg uppercase tracking-tight font-bold xl:font-normal">UNLOCKING CLIMATE POTENTIAL</div>
                    <div className="text-green-950 text-2xl xl:text-4xl max-w-[90vw] xl:max-w-[720px] font-bold xl:font-normal">
                      High-quality information <br />from global to local scale
                    </div>
                  </div>
                </motion.div>}
              {globePhase === 1 &&
                <Phase2Content {...{ isMobile, globePhase, bind, setMobileGlobeTextIndex, mobileGlobeTextIndex }} />}
            </motion.div>}
          </AnimatePresence>
        </div>
        {/* Empty divs for the snap scroll */}
        <div className='h-[100vh] snap-center' id="globe-phase-2"></div>
        <div className='h-[100vh] snap-center' id="globe-phase-3"></div>
      </div >
    </section >
  );
};
