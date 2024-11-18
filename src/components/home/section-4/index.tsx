"use client";
import { useState } from "react";

import dynamic from "next/dynamic";

const Lines = dynamic(() => import("@/components/lines"), { ssr: false });
import Image from "next/image";

import { motion, AnimatePresence } from "framer-motion";

import Arrows from "@/components/arrows";
import ImageSliderWithText from "@/components/image-slider-with-text";
import KnowMoreButton from "@/components/know-more-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VideoPlayer from "@/components/video-player";

const renderLegend = (
  <div className="legend relative inline-flex w-full flex-col gap-2 pt-6 text-2xs lg:py-1 xl:absolute xl:-top-[70px] xl:right-0 xl:h-8 xl:w-[258px]">
    <div className="inline-flex items-start justify-between">
      <div>LOW (20º)</div>
      <div>HIGH (47º)</div>
    </div>
    <Image
      alt="legend"
      src="/images/home-legend-spectral.svg"
      className="w-full"
      width={378}
      height={100}
    />
    <div className="flex w-full justify-between">
      <div>CONTOUR LINE: +35º C</div>
      <Image
        alt="contour line legend"
        src="/images/home-legend-contour-line.svg"
        className="w-[200px] xl:w-[91px]"
        width={91}
        height={100}
      />
    </div>
  </div>
);

const renderText1 = (
  <>
    <div>
      <div className="text-base">7th AUGUST 2018</div>
      <div className="pb-2 text-xl">Western European heatwave</div>
      <div className="text-xs">Source: Destination Earth</div>
    </div>
  </>
);

const renderText2 = (
  <>
    <div>
      <div className="text-base">PRESENT-DAY CONDITIONS</div>
      <div className="pb-2 text-xl">Warning in a +2ºC world</div>
      <div className="text-xs">Source: Destination Earth</div>
    </div>
  </>
);

