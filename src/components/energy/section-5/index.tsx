'use client';
import { useState } from "react";
import dynamic from 'next/dynamic';
import Image from "next/image";
const Lines = dynamic(() => import('@/components/lines'), { ssr: false });
import KnowMoreButton from "@/components/know-more-button";
import { AnimatePresence, motion } from "framer-motion";

export default function Section5() {
  const [openedKnowMore, setOpenedKnowMore] = useState(false);
  const [openedKnowMore2, setOpenedKnowMore2] = useState(false);
  return (
    <section className="relative bg-white pt-10 xl:pt-20 scroll-mt-8" id="section-5">
      <Lines verticalClassName="px-[152px]" sectionName="section-5" rows={[]} columnsNumber={2} colorClass="bg-blue-900/10" />
      <div className="container px-[20px] xl:px-[150px] flex flex-col xl:flex-row justify-between items-start">
        <div className="flex pb-6 xl:pb-[120px] xl:pr-[40px]">
          <div className="max-w-[540px] xl:min-w-[500px] text-green-700 space-y-5 xl:pb-10">
            <h2 className="text-3xl xl:text-4xl font-medium pb-10 xl:pb-16">Why storylines for energy futures?</h2>
            <h3 className="text-xl xl:text-2xl pb-5">Storylines in climate science make climate information more relevant and understandable, aiding decision-making, especially when used with digital twin simulations.</h3>
            <KnowMoreButton onClick={() => setOpenedKnowMore(!openedKnowMore)} opened={openedKnowMore} />
            <AnimatePresence>
              {openedKnowMore && <motion.div
                key="know-more-green-transition"
                initial={{ opacity: 0, height: 0 }}
                exit={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="text-sm xl:text-base space-y-4"
              >
                <p>
                  Climate and impact sector modelling is done in the same modelling chain, meaning that impact sector models access all the climate-related information they need (rather than just a subset of model outputs) while the digital twin is running. This allows for a detailed analysis of how climate variability and change affect different impact sectors, such as energy, agriculture or health, helping these sectors understand and anticipate risks and implement proactive measures to enhance societal resilience.
                </p>
                <p>
                  For instance, understanding how wind energy fluctuates at a certain location under particular storm conditions or looking at water availability in a river basin in the next 30 years, can be extremely valuable for planning renewable energy deployment or investments in irrigation systems or water resource management.
                </p>
                <p>
                  The integration of climate models with impact models constitutes a step towards the operationalisation of climate services, since it offers the possibility to transform climate-related information into information that is fit-for-purpose, including sectoral indicators or risk indices considering local vulnerability or adaptation tipping points.
                </p>
              </motion.div>}
            </AnimatePresence>
          </div>
        </div>
        <Image
          alt=""
          className="pb-[102px] xl:w-1/2"
          src="/images/energy-section-5.png"
          width={574}
          height={967}
        />
      </div>
      <div className="container px-[20px] xl:px-[150px] pb-4 xl:pb-[100px] flex flex-col xl:flex-row justify-between items-start">
        <div className="max-w-[540px] xl:min-w-[500px] text-green-700 space-y-5 xl:pb-10">
          <h3 className="text-xl xl:text-2xl pb-5">Using storylines to simulate the 2018 heatwave under current and future conditions to understand their potential impacts.</h3>
          <KnowMoreButton onClick={() => setOpenedKnowMore2(!openedKnowMore2)} opened={openedKnowMore2} />
          <AnimatePresence>
            {openedKnowMore2 && <motion.div
              key="know-more-green-transition"
              initial={{ opacity: 0, height: 0 }}
              exit={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="text-sm xl:text-base space-y-4"
            >
              <p>
                Climate and impact sector modelling is done in the same modelling chain, meaning that impact sector models access all the climate-related information they need (rather than just a subset of model outputs) while the digital twin is running. This allows for a detailed analysis of how climate variability and change affect different impact sectors, such as energy, agriculture or health, helping these sectors understand and anticipate risks and implement proactive measures to enhance societal resilience.
              </p>
              <p>
                For instance, understanding how wind energy fluctuates at a certain location under particular storm conditions or looking at water availability in a river basin in the next 30 years, can be extremely valuable for planning renewable energy deployment or investments in irrigation systems or water resource management.
              </p>
              <p>
                The integration of climate models with impact models constitutes a step towards the operationalisation of climate services, since it offers the possibility to transform climate-related information into information that is fit-for-purpose, including sectoral indicators or risk indices considering local vulnerability or adaptation tipping points.
              </p>
            </motion.div>}
          </AnimatePresence>
        </div>
      </div>
    </section >);
};