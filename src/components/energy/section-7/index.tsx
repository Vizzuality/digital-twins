"use client";
import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import { cn } from "@/lib/utils";

import KnowMoreButton from "@/components/know-more-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VideoPlayer from "@/components/video-player";

import { TAB_DATA } from "./data";
import TabContentItem from "./tab-content-item";
import TabTriggerItem from "./tab-trigger-item";

const SharedImpactTabs = () => {
  const [selectedValue, setSelectedValue] = useState(TAB_DATA[0].value);
  const [hoveredValue, setHoveredValue] = useState<string | null>(null);
  const handleValueChange = (value: string) => {
    if (!TAB_DATA.find((tab) => tab.value === value)?.disabled) {
      setSelectedValue(value);
    }
  };

  return (
    <Tabs
      onValueChange={handleValueChange}
      value={selectedValue}
      defaultValue="tab1"
      className="flex flex-col gap-20 xl:flex-row"
      orientation="vertical"
    >
      <TabsList className="flex h-auto w-full flex-1 flex-col gap-5 overflow-hidden xl:min-w-[300px] xl:max-w-[300px]">
        {TAB_DATA.map((tab, index) => (
          <TabsTrigger
            key={index}
            value={tab.value}
            onFocus={() => {
              handleValueChange(tab.value);
            }}
            onMouseEnter={() => {
              setHoveredValue(tab.value);
            }}
            onMouseLeave={() => setHoveredValue(null)}
            className={cn("relative p-0 normal-case data-[state=active]:no-underline", {
              "cursor-default": tab.disabled,
            })}
          >
            <TabTriggerItem
              {...tab}
              index={index}
              isHovered={tab.value === hoveredValue}
              isSelected={tab.value === selectedValue}
            />
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent
        value="tab1"
        className="mt-0 bg-white/5 xl:max-h-[440px] xl:w-[780px] xl:min-w-[780px]"
      >
        <TabContentItem index={0} />
      </TabsContent>
      <TabsContent
        value="tab2"
        className="mt-0 bg-white/5 xl:max-h-[440px] xl:w-[780px] xl:min-w-[780px]"
      >
        <TabContentItem index={1} />
      </TabsContent>
    </Tabs>
  );
};

export default function Section7() {
  const [openedKnowMore, setOpenedKnowMore] = useState(false);
  return (
    <section className="relative scroll-mt-8 bg-blue-950 text-white" id="section-7">
      <div className="relative z-10 flex h-[255px] items-center justify-center overflow-hidden max-xl:mb-6 xl:h-[548px]">
        <VideoPlayer
          src="/videos/stream-videos/section-4/index.m3u8"
          className="absolute z-0 min-h-[255px] w-screen self-start"
          videoClassName="object-cover sm:object-fit min-h-[255px]"
        />
        <div className="xl relative z-10 px-2 text-center text-white xl:px-0">
          <h2 className="text-center uppercase tracking-tight xl:text-lg">
            Unlocking Future Possibilities
          </h2>
          <h3 className="max-w-[95%] text-center text-[36px] max-xl:leading-[42px] xl:text-4xl">
            Harnessing Digital Twins for on-demand simulations.
          </h3>
        </div>
      </div>
      <div className="container px-[20px] xl:px-[150px]">
        <div className="flex flex-col gap-[60px] pb-[120px] xl:gap-[100px]">
          <div className="max-w-[630px] space-y-5 pt-4 xl:pt-20">
            <div className="max-w-[492px]">
              <h3 className="pb-5 text-xl xl:text-2xl">
                Climate change affects various aspects of our lives, making it essential to
                understand its wide-ranging impacts, this way strategies for adaptation can be
                prepared.
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
                  className="max-w-[492px] space-y-4"
                >
                  Climate change is not just an environmental issue. It affects every aspect of our
                  lives, from energy security to public health, to the way we design the cities we
                  live in. Therefore, it is crucial to understand its wide-ranging effects. Learn
                  how digital twins are revolutionising our ability to navigate and respond to
                  climate-related challenges, and gain insights into the interconnected nature of
                  climate change impacts.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="xl:space-y-4">
            <h2 className="text-[36px] font-medium tracking-wide xl:text-4xl">Our shared impact</h2>
            <h3 className="pb-5 text-xl xl:max-w-[503px] xl:text-2xl">
              Discover the faces behind climate impacts on energy
            </h3>
          </div>
          <SharedImpactTabs />
        </div>
      </div>
    </section>
  );
}
