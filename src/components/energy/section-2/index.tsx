'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import ScrollStep from "@/components/scroll-step";
import GlobeMap from '@/components/globe-map';
import { useRecoilState } from "recoil";
import { globePhaseAtom } from "@/store";

const transition = { duration: 0.2, ease: 'linear' };

export default function Section2() {
  const scrollSectionRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState('section-2-step-1');
  const [globePhase, setGlobePhase] = useRecoilState(globePhaseAtom);

  useEffect(() => {
    if (globePhase !== 1 && step === 'section-2-step-2') {
      setGlobePhase(1);
    }
    if (globePhase !== 0 && step !== 'section-2-step-2') {
      setGlobePhase(0);
    }
  }, [step, globePhase, setGlobePhase]);

  return (
    <section className="relative bg-green-200 text-green-700" id="section-2">
      <div className="relative xl:container h-[200vh] xl:h-[300vh]" ref={scrollSectionRef} id="section-2-scroll-parent">
        <ScrollStep id="step-1" className='relative h-[10vh] xl:h-[100vh]' offset={0.5} onEnter={setStep} />
        <div className='sticky h-[100vh] w-full flex flex-col-reverse xl:flex-row justify-center items-center inset-0 xl:gap-[94px]' id="section-2-step-1">
          <div
            key="section-2-title-1"
            className="w-full h-[50vh] xl:h-full xl:w-1/2 flex items-center justify-center max-h-[936px]">
            <GlobeMap
              className="h-full w-full"
              videoMaterial={step === 'section-2-step-2' ? "videos/stream-videos/capacity_factor_10km/index.m3u8" : "videos/stream-videos/wind_speed_global_10km/index.m3u8"}
              rotate={step !== 'section-2-step-2'}
            />
          </div>
          <div className="w-full max-xl:max-h-[60vh] xl:h-full xl:w-1/2 flex flex-col xl:justify-center max-xl:container max-xl:pt-10">
            <AnimatePresence>
              {step !== 'section-2-step-2' ? <motion.div
                key="section-2-description-1"
                initial={{ opacity: 0, translateY: '200px' }}
                animate={{ opacity: 1, translateY: 0, transition }}
                className='space-y-3 xl:space-y-6 max-w-[480px]'
              >
                <div className='text-xl xl:2xl'>
                  Digital twins are revolutionising the way to approach wind farm development and energy management.
                </div>
                <p className='text-sm leading-tight'>
                  By allowing users to perform simulations that replicate real-world conditions, digital twins can help energy practitioners to map the wind potential of different regions, optimise the location of wind turbines, and predict energy generation.
                </p>
                <p className='text-sm leading-tight'>
                  The energy output of a wind turbine depends on a variety of factors, the most important being the wind speed at the height at which the turbines are placed. Current state-of-the-art models only provide wind information at 10 metres, whereas wind turbines are normally placed at around 100 metres height, and this requires an interpolation to convert wind speed from 10 to 100 metres.
                </p>
              </motion.div> : <motion.div
                key="section-2-description-2"
                initial={{ opacity: 0, translateY: '200px' }}
                animate={{ opacity: 1, translateY: 0, transition }}
                className='space-y-4 xl:space-y-6 max-w-[480px]'
              >
                <p className='text-sm leading-tight'>
                  A wind turbine has a specific power curve that is provided by the manufacturer and depends on several factors (e.g. rotor diameter, rated wind speed, etc.). The measure of how much energy a turbine produces compared to its maximum theoretical output, over a certain period of time, is what is called capacity factor. This is a more meaningful variable to the energy industry than wind speed or energy density. Therefore, it is crucial for energy companies to get access to information about the capacity factor to be able to assess energy supply and meet the demand.
                </p>
                <p className='text-sm leading-tight'>
                  Classic energy models require full time series to generate histograms of the capacity factor, which makes using the outputs of the digital twin challenging. However, a streaming setup allows histograms to be built on the fly. This functionality greatly facilitates the interactivity between the results from the climate models with impact model applications, such as applications used by the energy sector.
                </p>
              </motion.div>}
            </AnimatePresence>
          </div>
        </div>
        <ScrollStep id="section-2-step-2" className='h-[100vh] xl:h-[200vh]' offset={0.5} onEnter={setStep} />
      </div >
    </section >
  );
};
