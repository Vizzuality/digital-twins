'use client';

import { useRef, useState } from 'react';
import { AnimatePresence, motion, Variants } from "framer-motion";
import ScrollStep from "@/components/scroll-step";
import Image from "next/image";
import Chart from "@/svgs/chart.svg";
import { useIsMobile } from "@/lib/hooks";

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
const transition = { duration: 0.5, ease: 'linear' };
export default function Section4() {
  const scrollSectionRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState('step1');
  const isMobile = useIsMobile();

  const variants: Record<string, Variants> = {
    'step-1': {
      animate: { opacity: 1, textAlign: 'center', transition, width: '100%' },
    },
    'step-2': {
      animate: {
        opacity: 1, width: 0, left: isMobile ? '32px' : '10%', textAlign: 'left', top: '10%', whiteSpace: 'nowrap', transition: { ...transition, left: { duration: 0.1 } }
      },
    },
    'step-3': {
      animate: { opacity: 1, width: 0, left: isMobile ? '32px' : '10%', textAlign: 'left', top: '10%', whiteSpace: 'nowrap', transition },
    }
  };

  const variantsDescription: Record<string, Variants> = {
    'step-2': {
      initial: { top: '100%', opacity: 0 },
      animate: { top: '30%', opacity: 1, transition },
      exit: { top: 0, opacity: 0 },
    },
    'step-3': {
      initial: { top: '100%', opacity: 0 },
      animate: { top: isMobile ? '10%' : '30%', opacity: 1, transition },
    }
  };

  const legend = <div className="h-8 w-full py-1 flex-col gap-1 inline-flex text-2xs">
    <div className="self-stretch justify-between items-start inline-flex">
      <div>LOW (XXº)</div>
      <div>HIGH (XXº)</div>
    </div>
    <Image alt="legend" src="/images/home-legend-3.svg" className="w-full" width={378} height={100} />
  </div>;

  const renderChart = <div className="relative">
    <Chart className="max-w-[100%] xl:max-w-[47%]" />
    <motion.svg
      width="708"
      height="305"
      viewBox="0 0 708 305"
      className="absolute top-0 left-0 max-w-[100%] xl:max-w-[47%]"
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
        stroke="white"
        strokeWidth="3"
        fill="none"
        d="M87 242.623C87.4362 246.683 88.7013 255.292 90.2718 257.241C92.2349 259.678 95.5066 262.114 97.4697 262.462C99.0402 262.741 100.742 262.578 101.396 262.462C102.923 214.197 108.07 116.693 116.446 112.795C117.537 110.939 120.11 110.359 121.681 122.889C123.251 135.419 125.825 175.214 126.916 193.546C129.315 213.734 135.161 254.944 139.349 258.286C143.536 261.627 147.637 262.462 149.164 262.462C150.036 262.578 151.781 262.254 151.781 260.026C151.781 257.241 159.634 137.508 164.869 133.679C169.056 130.616 170.976 132.403 171.412 133.679C175.774 174.634 185.023 256.893 187.117 258.286C189.734 260.026 196.278 261.07 198.241 262.81C200.204 264.551 201.513 263.855 201.513 261.07C201.513 258.286 208.71 134.027 213.291 120.801C217.871 107.574 223.106 117.32 223.761 120.801C224.415 124.281 233.576 250.976 239.465 254.109C244.177 256.615 247.536 257.937 248.626 258.286C249.499 257.821 251.244 254.875 251.244 246.799C251.244 236.706 257.133 106.182 260.405 95.044C263.677 83.906 266.294 76.5967 268.257 78.685C270.22 80.7734 273.492 92.6073 274.146 105.486C274.801 118.364 281.344 217.91 285.925 225.915C290.505 233.921 292.468 240.186 294.431 241.578C296.002 242.692 297.703 242.042 298.357 241.578C302.065 191.573 309.482 88.6394 309.482 76.9445C309.482 62.3259 314.062 58.8452 315.371 58.4972C316.679 58.1491 320.606 58.4972 320.606 62.3259C320.606 66.1546 328.458 180.319 330.421 184.496C332.384 188.673 336.965 191.805 336.965 195.982C336.965 200.159 338.273 226.612 340.891 230.788C343.508 234.965 344.817 238.445 345.471 240.534C346.126 242.623 348.089 239.838 348.089 238.098C348.089 236.357 353.323 102.005 355.287 87.0383C357.25 72.0715 361.83 47.3591 364.448 48.0552C367.065 48.7513 370.337 52.5799 370.337 60.5854C370.337 68.5908 372.954 117.668 374.917 121.844C376.88 126.021 378.189 137.507 379.498 141.336C380.545 144.399 384.733 170.457 386.696 183.104C387.786 181.595 390.098 178.927 390.622 180.319C391.276 182.059 393.894 192.849 395.202 191.109C396.511 189.369 403.709 92.2591 403.055 83.2094C402.4 74.1598 409.598 31 412.87 31C416.142 31 416.142 35.5251 418.759 48.0552C421.377 60.5854 429.229 175.098 432.501 176.838C435.773 178.579 436.427 178.579 438.39 180.319C440.353 182.059 444.279 214.081 445.588 211.993C446.897 209.904 448.86 173.358 449.514 166.745C450.168 160.131 454.749 62.6737 458.675 57.1047C462.601 51.5357 468.49 50.4915 469.799 57.1047C470.846 62.3953 474.598 128.69 476.343 161.176L486.812 230.788L493.356 240.534C496.846 205.264 503.695 133.052 503.171 126.369C502.648 119.686 506.879 86.6901 509.061 71.0272C509.715 68.1267 511.547 62.3257 513.641 62.3257C516.258 62.3257 517.567 66.1544 517.567 67.1985C517.567 68.0339 522.802 119.988 525.419 145.861C527.601 167.325 531.963 210.6 531.963 211.993C531.963 213.385 534.144 222.783 535.235 227.308C535.671 232.412 536.936 243.04 538.507 244.711C540.47 246.799 545.05 247.843 545.705 244.711C546.228 242.205 550.285 195.17 552.248 171.965L558.792 91.911C558.792 89.0105 559.446 83.2094 562.063 83.2094C565.335 83.2094 568.607 90.1715 568.607 95.044C568.607 98.942 572.533 146.789 574.496 170.225L581.694 216.169L586.275 246.799C589.983 248.308 597.137 250.001 596.09 244.711C595.043 239.42 597.835 206.772 599.362 191.109L605.251 144.12L608.523 121.844C609.395 119.524 611.795 115.858 614.412 119.756C617.03 123.654 617.248 135.071 617.03 140.292L626.845 205.728L629.462 236.705C629.68 239.606 631.295 245.894 636.006 247.843C640.717 249.792 644.076 250.744 645.167 250.976L651.056 188.673L654.982 152.126L658.908 138.551C659.127 137.971 659.824 137.159 660.871 138.551C661.918 139.944 664.361 149.805 665.452 154.562L670.687 188.673L672.65 208.86L677.885 241.578"
      />
    </motion.svg>
  </div>;
  return (
    <section className="relative" id="section-4">
      <div className="relative h-[400vh]" ref={scrollSectionRef} id="section-2-scroll-parent">
        <div className='sticky h-[100vh] w-full flex justify-center inset-0' id="section-4-1">
          <video autoPlay loop muted playsInline className='h-[100vh] w-full object-fill'>
            <source src="/videos/phase-3/tooltip/tas_10km_square.mp4" type="video/mp4" />
          </video>
          <motion.div
            className='absolute left-0 top-[calc(50%_-_100px)] w-full h-full text-white flex flex-col gap-4'
            initial="initial"
            animate="animate"
            variants={variants[step]}
          >
            <AnimatePresence>
              {step !== 'step-3' && <motion.div
                key="section-4-title-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, translateY: '-200px' }}
                className="w-full flex flex-col">
                <h3 className="text-base xl:text-lg uppercase tracking-tight mx-auto">Exploring energy futures</h3>
                <div className="text-[36px] max-w-[80vw] xl:text-4xl xl:max-w-[720px] mx-auto">
                  Inside the 2018 heatwave<br /> on the Iberian Peninsula
                </div>
              </motion.div>}
            </AnimatePresence>
          </motion.div>
          <AnimatePresence>
            {/* Horizontal line */}
            {['step-2', 'step-3'].includes(step) && <>
              <motion.div
                key="section-4-horizontal-line"
                className="hidden xl:block absolute bg-white/30 h-px w-full"
                initial={{ opacity: 0, top: '100%' }}
                animate={{ opacity: 1, top: '30%', transition }}
                exit={{ opacity: 0, top: '100%' }}
              />
              {/* Vertical line */}
              <motion.div
                key="section-4-vertical-line"
                className="hidden xl:block absolute bg-white/30 w-px h-full top-0"
                initial={{ opacity: 0, left: '100%' }}
                animate={{ opacity: 1, left: '60%', transition }}
                exit={{ opacity: 0, left: '100%' }}
              />
            </>}
          </AnimatePresence>
          {step !== 'step-1' && <motion.div
            key="section-4-description-1"
            initial="initial"
            animate="animate"
            variants={variantsDescription[step]}
            className="absolute bottom-0 w-full text-white max-w-[459px] left-8 xl:left-[60%]"
          >
            <AnimatePresence>
              {step === 'step-2' && <motion.div
                key="section-4-description-2"
                className="absolute inset-0 w-full text-2xl"
                initial={{ opacity: 0, top: '200px' }}
                animate={{ opacity: 1, top: 0, transition }}
                exit={{ opacity: 0, top: '-200px' }}
              >
                Imagine using the digital twin to dissect a real-world event like the devastating 2018 European heatwave, which caused the warmest conditions in the Iberian Peninsula since 2003.
              </motion.div>}
              {step === 'step-3' && <div
                key="section-4-description-3">
                <motion.div className="absolute inset-0 w-full text-base max-w-[450px]"
                  initial={{ opacity: 0, top: '200px' }}
                  animate={{ opacity: 1, top: 0, transition }}
                  exit={{ opacity: 0, top: '-200px' }}
                >
                  <div className="xl:pb-14">

                    According to observations, it can be seen that during the first week of August 2018, temperatures reached 40°C in the southwestern part of the Iberian Peninsula due to a warm air intrusion that moved up from Africa. Two wildfires occurred in Spain during the heatwave, causing more than 4,500 burned hectares and thousands of people being evacuated. Some Spanish regions registered the highest number of deaths by heat stroke since official records started in 2004. A portion of health-related impacts could be mitigated by the use of air conditioning, but this caused a 10% rise in Iberian energy consumption and blackouts in Lisbon suburbs.
                  </div>
                  <div className="block xl:hidden">
                    {renderChart}
                  </div>
                  <div className="pb-[20px]">
                    {legend}
                  </div>
                  <div className="text-[12px]">
                    Data source: average for xx months in 2018
                  </div>
                </motion.div>
              </div>}
            </AnimatePresence>
          </motion.div>}
          <AnimatePresence>
            {step === 'step-3' && <div>
              <motion.div
                className="text-white relative xl:absolute top-[30%] left-8 xl:left-[10%] w-full"
                initial={{ opacity: 0, top: 'calc(30% + 200px)' }}
                animate={{ opacity: 1, top: '30%', transition }}
                exit={{ opacity: 0, top: 'calc(30% + 200px)' }}
              >
                {renderChart}
              </motion.div>
            </div>}
          </AnimatePresence>
        </div>
        <ScrollStep id="step-1" className='relative h-[100vh]' offset={0} onEnter={setStep} />
        <ScrollStep id="step-2" className='h-[100vh]' offset={0.5} onEnter={setStep} />
        <ScrollStep id="step-3" className='h-[200vh]' offset={0.5} onEnter={setStep} />
      </div >
    </section >
  );
};
