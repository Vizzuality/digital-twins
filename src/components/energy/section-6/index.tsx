"use client";
import dynamic from "next/dynamic";
import Image from "next/image";

import ImageSliderWithText from "@/components/image-slider-with-text";

const Lines = dynamic(() => import("@/components/lines"), { ssr: false });

const renderLegend = (
  <div className="relative inline-flex w-full flex-col gap-2 pt-6 text-2xs lg:py-1 xl:absolute xl:-top-24 xl:right-[152px] xl:h-8 xl:w-[258px]">
    <div className="inline-flex items-start justify-between self-stretch">
      <div>LOW (20º C)</div>
      <div>HIGH (47º C)</div>
    </div>
    <Image
      alt="legend"
      src="/images/energy-legend-observations.svg"
      className="w-full"
      width={378}
      height={100}
    />
    <div className="flex w-full justify-between items-center">
      <div className="min-w-[106px]">CONTOUR LINE: +35º C</div>
      <Image
        alt="contour line legend +35º C"
        src="/images/home-legend-contour-line.svg"
        className="h-[16px] w-full max-w-[100%] object-contain object-right sm:h-full sm:w-[200px] xl:w-[91px]"
        width={91}
        height={100}
      />
    </div>
    <div className="flex w-full justify-between items-center">
      <div className="min-w-[106px]">CONTOUR LINE: +42º C</div>
      <Image
        alt="contour line legend +42º C"
        src="/images/energy-section-6-contour-line-2.svg"
        className="h-[16px] w-full max-w-[100%] object-contain object-right sm:h-[22px] xl:h-full sm:w-[200px] xl:w-[43px]"
        width={43}
        height={100}
      />
    </div>
  </div>
);

const renderText1 = (
  <>
    <div>
      <div className="text-base">SIM. 01</div>
      <div className="text-xl">7th August 2018</div>
    </div>
    <div className="text-xs leading-[16px]">
      In the case of the 2018 heatwave, maximum temperatures were well captured in valley and mountain ridges such as the Pyrinees, while some differences in maximum temperature remained along the Portuguese western coast.
    </div>
    <div className="text-xs leading-[16px]">
      Source: Destination Earth
    </div>
  </>
);

const renderText2 = (
  <>
    <div>
      <div className="text-base">SIM. 02</div>
      <div className="text-xl">Future scenario: +2ºC</div>
    </div>
    <div className="text-xs leading-[16px]">
      If the same heatwave episode were to take place under a 2°C warmer climate, a larger area of
      the Iberian Peninsula would be experiencing extreme temperatures, with the highest values
      nearly hitting 49°C. Increases in maximum temperature in some areas could reach up to 5°C
      compared to present-day temperatures. Areas undergoing the greatest change in temperature
      extremes are located in the inland northwestern Iberian Peninsula, with a warming ranging
      between 3.5 and 5°C.
    </div>
    <div className="text-xs leading-[16px]">
      Source: Destination Earth
    </div>
  </>
);

export default function Section6() {
  return (
    <section className="relative scroll-mt-8 bg-white" id="section-6">
      <div className="pointer-events-none relative">
        <Lines
          verticalClassName="left-8"
          sectionName="section-6"
          columns={[100]}
          rows={[]}
          colorClass="bg-blue-900/10"
        />
      </div>
      <div className="container relative hidden w-full xl:block">{renderLegend}</div>
      <ImageSliderWithText
        text1={renderText1}
        text2={renderText2}
        legend={renderLegend}
        image1="/images/energy-section-6-iberia-1.png"
        image2="/images/energy-section-6-iberia-2.png"
        sliderHeightClass={"xl:h-[730px]"}
        resizeButtonClassName="top-[80%] xl:top-[600px]"
        className="container px-[20px] xl:px-[150px]"
      />
    </section>
  );
}
