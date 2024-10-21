'use client';
import { useState } from "react";
import Lines from "@/components/lines";
import { motion, AnimatePresence } from "framer-motion";
import KnowMoreButton from "@/components/know-more-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

export default function Section4() {
  const [openedKnowMore, setOpenedKnowMore] = useState(false);
  return (
    <section className="relative bg-blue-950 scroll-mt-8 text-white" id="section-4">
      <div className="relative h-[548px] overflow-hidden flex items-center justify-center z-10">
        <video autoPlay muted playsInline loop className="absolute w-full object-fill z-0">
          <source src="/videos/section-4.webm" type="video/mp4" />
        </video>
        <div className="relative z-10 text-white text-center">
          <div className="text-center text-lg uppercase tracking-tight">Unlocking Future Possibilities</div>
          <div className="text-center text-4xl max-w-[720px]">
            Harnessing Digital Twins for on-demand simulations.
          </div>
        </div>
      </div>
      <Lines verticalClassName="pl-[152px] pr-[152px] z-0" sectionName="section-4" rows={[1506]} columns={[548]} colorClass="bg-white/10" />
      <div className="container px-[150px]">
        <div className="flex flex-col pb-[120px] gap-[100px]">
          <div className="max-w-[630px] space-y-5 pt-20">
            <div className="max-w-[594px]">
              <h3 className="text-2xl pb-5">Through interactive and configurable access to data, models and workflows, the digital twin represents an exciting opportunity to satisfy users’ curiosity.</h3>
            </div>
            <KnowMoreButton className="text-white" onClick={() => setOpenedKnowMore(!openedKnowMore)} opened={openedKnowMore} />
            <AnimatePresence>
              {openedKnowMore && <motion.div
                initial={{ opacity: 0, height: 0 }}
                exit={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-4"
              >
                <p>
                  On-demand simulations enable experimentation, prediction, and scenario analysis to explore the potential consequences of different future climate conditions and user interventions. This opens the door to simulating a vast array of potential future situations and their associated environmental consequences with remarkable clarity by manipulating parameters within the model.
                </p>
                <p>
                  On-demand simulations may include the exploration of different projection scenarios for the next 30+ years and addressing specific ‘what-if’ questions. This information can support the design of adaptation and mitigation measures by, for example, assessing climate impacts under several policy-relevant scenarios, exploring how recently impactful extreme events have been affected by climate change (attribution studies), showing how such types of extreme events may unfold in different future climates (storylines), and even assessing the direct effects of actions addressed to improve climate resilience.
                </p>
              </motion.div>}
            </AnimatePresence>

          </div>
          <div className="text-4xl font-medium tracking-wide">What if ...</div>
          <Tabs defaultValue="scenario1">
            <TabsList>
              <TabsTrigger value="scenario1">Scenario 1</TabsTrigger>
              <TabsTrigger value="scenario2">Scenario 2</TabsTrigger>
              <TabsTrigger value="scenario3">Scenario 3</TabsTrigger>
            </TabsList>
            <TabsContent value="scenario1" className="pt-10">
              <div className="grid grid-cols-2">
                <div className="text-light-green max-w-[320px] text-xl">
                  ... the heatwave that affected Europe in 2018 occurred in a +2ºC warmer world ?
                </div>
                <div className="text-white max-w-[466px] text-balance">
                  The digital twin allows not only to understand the conditions under which the 2018 heatwave had occurred, but also to simulate how much worse could this heatwave be if it occurs under a future warmer world.
                </div>
              </div>
            </TabsContent>
            <TabsContent value="scenario2" className="pt-10">
              <div className="grid grid-cols-2">
                <div className="text-light-green max-w-[320px] text-xl">
                  ... forest areas in a region are converted to irrigated cropland?
                </div>
                <div className="text-white max-w-[466px] text-balance mb-20">
                  By allowing the change of land use category from forest to cropland, the digital twin makes it possible for users to explore the effects that the reduced amount of forest land would have on variables such as the soil moisture, local precipitation and temperature.
                </div>
                <Image
                  src="/images/home-what-if-2-1.png"
                  alt=""
                  width={580}
                  height={360}
                />
                <Image
                  src="/images/home-what-if-2-2.png"
                  alt=""
                  width={580}
                  height={360}
                />
              </div>
            </TabsContent>
            <TabsContent value="scenario3" className="pt-10">
              <div className="grid grid-cols-2">
                <div className="text-light-green max-w-[320px] text-xl">
                  ... a wind farm is built in a particular location?
                </div>
                <div className="text-white max-w-[466px] text-balance mb-20">
                  The digital twin allows simulations of the average energy output of a wind farm built in a particular location. This type of information is key to advising the investment of wind energy planners in the deployment of a new wind farm, which needs to take into account the initial investment and future expected revenues.
                </div>
                <Image
                  src="/images/home-what-if-3-1.png"
                  alt=""
                  width={580}
                  height={360}
                />
                <Image
                  src="/images/home-what-if-3-2.png"
                  alt=""
                  width={580}
                  height={360}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section >);
};