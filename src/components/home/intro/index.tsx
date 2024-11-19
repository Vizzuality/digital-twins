"use client";

import Link from "next/link";

import HoverRepeatAnimation from "@/components/animations/hover-repeat";
import Marquee from "@/components/animations/marquee";
import { MotionButton, Button } from "@/components/button";
import Lines from "@/components/lines";
import VerticalCarousel from "@/components/vertical-carousel";

import ArrowRightIcon from "@/svgs/arrow-right.svg";

import HeroVideo from "./hero-video";

export default function Intro() {
  const handleAnchor = (anchor: string) => {
    const element = document.getElementById(anchor);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  return (
    <section className="relative min-h-[600px] bg-blue-900 xl:h-[110vh] xl:min-h-[700px]">
      <HeroVideo />
      <Lines
        verticalClassName="left-8 w-[calc(100vh-16px)]"
        sectionName="intro"
        columns={[64, 254, 270, 430, 1074]}
        rows={[204, 444, 516, 559, 602]}
      />
      <div className="container relative space-y-[30px] pl-8 pt-[110px] xl:pl-24 xl:pt-[198px]">
        <h1 className="xl:max-w-[1012px]">
          <div className="text-2xl font-semibold text-light-green sm:text-3xl xl:text-5xl">
            Digital Twins:{" "}
          </div>
          <div className="text-2xl font-semibold text-white sm:text-3xl xl:text-5xl">
            Innovative Research for a Sustainable Future
          </div>
        </h1>
        <VerticalCarousel className="text-sm text-white sm:text-lg xl:text-2xl">
          <div>Bridging data and discovery with state-of-the-art digital twin technology</div>
          <div>Advancing climate knowledge through digital twins</div>
          <div>Harnessing advanced simulations to adapt to and mitigate climate impacts</div>
        </VerticalCarousel>
        <div className="flex flex-wrap gap-4">
          <Button variant="white" size="lg" className="group z-10">
            <Link href="/case-study-energy">View use cases</Link>
            <ArrowRightIcon className="h-5 w-5 transform text-white transition-transform group-hover:translate-x-0.5 group-hover:text-blue-900" />
          </Button>
          <MotionButton
            variant="secondary"
            initial="rest"
            whileHover="hover"
            animate="rest"
            size="lg"
            className="z-10"
          >
            <HoverRepeatAnimation isChild>
              <Link href="/#section-1" onClick={() => handleAnchor("section-1")} scroll={false}>
                Keep exploring
              </Link>
            </HoverRepeatAnimation>
          </MotionButton>
        </div>
      </div>
      <Marquee className="absolute bottom-0 w-full gap-12 border-t border-light-green py-4 text-light-green xl:text-xl">
        <span className="ml-10 h-8 border-l border-light-green pl-10">
          Bridging data and discovery with state-of-the-art digital twin technology
        </span>
        <span className="ml-10 h-8 border-l border-light-green pl-10">
          Advancing climate knowledge through digital twins
        </span>
        <span className="ml-10 h-8 border-l border-light-green pl-10">
          Harnessing advanced simulations to adapt to and mitigate climate impacts
        </span>
      </Marquee>
    </section>
  );
}
