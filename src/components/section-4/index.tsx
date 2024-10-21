'use client';
import { useState } from "react";
import Lines from "@/components/lines";
import { motion, AnimatePresence } from "framer-motion";
import KnowMoreButton from "@/components/know-more-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Section3() {

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
      <Lines verticalClassName="pl-[152px] pr-[152px] z-0" sectionName="section-5" rows={[1506]} columns={[548]} colorClass="bg-white/10" />
      <div className="container px-[150px]">
        <div className="flex flex-col pb-[120px] gap-[100px]">
          <div className="max-w-[630px] space-y-5 pb-10 pt-20">
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
          <Tabs defaultValue="scenario1" className="w-[400px]">
            <TabsList>
              <TabsTrigger value="scenario1">Scenario 1</TabsTrigger>
              <TabsTrigger value="scenario2">Scenario 2</TabsTrigger>
              <TabsTrigger value="scenario3">Scenario 3</TabsTrigger>
            </TabsList>
            <TabsContent value="scenario1">
              <div className="grid grid-cols-2">
                <div className="text-light-green">
                  ... the heatwave that affected Europe in 2018 occurred in a +2ºC warmer world ?
                </div>
              </div>
            </TabsContent>
            <TabsContent value="scenario2"></TabsContent>
            <TabsContent value="scenario3"></TabsContent>
          </Tabs>
        </div>
      </div>
    </section >);
};