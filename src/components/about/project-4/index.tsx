"use client";

import dynamic from "next/dynamic";
import Image from "next/image";

import ExternalLink from "@/svgs/icon-external-link.svg";

import EerieLogo from "@/svgs/eerie-logo.svg";

const Lines = dynamic(() => import("@/components/lines"), { ssr: false });
export default function Section1() {
  return (
    <section>
      <div className="relative bg-white text-green-700">
        <Lines
          verticalClassName="left-8 w-[calc(100vh-16px)]"
          sectionName="project-2"
          columns={[66]}
          colorClass="bg-white/10"
        />
        <div className="container flex flex-col-reverse gap-4 max-xl:pb-[60px] xl:flex-row xl:gap-[140px]">
          <div className="relative xl:pt-[100px]">
            <Image
              src="/images/about-eerie.png"
              alt="EERIE"
              className="max-h-[141px] max-xl:w-full max-xl:object-cover xl:max-h-[621px]"
              width={444}
              height={621}
            />
            <Image
              src="/images/about-eerie-logo.png"
              alt="EERIE"
              className="absolute bottom-[64px] right-6 h-[43px] w-[87px]"
              width={87}
              height={43}
            />
          </div>
          <div className="relative space-y-6 py-6 pb-6 xl:space-y-[80px] xl:py-[100px] xl:pl-[80px]">
            <h2 className="flex w-full flex-col xl:gap-4">
              <div className="uppercase xl:text-lg">Project 04</div>
              <div className="text-2xl xl:text-4xl">EERIE</div>
            </h2>
            <div className="max-w-[576px] space-y-4 text-sm xl:text-base">
              <p>
                EERIE (European eddy-rich Earth system models) is a Horizon Europe project running
                from 2023 to 2026, with the objective to reveal and quantify the role of ocean
                mesoscale processes in shaping the climate trajectory over seasonal to centennial
                time scales. To this end EERIE develops a new generation of Earth System Models
                (ESMs) that are capable of explicitly representing a crucially important, yet
                unexplored regime of the Earth system – the ocean mesoscale. Leveraging the latest
                advances in science and technology, EERIE will substantially improve the ability of
                such ESMs to faithfully represent the centennial-scale evolution of the global
                climate, especially its variability, extremes and how tipping points may unfold
                under the influence of the ocean mesoscale. This will be done harnessing Europe’s
                pre-exascale computers and considering European ocean mesoscale eddies in
                preparation for the next Intergovernmental Panel on Climate Change report.
              </p>
              <a
                target="_blank"
                href="https://eerie-project.eu/"
                rel="noreferrer"
                className="flex items-center gap-1 leading-relaxed underline hover:opacity-70"
              >
                <ExternalLink className="text-green-700" />
                Visit EERIE
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
