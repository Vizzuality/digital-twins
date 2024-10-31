'use client';
import { useRef } from "react";
import dynamic from 'next/dynamic';
const Lines = dynamic(() => import('@/components/lines'), { ssr: false });
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useScreenWidthWithResize, useContainerWidthWithResize } from "@/lib/hooks";
import { Resizable } from "re-resizable";
import { Button } from "@/components/button";
import CaretRight from "@/svgs/caret-right.svg";
import Image from "next/image";

const ResizeButton = () => (
  <>
    <Button
      className={cn(
        "z-50 absolute top-[60%] -left-[130px] xl:-left-[103px] py-[14px] px-[18px] bg-white text-green-700 border-0"
      )}
    >
      <div className="text-center text-2xs xl:text-sm text-green-700 uppercase">Sim. 01</div>
      <CaretRight className="h-4 w-4 rotate-180" />
      <div className='bg-green-800/10 w-px h-6'></div>
      <CaretRight className="h-4 w-4" />
      <div className="text-center text-2xs xl:text-sm text-green-700 uppercase">Sim. 02</div>
    </Button>
  </>
);

export default function Section6() {
  const containerRef = useRef<HTMLDivElement>(null);
  const containerWidth = useContainerWidthWithResize(containerRef);

  const [resizableWidth, setResizableWidth] = useState(550);
  const [resizableCurrentWidth, setResizableCurrentWidth] = useState(550);
  const legend = <div className="absolute -top-14 right-[152px] w-[258px] h-8 py-1 flex-col gap-1 inline-flex text-2xs">
    <div className="self-stretch justify-between items-start inline-flex">
      <div>LOW (XXº)</div>
      <div>HIGH (XXº)</div>
    </div>
    <Image alt="legend" src="/images/home-legend-3.svg" width={378} height={100} />
  </div>;
  return (
    <section className="relative bg-white scroll-mt-8" id="section-6">
      <div className='relative pointer-events-none'>
        <Lines verticalClassName="left-8" sectionName="section-6" columns={[100]} rows={[100]} colorClass="bg-blue-900/10" />
      </div>
      <div className="relative container xl:px-[150px]">
        {legend}
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
              maxWidth={(containerWidth || 1000) - 200}
              minWidth="200"
              handleComponent={{
                right: <ResizeButton />,
              }}
            >
              <div className='h-full w-full overflow-hidden'>
                <div
                  className=''
                  style={{ width: containerWidth }}
                >
                  <video autoPlay loop muted playsInline className='h-[550px] w-full'>
                    <source src='/videos/wind_speed_global_100km.mp4' type='video/mp4' />
                  </video>
                </div>
                <div className={cn("max-w-[378px] flex-col gap-4 inline-flex transition-opacity duration-500 pt-10 text-green-700 xl:pb-[120px]",
                  {
                    'opacity-0': resizableCurrentWidth < 400,
                  }
                )}>
                  <div>
                    <div className="text-base">SIM. 01</div>
                    <div className="text-xl">Present-day</div>
                  </div>
                  <div className="text-xs leading-[16px]">In the case of the 2018 heatwave, maximum temperatures were well captured in valley and mountain ridges such as the Pyrinees, while some differences in maximum temperature remained along the Portuguese western coast.</div>
                </div>
              </div>
            </Resizable>
          </div>

          {/* Right video */}
          <div className='h-full w-full relative'>
            <video autoPlay loop muted playsInline className='h-full w-full object-cover'>
              <source src='/videos/wind_speed_global_10km.webm' type='video/mp4' />
            </video>
            <div className={cn("max-w-[378px] flex-col gap-4 inline-flex transition-opacity duration-500 pt-10 text-green-700 xl:pb-[120px]",
              {
                'opacity-0': resizableCurrentWidth > ((containerWidth || 800) - 400),
              })}
              style={{
                transform: `translateX(${resizableCurrentWidth}px)`
              }}>
              <div>
                <div className="text-base">SIM. 02</div>
                <div className="text-xl">Present-day</div>
              </div>
              <div className="text-xs leading-[16px]">In the case of the 2018 heatwave, maximum temperatures were well captured in valley and mountain ridges such as the Pyrinees, while some differences in maximum temperature remained along the Portuguese western coast.</div>
            </div>
          </div>
        </div >
      </div >
    </section >);
};