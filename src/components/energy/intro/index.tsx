import Image from "next/image";

import dynamic from "next/dynamic";
const Lines = dynamic(() => import("@/components/lines"), { ssr: false });

export default function Intro() {
  return (
    <section className="relative bg-blue-950">
      <Lines
        verticalClassName="left-8 w-[calc(100vh-16px)]"
        sectionName="intro"
        columns={[349, 1050]}
        rows={[220, 286, 302, 364, 468, 713]}
      />
      <div className="container relative flex flex-col-reverse pb-[60px] pl-8 pt-[110px] xl:grid xl:grid-cols-[250px_1fr_250px] xl:pl-24 xl:pt-[177px]">
        <div className="xl:space-y-10 xl:pt-[41px]">
          {/* Text and images removed for now - May be recovered on the future */}
          {/* <div className='text-white text-balanced leading-[18px] pt-4 xl:pt-0'>
            The Climate Adaptation <br />Digital Twin in Action: <br />Climate simulations to support decisions in the energy sector.
          </div>
          <ul className='flex flex-row xl:flex-col gap-[10px]'>
            {
              Array(5).fill(0).map((_, i) => (
                <li key={`intro-images-${i}`} className='flex items-center gap-[9px] relative'>
                  <Image alt="" src={`/images/energy-thumbs-${i + 1}.png`} width={72} height={79} />
                  {i === 0 && <span className='bg-white w-[10px] h-[10px] rounded-full hidden xl:block' />}
                </li>
              ))
            }
          </ul> */}
        </div>
        <div className="space-y-[30px] text-center xl:space-y-[94px]">
          <div>
            <div className="inline-flex items-center pb-4 text-xs text-light-green">
              Case study
              <span className="mx-[10px] h-px w-[20px] bg-light-green" />
              01 Energy
            </div>
            <h1 className="xl:max-w-[1012px]">
              <div className="text-2xl font-semibold text-light-green xl:text-[90px] xl:leading-[81px]">
                The Future of{" "}
              </div>
              <div className="text-2xl font-semibold text-white xl:text-[90px] xl:leading-[81px]">
                Energy
              </div>
            </h1>
          </div>
          <div className="flex items-center justify-center">
            <Image
              alt=""
              src="/images/energy-intro.png"
              className="object-cover xl:h-[247px] xl:w-[702px]"
              width={494}
              height={297}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