export default function Section4() {
  const [openedKnowMore, setOpenedKnowMore] = useState(false);
  const [tabsValue, setTabsValue] = useState("scenario1");
  const handleValueChange = (value: string) => {
    setTabsValue(value);
  };

  return (
    <section className="relative scroll-mt-8 bg-blue-950 text-white" id="section-4">
      <div className="relative z-10 flex h-[255px] items-center justify-center overflow-hidden max-xl:mb-6 xl:h-[548px]">
        <VideoPlayer
          src="/videos/stream-videos/section-4/index.m3u8"
          className="absolute z-0 w-screen object-fill"
        />
        <div className="xl relative z-10 px-2 text-center text-white xl:px-0">
          <h2 className="text-center uppercase tracking-tight xl:text-lg">
            Unlocking Future Possibilities
          </h2>
          <h3 className="max-w-[830px] text-center text-[36px] max-xl:leading-[42px] xl:text-4xl">
            Harnessing Digital Twins for on-demand simulations.
          </h3>
        </div>
      </div>
      <Lines
        verticalClassName="px-[152px] z-0"
        sectionName="section-4"
        rows={[1142]}
        columns={[548]}
        colorClass="bg-white/10"
      />
      <div className="container px-[20px] xl:px-[150px]">
        <div className="flex flex-col gap-[60px] xl:gap-[100px] xl:pb-[120px]">
          <div className="max-w-[630px] space-y-5 xl:pt-20">
            <div className="max-w-[594px]">
              <h3 className="pb-5 text-xl xl:text-2xl">
                Through interactive and configurable access to data, models and workflows, the
                digital twin represents an exciting opportunity to satisfy users’ curiosity.
              </h3>
            </div>
            <KnowMoreButton
              className="text-white"
              onClick={() => setOpenedKnowMore(!openedKnowMore)}
              opened={openedKnowMore}
            />
            <AnimatePresence>
              {openedKnowMore && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-4"
                >
                  <p>
                    On-demand simulations enable experimentation, prediction, and scenario analysis
                    to explore the potential consequences of different future climate conditions and
                    user interventions. This opens the door to simulating a vast array of potential
                    future situations and their associated environmental consequences with
                    remarkable clarity by manipulating parameters within the model.
                  </p>
                  <p>
                    On-demand simulations may include the exploration of different projection
                    scenarios for the next 30+ years and addressing specific ‘what-if’ questions.
                    This information can support the design of adaptation and mitigation measures
                    by, for example, assessing climate impacts under several policy-relevant
                    scenarios, exploring how recently impactful extreme events have been affected by
                    climate change (attribution studies), showing how such types of extreme events
                    may unfold in different future climates (storylines), and even assessing the
                    direct effects of actions addressed to improve climate resilience.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <h3 className="text-[36px] font-medium tracking-wide xl:text-4xl">What if ...</h3>
          <Tabs defaultValue="scenario1" value={tabsValue} onValueChange={handleValueChange}>
            <TabsList>
              <TabsTrigger value="scenario1">Scenario 1</TabsTrigger>
              <TabsTrigger value="scenario2">Scenario 2</TabsTrigger>
              <TabsTrigger value="scenario3">Scenario 3</TabsTrigger>
            </TabsList>
            <TabsContent value="scenario1" className="pt-6 xl:pt-10">
              <div className="grid gap-[48px] xl:grid-cols-2 xl:gap-0 xl:pb-20">
                <div className="max-w-[320px] text-xl text-light-green">
                  ... the heatwave that affected Europe in 2018 occurred in a +2ºC warmer world ?
                </div>
                <div className="flex">
                  <div className="max-w-[466px] text-balance text-white max-xl:pb-12">
                    The digital twin allows not only to understand the conditions under which the
                    2018 heatwave had occurred, but also to simulate how much worse could this
                    heatwave be if it occurs under a future warmer world.
                  </div>
                  <Arrows
                    textIndex={0}
                    changeTextIndex={(index: number) => index > 0 && handleValueChange("scenario2")}
                  />
                </div>
              </div>
              <div className="relative xl:mt-16">
                <div className="hidden w-full xl:block">{renderLegend}</div>
                <ImageSliderWithText
                  text1={renderText1}
                  text2={renderText2}
                  legend={renderLegend}
                  image1="/images/home-europe-hist-scenario.png"
                  image2="/images/home-europe-plus-2k-scenario.png"
                  sliderHeightClass={"xl:h-[440px]"}
                  textClass={"text-white"}
                  resizeButtonClassName="top-[170px] xl:top-[350px]"
                />
              </div>
            </TabsContent>
            <TabsContent value="scenario2" className="pt-6 xl:pt-10">
              <div className="grid gap-[48px] xl:grid-cols-2 xl:gap-0">
                <div className="max-w-[320px] text-xl text-light-green">
                  ... forest areas in a region are converted to irrigated cropland?
                </div>
                <div className="flex">
                  <div className="max-w-[466px] text-balance text-white xl:mb-20">
                    By allowing the change of land use category from forest to cropland, the digital
                    twin makes it possible for users to explore the effects that the reduced amount
                    of forest land would have on variables such as the soil moisture, local
                    precipitation and temperature.
                  </div>
                  <Arrows
                    textIndex={1}
                    changeTextIndex={(index: number) =>
                      index > 0 ? handleValueChange("scenario3") : handleValueChange("scenario1")
                    }
                  />
                </div>
                <div className="pb-6 xl:hidden">
                  <Image src="/images/home-what-if-2-1.png" alt="" width={580} height={360} />
                  <Image src="/images/home-what-if-2-2.png" alt="" width={580} height={360} />
                </div>
                <Image
                  src="/images/home-what-if-2-1.png"
                  alt=""
                  className="hidden xl:block"
                  width={580}
                  height={360}
                />
                <Image
                  src="/images/home-what-if-2-2.png"
                  alt=""
                  className="hidden xl:block"
                  width={580}
                  height={360}
                />
              </div>
            </TabsContent>
            <TabsContent value="scenario3" className="pt-6 xl:pt-10">
              <div className="grid gap-[48px] xl:grid-cols-2 xl:gap-0">
                <div className="max-w-[320px] text-xl text-light-green">
                  ... a wind farm is built in a particular location?
                </div>
                <div className="flex">
                  <div className="max-w-[466px] text-balance text-white xl:mb-20">
                    The digital twin allows simulations of the average energy output of a wind farm
                    built in a particular location. This type of information is key to advising the
                    investment of wind energy planners in the deployment of a new wind farm, which
                    needs to take into account the initial investment and future expected revenues.
                  </div>
                  <Arrows
                    textIndex={2}
                    changeTextIndex={(index: number) => index < 0 && handleValueChange("scenario2")}
                    isMaxIndex
                  />
                </div>
                <div className="pb-6 xl:hidden">
                  <Image src="/images/home-what-if-3-1.png" alt="" width={580} height={360} />
                  <Image src="/images/home-what-if-3-2.png" alt="" width={580} height={360} />
                </div>
                <Image
                  src="/images/home-what-if-3-1.png"
                  alt=""
                  className="hidden xl:block"
                  width={580}
                  height={360}
                />
                <Image
                  src="/images/home-what-if-3-2.png"
                  alt=""
                  className="hidden xl:block"
                  width={580}
                  height={360}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
