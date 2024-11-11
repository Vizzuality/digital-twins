'use client';
import { useState } from "react";
import dynamic from 'next/dynamic';
const Lines = dynamic(() => import('@/components/lines'), { ssr: false });
import { motion, AnimatePresence } from "framer-motion";
import KnowMoreButton from "@/components/know-more-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import ImageSliderWithText from "@/components/image-slider-with-text";

const renderLegend = <div className="legend relative xl:absolute xl:-top-[70px] xl:right-0 w-full xl:w-[258px] xl:h-8 lg:py-1 flex-col gap-2 inline-flex text-2xs pt-6">
  <div className="justify-between items-start inline-flex">
    <div>LOW (20º)</div>
    <div>HIGH (47º)</div>
  </div>
  <Image alt="legend" src="/images/home-legend-spectral.svg" className="w-full" width={378} height={100} />
  <div className="flex w-full justify-between">
    <div>CONTOUR LINE: +35º C</div>
    <Image alt="contour line legend" src="/images/home-legend-contour-line.svg" className="w-[200px] xl:w-[91px]" width={91} height={100} />
  </div>
</div>;

const renderText1 = <>
  <div>
    <div className="text-base">7th AUGUST 2018</div>
    <div className="text-xl pb-2">Western European heatwave</div>
    <div className="text-xs">Source: Destination Earth</div>
  </div>
</>;

const renderText2 = <>
  <div>
    <div className="text-base">PRESENT-DAY CONDITIONS</div>
    <div className="text-xl pb-2">Warning in a +2ºC world</div>
    <div className="text-xs">Source: Destination Earth</div>
  </div>
</>;

export default function Section4() {
  const [openedKnowMore, setOpenedKnowMore] = useState(false);


  return (
    <section className="relative bg-blue-950 scroll-mt-8 text-white" id="section-4">
      <div className="relative xl:h-[548px] overflow-hidden flex items-center justify-center z-10 h-[348px]">
        <video autoPlay muted playsInline loop className="absolute w-screen object-fill z-0">
          <source src="/videos/section-4.webm" type="video/webm" />
        </video>
        <div className="relative z-10 text-white text-center px-2 xl xl:px-0">
          <div className="text-center xl:text-lg uppercase tracking-tight">Unlocking Future Possibilities</div>
          <div className="text-center text-[36px] xl:text-4xl max-w-[830px]">
            Harnessing Digital Twins for on-demand simulations.
          </div>
        </div>
      </div>
      <Lines verticalClassName="px-[152px] z-0" sectionName="section-4" rows={[1506]} columns={[548]} colorClass="bg-white/10" />
      <div className="container px-[20px] xl:px-[150px]">
        <div className="flex flex-col xl:pb-[120px] gap-[60px] xl:gap-[100px]">
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
          <div className="text-[36px] xl:text-4xl font-medium tracking-wide">What if ...</div>
          <Tabs defaultValue="scenario1">
            <TabsList>
              <TabsTrigger value="scenario1">Scenario 1</TabsTrigger>
              <TabsTrigger value="scenario2">Scenario 2</TabsTrigger>
              <TabsTrigger value="scenario3">Scenario 3</TabsTrigger>
            </TabsList>
            <TabsContent value="scenario1" className="pt-6 xl:pt-10">
              <div className="grid xl:grid-cols-2 gap-[48px] xl:gap-0 pb-10 xl:pb-20">
                <div className="text-light-green max-w-[320px] text-xl">
                  ... the heatwave that affected Europe in 2018 occurred in a +2ºC warmer world ?
                </div>
                <div className="text-white max-w-[466px] text-balance">
                  The digital twin allows not only to understand the conditions under which the 2018 heatwave had occurred, but also to simulate how much worse could this heatwave be if it occurs under a future warmer world.
                </div>
              </div>
              <div className="relative xl:mt-16">
                <div className="hidden xl:block w-full">
                  {renderLegend}
                </div>
                <ImageSliderWithText
                  text1={renderText1}
                  text2={renderText2}
                  legend={renderLegend}
                  image1="/images/home-europe-hist-scenario.png"
                  image2="/images/home-europe-plus-2k-scenario.png"
                  sliderHeightClass={'xl:h-[440px]'}
                  textClass={'text-white'}
                  resizeButtonClassName='top-[170px] xl:top-[350px]'
                />
              </div>
            </TabsContent>
            <TabsContent value="scenario2" className="pt-6 xl:pt-10">
              <div className="grid xl:grid-cols-2 gap-[48px] xl:gap-0">
                <div className="text-light-green max-w-[320px] text-xl">
                  ... forest areas in a region are converted to irrigated cropland?
                </div>
                <div className="text-white max-w-[466px] text-balance xl:mb-20">
                  By allowing the change of land use category from forest to cropland, the digital twin makes it possible for users to explore the effects that the reduced amount of forest land would have on variables such as the soil moisture, local precipitation and temperature.
                </div>
                <div className="pb-6">
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
              </div>
            </TabsContent>
            <TabsContent value="scenario3" className="pt-6 xl:pt-10">
              <div className="grid xl:grid-cols-2 gap-[48px] xl:gap-0">
                <div className="text-light-green max-w-[320px] text-xl">
                  ... a wind farm is built in a particular location?
                </div>
                <div className="text-white max-w-[466px] text-balance xl:mb-20">
                  The digital twin allows simulations of the average energy output of a wind farm built in a particular location. This type of information is key to advising the investment of wind energy planners in the deployment of a new wind farm, which needs to take into account the initial investment and future expected revenues.
                </div>
                <div className="pb-6">
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
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section >);
};