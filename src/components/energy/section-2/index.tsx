'use client';

import { useRef, useState } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import ScrollStep from "@/components/scroll-step";

const transition = { duration: 0.2, ease: 'linear' };

export default function Section2() {
  const scrollSectionRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState('section-2-step-2');

  return (
    <section className="relative bg-green-200 text-green-700" id="section-2">
      <div className="relative container h-[300vh]" ref={scrollSectionRef} id="section-2-scroll-parent">
        <ScrollStep id="step-1" className='relative h-[10vh]' offset={0} onEnter={setStep} />
        <div className='sticky h-[90vh] w-full flex flex-col-reverse xl:flex-row justify-center inset-0 gap-[94px]' id="section-2-step-1">
          <div
            key="section-2-title-1"
            className="w-full xl:w-1/2 flex items-center justify-center">
            <h3 className="text-base xl:text-lg uppercase tracking-tight">Globe Video</h3>
          </div>
          <div className="w-full xl:w-1/2 flex flex-col justify-center">
            <AnimatePresence>
              {step !== 'section-2-step-2' ? <motion.div
                key="section-2-description-1"
                initial={{ opacity: 0, translateY: '200px' }}
                animate={{ opacity: 1, translateY: 0, transition }}
                exit={{ opacity: 0, translateY: '-200px' }}
                className='space-y-6 max-w-[480px]'
              >
                <div className='text-[32px]'>
                  Digital twins are revolutionising the way to approach wind farm development and energy management.
                </div>
                <p>
                  By allowing users to perform simulations that replicate real-world conditions, digital twins can help energy practitioners to map the wind potential of different regions, optimise the location of wind turbines, and predict energy generation.
                </p>
                <p>
                  The energy output of a wind turbine depends on a variety of factors, the most important being the wind speed at the height at which the turbines are placed. Current state-of-the-art models only provide wind information at 10 metres, whereas wind turbines are normally placed at around 100 metres height, and this requires an interpolation to convert wind speed from 10 to 100 metres.
                </p>
              </motion.div> : <motion.div
                key="section-2-description-2"
                initial={{ opacity: 0, translateY: '200px' }}
                animate={{ opacity: 1, translateY: 0, transition }}
                exit={{ opacity: 0, translateY: '-200px' }}
                className='space-y-6 max-w-[480px]'
              >
                <p>
                  A wind turbine has a specific power curve that is provided by the manufacturer and depends on several factors (e.g. rotor diameter, rated wind speed, etc.). The measure of how much energy a turbine produces compared to its maximum theoretical output, over a certain period of time, is what is called capacity factor. This is a more meaningful variable to the energy industry than wind speed or energy density. Therefore, it is crucial for energy companies to get access to information about the capacity factor to be able to assess energy supply and meet the demand.
                </p>
                <p>
                  Classic energy models require full time series to generate histograms of the capacity factor, which makes using the outputs of the digital twin challenging. However, a streaming setup allows histograms to be built on the fly. This functionality greatly facilitates the interactivity between the results from the climate models with impact model applications, such as applications used by the energy sector.
                </p>
              </motion.div>}
            </AnimatePresence>
          </div>
        </div>
        <ScrollStep id="section-2-step-2" className='h-[100vh]' offset={0.5} onEnter={setStep} />
      </div >
    </section >
  );
};