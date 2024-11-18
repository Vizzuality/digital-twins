"use client";

import dynamic from "next/dynamic";
import Image from "next/image";

import ExternalLink from "@/svgs/icon-external-link.svg";
import NextGemsLogo from "@/svgs/next-gems-logo.svg";

const Lines = dynamic(() => import("@/components/lines"), { ssr: false });
export default function Section1() {
  return (
    <section>
      <div className="relative bg-white text-green-700">
        <Lines
          verticalClassName="left-8 w-[calc(100vh-16px)]"
          sectionName="project-2"
          columns={[66]}
          colorClass="bg-blue-900/10"
        />
        <div className="container flex flex-col gap-4 max-xl:pb-[60px] xl:flex-row xl:gap-[140px]">
          <div className="relative space-y-6 py-6 pb-6 xl:space-y-[60px] xl:py-[100px] xl:pl-[65px]">
            <h2 className="flex w-full flex-col xl:gap-4">
              <div className="uppercase xl:text-lg">Project 03</div>
              <div className="text-2xl xl:text-4xl">next GEMS</div>
            </h2>
            <div className="max-w-[760px] space-y-4 text-sm xl:text-base">
              <p>
                nextGEMS (Next Generation Earth Modelling Systems) is a collaborative European
                project funded by the EU’s Horizon 2020 programme to develop two next generation
                (storm-resolving) Earth-system Models. The project will run from the year 2021 to
                2025. Through breakthroughs in simulation realism, these models will allow us to
                understand and reliably quantify how the climate will change on a global and
                regional scale, and how the weather, including its extreme events, will look like in
                the future.
              </p>
              <p>
                The European Green Deal initiative Destination Earth will rely on projects like
                nextGEMS to deliver the next-generation, high-resolution Earth-system models to form
                the core of its digital twins of Earth. This convergence of Horizon Europe funded,
                cutting-edge research and Digital Europe funded technology capability provision
                defines a new step in creating value for society.
              </p>
              <a
                target="_blank"
                href="https://nextgems-h2020.eu/"
                rel="noreferrer"
                className="flex items-center gap-1 leading-relaxed underline hover:opacity-70"
              >
                <ExternalLink className="text-green-700" />
                Visit NextGEMS
              </a>
            </div>
          </div>
        </div>
        <div className="relative">
          <Image
            src="/images/about-nextgems.png"
            alt="nextGEMS"
            className="max-h-[141px] w-full object-cover xl:max-h-[548px]"
            width={1440}
            height={548}
          />
          <NextGemsLogo className="absolute bottom-6 left-6 h-[44px] w-[96px] xl:left-auto xl:right-6" />
        </div>
      </div>
    </section>
  );
}
