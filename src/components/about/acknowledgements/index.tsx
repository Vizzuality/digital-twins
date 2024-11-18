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
        <div className="container flex flex-col gap-6 py-6 pl-8 xl:py-[100px] xl:pl-24">
          <h2 className="uppercase xl:text-lg">Acknowledgements</h2>
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
            <div className="flex max-w-[425px] items-start gap-2 pt-1">
              <Image
                src="/images/about-logo-eu.png"
                alt="acknowledgements"
                className="w-[44%]"
                width={1280}
                height={285}
              />
              <Image
                src="/images/about-logo-eerie.png"
                alt="acknowledgements"
                className="w-[25%]"
                width={842}
                height={418}
              />
              <Image
                src="/images/about-logo-next-gems.png"
                alt="acknowledgements"
                className="w-[25%]"
                width={500}
                height={232}
              />
            </div>
            <Image
              src="/images/about-ack-3.png"
              alt="acknowledgements"
              className="w-[358px]"
              width={358}
              height={80}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
