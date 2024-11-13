"use client";

import dynamic from "next/dynamic";
import Image from "next/image";

import DestinationEarthLogo from "@/svgs/destination_earth_logo.svg";
import ExternalLink from "@/svgs/icon-external-link.svg";

const Lines = dynamic(() => import("@/components/lines"), { ssr: false });

export default function Section1() {
  return (
    <section>
      <div className="relative bg-blue-900 text-white">
        <Lines
          verticalClassName="left-8 w-[calc(100vh-16px)]"
          sectionName="project-2"
          columns={[66]}
          colorClass="bg-white/10"
        />
        <div className="container flex flex-col gap-4 max-xl:pb-[60px] xl:flex-row xl:gap-[140px]">
          <div className="relative space-y-6 py-6 pb-6 xl:space-y-[60px] xl:py-[100px] xl:pl-[65px]">
            <h2 className="flex w-full flex-col xl:gap-4">
              <div className="uppercase xl:text-lg">Project 2</div>
              <div className="text-2xl xl:text-4xl">Destination Earth</div>
            </h2>
            <div className="max-w-[660px] space-y-4 text-sm xl:text-base">
              <p>
                Destination Earth is a flagship programme of the European Commission that aims to
                construct highly accurate models, or ‘digital twins’, of the Earth to monitor and
                predict environmental change and human impact in support of sustainable development.
                The initiative is implemented by ECMWF, ESA and EUMETSAT under the leadership of DG
                Connect and in collaboration with over 100 institutions throughout Europe. Aligned
                with the new Digital Europe funding programme, Destination Earth started in 2021,
                with the first, high-priority digital twins serving extremes prediction and climate
                change adaptation starting their production in 2023.
              </p>
              <p>
                The Digital Twin for Climate Change Adaptation, in which BSC plays a crucial role,
                is a pioneering effort to operationalise the production of global climate
                projections for the upcoming decades and provide globally consistent Earth system
                and impact sector information from global to local scales.
              </p>
              <a
                target="_blank"
                href="https://destination-earth.eu/"
                rel="noreferrer"
                className="flex items-center gap-1 leading-relaxed underline hover:opacity-70"
              >
                <ExternalLink />
                Visit Destination Earth
              </a>
            </div>
          </div>
          <div className="relative h-full">
            <Image
              src="/images/about-destination-earth.png"
              alt="Destination Earth"
              className="object-cover max-xl:max-h-[141px]"
              width={500}
              height={795}
            />
            <DestinationEarthLogo className="h-[25px] w-[194px] max-xl:mt-4 xl:absolute xl:bottom-[66px] xl:right-6" />
          </div>
        </div>
      </div>
    </section>
  );
}
