'use client';
import dynamic from 'next/dynamic';
const Lines = dynamic(() => import('@/components/lines'), { ssr: false });
import Image from "next/image";
import ImageSliderWithText from "@/components/image-slider-with-text";

const renderLegend = <div className="relative xl:absolute xl:-top-14 xl:right-[152px] w-full xl:w-[258px] xl:h-8 lg:py-1 flex-col gap-1 inline-flex text-2xs pt-6">
  <div className="self-stretch justify-between items-start inline-flex">
    <div>LOW (20º)</div>
    <div>HIGH (47º)</div>
  </div>
  <Image alt="legend" src="/images/energy-legend-observations.svg" className="w-full" width={378} height={100} />
</div>;

const renderText1 = <>
  <div>
    <div className="text-base">SIM. 01</div>
    <div className="text-xl">Present-day</div>
  </div>
  <div className="text-xs leading-[16px]">In the case of the 2018 heatwave, maximum temperatures were well captured in valley and mountain ridges such as the Pyrinees, while some differences in maximum temperature remained along the Portuguese western coast.</div>
</>;

const renderText2 = <>
  <div>
    <div className="text-base">SIM. 02</div>
    <div className="text-xl">Future scenario: +2ºC</div>
  </div>
  <div className="text-xs leading-[16px]">If the same heatwave episode were to take place under a 2°C warmer climate, a larger area of the Iberian Peninsula would be experiencing extreme temperatures, with the highest values nearly hitting 49°C. Increases in maximum temperature in some areas could reach up to 5°C compared to present-day temperatures. Areas undergoing the greatest change in temperature extremes are located in the inland northwestern Iberian Peninsula, with a warming ranging between 3.5 and 5°C.</div>
</>;

export default function Section6() {
  return (
    <section className="relative bg-white scroll-mt-8" id="section-6">
      <div className='relative pointer-events-none'>
        <Lines verticalClassName="left-8" sectionName="section-6" columns={[100]} rows={[100]} colorClass="bg-blue-900/10" />
      </div>
      <div className="relative hidden xl:block w-full container">
        {renderLegend}
      </div>
      <ImageSliderWithText
        text1={renderText1}
        text2={renderText2}
        legend={renderLegend}
        video1="/videos/iberia_hist_scenario.webm"
        video2="/videos/iberia_plus_2k_scenario.webm"
        sliderHeightClass={'xl:h-[730px]'}
        resizeButtonClassName='top-[80%] xl:top-[600px]'
        className='container px-[20px] xl:px-[150px]'
      />
    </section >);
};