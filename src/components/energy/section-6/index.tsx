'use client';
import { useRef } from "react";
import dynamic from 'next/dynamic';
const Lines = dynamic(() => import('@/components/lines'), { ssr: false });
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useContainerWidthWithResize, useIsMobile } from "@/lib/hooks";
import { Resizable } from "re-resizable";
import { Button } from "@/components/button";
import CaretRight from "@/svgs/caret-right.svg";
import Image from "next/image";

const ResizeButton = () => (
  <>
    <Button
      className={cn(
        "z-50 absolute top-[170px] xl:top-[450px] -left-[79px] xl:-left-[103px] h-[25px] xl:h-fit py-[5px] xl:py-[14px] px-[7px] xl:px-[18px] bg-white text-green-700 border-0"
      )}
    >
      <div className="text-center text-xs xl:text-sm text-green-700 uppercase">Sim. 01</div>
      <CaretRight className="w-2.5 h-2.5 xl:h-4 xl:w-4 rotate-180" />
      <div className='bg-green-800/10 w-px h-6'></div>
      <CaretRight className="w-2.5 h-2.5 xl:h-4 xl:w-4" />
      <div className="text-center text-xs xl:text-sm text-green-700 uppercase">Sim. 02</div>
    </Button>
  </>
);

const renderLegend = <div className="relative xl:absolute xl:-top-14 xl:right-[152px] w-full xl:w-[258px] xl:h-8 lg:py-1 flex-col gap-1 inline-flex text-2xs pt-6">
  <div className="self-stretch justify-between items-start inline-flex">
    <div>LOW (XXº)</div>
    <div>HIGH (XXº)</div>
  </div>
  <Image alt="legend" src="/images/home-legend-3.svg" className="w-full" width={378} height={100} />
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
  const containerRef = useRef<HTMLDivElement>(null);
  const containerWidth = useContainerWidthWithResize(containerRef);

  const [resizableWidth, setResizableWidth] = useState(550);
  const [resizableCurrentWidth, setResizableCurrentWidth] = useState(550);

  const isMobile = useIsMobile();

  return (
    <section className="relative bg-white scroll-mt-8" id="section-6">
      <div className='relative pointer-events-none'>
        <Lines verticalClassName="left-8" sectionName="section-6" columns={[100]} rows={[100]} colorClass="bg-blue-900/10" />
      </div>
      <div className="relative container flex flex-col px-[20px] xl:px-[150px]">
        <div className='relative w-full' ref={containerRef} id="container">
          <div className="absolute inset-0 w-full z-30">
            <Resizable
              className={cn("border-blue-900/10 border-r z-50 ")}
              size={{ width: resizableWidth, height: '100%' }}
              onResize={(e, direction, ref, d) => {
                setResizableCurrentWidth(resizableWidth + d.width);
              }}
              onResizeStop={(e, direction, ref, d) => {
                setResizableWidth(resizableWidth + d.width);
              }}
              maxWidth={isMobile ? (containerWidth || 1000) - 90 : (containerWidth || 1000) - 200}
              minWidth={isMobile ? 90 : 200}
              handleComponent={{
                right: <ResizeButton />,
              }}
            >
              <div className='h-full w-full overflow-hidden'>
                <div
                  className=''
                  style={{ width: containerWidth }}
                >
                  <video autoPlay loop muted playsInline className='xl:h-[550px] w-full'>
                    <source src='/videos/wind_speed_global_100km.webm' type='video/mp4' />
                  </video>
                </div>
                <div className={cn("max-w-[378px] flex-col gap-4 hidden xl:inline-flex transition-opacity duration-500 pt-10 text-green-700 xl:pb-[120px]",
                  {
                    'opacity-0': resizableCurrentWidth < 400,
                  }
                )}>
                  {renderText1}
                </div>
              </div>
            </Resizable>
          </div>

          {/* Right video */}
          <div className='h-full w-full relative'>
            <video autoPlay loop muted playsInline className='h-full w-full object-cover'>
              <source src='/videos/wind_speed_global_10km.webm' type='video/mp4' />
            </video>
            <div className={cn("max-w-[378px] flex-col gap-4 hidden xl:inline-flex transition-opacity duration-500 pt-10 text-green-700 xl:pb-[120px]",
              {
                'opacity-0': resizableCurrentWidth > ((containerWidth || 800) - 400),
              })}
              style={{
                transform: `translateX(${resizableCurrentWidth}px)`
              }}>
              {renderText2}
            </div>
          </div>
        </div>
        {renderLegend}
        <div className="xl:hidden pt-10 text-green-700 flex flex-col gap-4 pb-10">
          {renderText1}
          {renderText2}
        </div>
      </div >
    </section >);
};