"use client";

import dynamic from "next/dynamic";
import Image from "next/image";

const Lines = dynamic(() => import("@/components/lines"), { ssr: false });
export default function Section1() {
  return (
    <section>
      <div className="relative border-t border-green-700/30 bg-white text-green-700">
        <Lines
          verticalClassName="left-8 w-[calc(100vh-16px)]"
          sectionName="project-2"
          columns={[66]}
          colorClass="bg-white/10"
        />
        <div className="container flex flex-col gap-6 py-6 xl:py-[100px]">
          <h3 className="uppercase xl:text-lg">Acknowledgements</h3>
          <div className="grid gap-6 xl:grid-cols-3">
            <div className="">
              Spanish Ministry of Science and Innovation/National Research
              Agency/10.13039/501100011033 and the European Union ‘NextGenerationEU/PRTR’ (GLORIA)
            </div>
            <div className="">
              European Commission under the Destination Earth programme implemented by ECMWF, ESA
              and EUMETSAT
            </div>
            <div className="">
              European Union’s Horizon 2020 research and innovation program under the grant
              agreement number 101003470 (nextGEMS) and European Union’s Horizon Europe research and
              innovation program under the grant agreement number 101081383 (EERIE)
            </div>
            <Image
              src="/images/about-ack-1.png"
              alt="acknowledgements"
              className="h-[76px] w-[349px]"
              width={349}
              height={76}
            />
            <Image
              src="/images/about-ack-2.png"
              alt="acknowledgements"
              className="h-[48px] w-[330px]"
              width={330}
              height={48}
            />
            <Image
              src="/images/about-ack-3.png"
              alt="acknowledgements"
              className="h-[28px] w-[402px]"
              width={402}
              height={28}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
