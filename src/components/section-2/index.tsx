'use client';
import { useRef } from 'react';
import Lines from "@/components/lines";
import Globe from "@/components/globe";

export default function Section1() {
  const scrollSectionRef = useRef<HTMLDivElement>(null);
  return (
    <section className="relative bg-green-700">
      <Lines verticalClassName="left-8" sectionName="section-1" columns={[100]} rows={[100]} colorClass="bg-blue-900/20" />
      <div className="relative h-[300vh]" ref={scrollSectionRef}>
        <div className='sticky container flex flex-col items-center justify-center h-screen inset-0 z-10'>
          <div className="text-center text-light-green text-lg uppercase tracking-tight">UNLOCKING CLIMATE POTENTIAL</div>
          <div className="text-center text-light-green text-4xl max-w-[720px]">
            High-quality information from global to local scale
          </div>
        </div>
        <div className='sticky transform -translate-y-full z-0 w-full h-screen inset-0 flex'>
          <div className='relative w-full h-full overflow-hidden'>
            <Globe className='transform w-[200%] h-full' videoMaterial="videos/wind_speed_global_10km.mp4" />
          </div>
          <div className='relative w-full h-full overflow-hidden'>
            <Globe className='transform -translate-x-1/2 w-[200%] h-full' videoMaterial="videos/wind_speed_global_100km.mp4" />
          </div>
        </div>
      </div>
    </section >);
};