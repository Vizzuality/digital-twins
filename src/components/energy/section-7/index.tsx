'use client';
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import KnowMoreButton from "@/components/know-more-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TabContentItem from "./tab-content-item";
import TabTriggerItem from "./tab-trigger-item";
import { TAB_DATA } from "./data";
import { cn } from "@/lib/utils";
import VideoPlayer from "@/components/video-player";

const SharedImpactTabs = () => {
  const [selectedValue, setSelectedValue] = useState(TAB_DATA[0].value);
  const [hoveredValue, setHoveredValue] = useState<string | null>(null);
  const handleValueChange = (value: string) => {
    if (!(TAB_DATA.find(tab => tab.value === value)?.disabled)) {
      setSelectedValue(value);
    }
  }

  return (
    <Tabs onValueChange={handleValueChange} value={selectedValue} defaultValue="tab1" className="flex flex-col xl:flex-row gap-20" orientation="vertical">
      <TabsList className="flex flex-col h-auto gap-5 w-full xl:min-w-[300px] xl:max-w-[300px] overflow-hidden flex-1">
        {TAB_DATA.map((tab, index) => (
          <TabsTrigger
            key={index}
            value={tab.value}
            onFocus={() => {
              handleValueChange(tab.value)
            }}
            onMouseEnter={() => {
              setHoveredValue(tab.value)
            }}
            onMouseLeave={() => setHoveredValue(null)}
            className={cn("normal-case data-[state=active]:no-underline p-0 relative", {
              "cursor-default": tab.disabled,
            })}

          >
            <TabTriggerItem {...tab} index={index} isHovered={tab.value === hoveredValue} isSelected={tab.value === selectedValue} />
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value="tab1" className="bg-white/5 xl:min-w-[780px] xl:w-[780px] xl:max-h-[440px] mt-0">
        <TabContentItem index={0} />
      </TabsContent>
      <TabsContent value="tab2" className="bg-white/5 xl:min-w-[780px] xl:w-[780px] xl:max-h-[440px] mt-0">
        <TabContentItem index={1} />
      </TabsContent>
    </Tabs>);
}

export default function Section7() {
  const [openedKnowMore, setOpenedKnowMore] = useState(false);
  return (
    <section className="relative bg-blue-950 scroll-mt-8 text-white" id="section-7">
      <div className="relative xl:h-[548px] overflow-hidden flex items-center justify-center z-10 h-[348px]">
        <VideoPlayer src="/videos/stream-videos/section-4/index.m3u8" className="absolute w-screen object-fill z-0" />
        <div className="relative z-10 text-white text-center px-2 xl xl:px-0">
          <div className="text-center xl:text-lg uppercase tracking-tight">Unlocking Future Possibilities</div>
          <div className="text-center text-[36px] max-xl:leading-[42px] xl:text-4xl max-w-[830px]">
            Harnessing Digital Twins for on-demand simulations.
          </div>
        </div>
      </div>
      <div className="container px-[20px] xl:px-[150px]">
        <div className="flex flex-col pb-[120px] gap-[60px] xl:gap-[100px]">
          <div className="max-w-[630px] space-y-5 pt-4 xl:pt-20">
            <div className="max-w-[594px]">
              <h3 className="text-xl xl:text-2xl pb-5">Climate change affects various aspects of our lives, making it essential to understand its wide-ranging impacts, this way strategies for adaptation can be prepared.</h3>
            </div>
            <KnowMoreButton className="text-white" onClick={() => setOpenedKnowMore(!openedKnowMore)} opened={openedKnowMore} />
            <AnimatePresence>
              {openedKnowMore && <motion.div
                initial={{ opacity: 0, height: 0 }}
                exit={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-4"
              >
                Climate change is not just an environmental issue. It affects every aspect of our lives, from energy security to public health, to the way we design the cities we live in. Therefore, it is crucial to understand its wide-ranging effects. Learn how digital twins are revolutionising our ability to navigate and respond to climate-related challenges, and gain insights into the interconnected nature of climate change impacts.
              </motion.div>}
            </AnimatePresence>

          </div>
          <div className="xl:space-y-4">
            <div className="text-[36px] xl:text-4xl font-medium tracking-wide">Our shared impact</div>
            <h3 className="text-xl xl:text-2xl pb-5 xl:max-w-[503px]">Discover the faces behind climate impacts on energy</h3>
          </div>
          <SharedImpactTabs />
        </div>
      </div>
    </section >);
};