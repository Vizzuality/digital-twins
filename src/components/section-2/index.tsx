'use client';
import { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import Lines from "@/components/lines";
import GlobeMap from "@/components/globe-map";
import { Resizable } from 're-resizable';
import { Button } from "@/components/button";
import CaretRight from '@/svgs/caret-right.svg';
import { cn } from "@/lib/utils";
import { useScroll, useTransform, motion, useMotionValueEvent } from "framer-motion";

const ResizeButton = () => (
  <>
    <Button
      className={cn(
        "absolute z-10 top-2/3 -left-[180px] py-[14px] px-[18px] bg-light-green text-green-700 border-0"
      )}
    >
      <div className="text-center text-green-700 uppercase">low resolution</div>
      <CaretRight className="h-4 w-4 rotate-180" />
      <div className='bg-green-800/10 w-px h-6'></div>
      <CaretRight className="h-4 w-4" />
      <div className="text-center text-green-700 uppercase">high resolution</div>
    </Button>
  </>
);

const useScreenWidthWithResize = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const handleResize = useCallback(() => {
    setWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
}

export default function Section2() {
  const scrollSectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollSectionRef,
  });
  const [globePhase, setGlobePhase] = useState(0);
  const [resizableWidth, setResizableWidth] = useState(400);

  const screenWidth = useScreenWidthWithResize();
  const scrollToSection = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      const rect = element.getBoundingClientRect();

      window.scrollTo({
        top: rect.top + window.scrollY,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    scrollToSection(`globe-phase-${globePhase + 1}`);
  }, [globePhase]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 0 && latest < 0.1 && globePhase !== 0) {
      setGlobePhase(0);
      setResizableWidth(screenWidth / 2);
    }

    if (latest >= 0.1 && latest < 0.66 && globePhase !== 1) {
      setGlobePhase(1);
      setResizableWidth(screenWidth);
    }

    if (latest >= 0.66 && globePhase < 2) {
      setGlobePhase(2);
    }
  });

  const descriptionRef = useRef<HTMLDivElement>(null);

  const descriptionLeft = useMemo(() => {
    if (descriptionRef.current) {
      return descriptionRef.current.getBoundingClientRect().left;
    }
    return 0;
  }, [descriptionRef.current, screenWidth]);


  const titleX = useTransform(scrollYProgress, [0.2, 0.33], [0, -200]);
  const titleY = useTransform(scrollYProgress, [0.2, 0.33], [0, -204]);
  const descriptionY = useTransform(scrollYProgress, [0.2, 0.33, 0.6, 0.7], [500, -4, -4, -1000]);

  const opacityLine = useTransform(scrollYProgress, [0.2, 0.33, 0.6, 0.7], [0, 1, 1, 0]);
  const lineY = useTransform(scrollYProgress, [0.2, 0.33, 0.6, 0.7], [500, -40, -40, -1000]);
  const lineX = useTransform(scrollYProgress, [0.2, 0.33, 0.6, 0.7], [resizableWidth, descriptionLeft, descriptionLeft, descriptionLeft]);


  return (
    <section className="relative bg-green-700">
      <div className='relative pointer-events-none'>
        <Lines verticalClassName="left-8" sectionName="section-1" columns={[100]} rows={[100]} colorClass="bg-blue-900/10" />
      </div>

      <div className="relative h-[300vh] snap-y snap-mandatory" ref={scrollSectionRef}>
        <div className='h-screen flex justify-center sticky inset-0 snap-start snap-always' id="globe-phase-1">
          <div className='relative'>
            {/* High globe */}
            <GlobeMap
              className='h-full'
              style={{ width: screenWidth }}
              videoMaterial="videos/wind_speed_global_100km.mp4"
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
                <div className='relative w-full h-full overflow-hidden'>
                  {/* Low globe */}
                  <GlobeMap
                    className='transform h-full'
                    style={{ width: screenWidth }}
                    videoMaterial="videos/wind_speed_global_10km.mp4"
                    hasMarkers={globePhase > 1}
                    rotate={globePhase === 1}
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
          <motion.div className='absolute w-full h-full z-30 flex flex-col items-center top-[40%] transition-opacity duration-500 pointer-events-none'
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
                <div className='translate-y-3'>
                  <div className="text-center text-light-green text-lg uppercase tracking-tight">UNLOCKING CLIMATE POTENTIAL</div>
                  <div className="text-center text-light-green text-4xl max-w-[720px]">
                    High-quality information from global to local scale
                  </div>
                </div>
                <motion.div
                  className="text-light-green leading-relaxed w-[500px] flex flex-col gap-6"
                  style={{ y: descriptionY, x: 710 }}
                  ref={descriptionRef}
                >
                  <p>
                    At the resolutions that global climate models use today, a number of small-scale processes that are important for the simulation of extreme events and the evolution of the climate system, are not directly represented. Increasing the model resolution (i.e. reducing the size of grid cells used in climate models both horizontally and vertically) allows researchers to represent these processes more directly.
                  </p>
                  <p>
                    The climate adaptation digital twin provides high-quality information at scales that matter to society, based on better simulations performed with more realistic Earth-system models and a better integration of observations and simulations. This unprecedented level of detail, towards the km-scale, allows users to study localised impacts and devise more targeted solutions for climate adaptation and mitigation.
                  </p>
                  <p>
                    An evaluation of the simulations and a quantification of uncertainties is regularly done to ensure the quality and transparency of the information provided by the digital twin.
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
        {/* Empty divs for the snap scroll */}
        <div className='h-[100vh] snap-start snap-always' id="globe-phase-2"></div>
        <div className='h-[100vh] snap-start snap-always' id="globe-phase-3"></div>
      </div >
    </section >
  );
};
