'use client';
import { useRef, useEffect, useState } from 'react';
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
export default function Section2() {
  const scrollSectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollSectionRef,
  });
  const [globePhase, setGlobePhase] = useState(0);
  const [resizableWidth, setResizableWidth] = useState(400);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.33 && globePhase !== 0) {
      setGlobePhase(0);
      setResizableWidth(400);
    }
    if (latest >= 0.33 && latest < 0.66 && globePhase !== 1) {
      setGlobePhase(1);
      setResizableWidth(800);
    }
    if (latest >= 0.66 && globePhase !== 2) {
      setGlobePhase(2);
    }
  })

  const titleX = useTransform(scrollYProgress, [0, 0.33], [0, -200]);
  const titleY = useTransform(scrollYProgress, [0, 0.33], [0, -200]);
  const descriptionY = useTransform(scrollYProgress, [0.2, 0.33, 0.6, 0.7], [500, 0, 0, -1000]);

  return (
    <section className="relative bg-green-700">
      <div className='relative pointer-events-none'>
        <Lines verticalClassName="left-8" sectionName="section-1" columns={[100]} rows={[100]} colorClass="bg-blue-900/20" />
      </div>
      <div className="relative h-[600vh]" ref={scrollSectionRef}>
        <div className='h-screen flex justify-center sticky inset-0'>
          <div className='relative'>
            {/* High globe */}
            <GlobeMap className='w-[800px] h-full' videoMaterial="videos/wind_speed_global_100km.mp4" />
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
                maxWidth="800px"
                minWidth="1"
                handleComponent={{
                  right: <ResizeButton />,
                }}
              >
                <div className='relative w-full h-full overflow-hidden'>
                  {/* Low globe */}
                  <GlobeMap className='transform h-full w-[800px]' videoMaterial="videos/wind_speed_global_10km.mp4" hasMarkers={globePhase > 1} rotate={globePhase === 1} />
                </div>
              </Resizable>
            </div>
          </div>
          <motion.div className='absolute w-full h-full z-30 flex flex-col items-center top-[40%] transition-opacity duration-500 pointer-events-none'
            style={{
              opacity: globePhase > 1 ? 0 : 1,
            }}
          >
            <div>
              <motion.div style={{
                x: titleX,
                y: titleY,
              }}>
                <div className="text-center text-light-green text-lg uppercase tracking-tight">UNLOCKING CLIMATE POTENTIAL</div>
                <div className="text-center text-light-green text-4xl max-w-[720px]">
                  High-quality information from global to local scale
                </div>
                <motion.div
                  className="text-light-green leading-relaxed w-[500px] flex flex-col gap-6"
                  style={{ y: descriptionY, x: 700 }}
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
      </div >
    </section >);
};