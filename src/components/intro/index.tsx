'use client';

import { useRef, SyntheticEvent } from 'react';
import { MotionButton, Button } from '@/components/button';
import VerticalCarousel from '@/components/vertical-carousel';
import BouncingMarquee from '@/components/bouncing-marquee';
import HoverRepeatAnimation from '@/components/animations/hover-repeat';
import Link from 'next/link';
import ArrowRightIcon from '@/svgs/arrow-right.svg';

export default function Intro() {
  const vidRef = useRef<HTMLVideoElement>(null);
  const handleProgress = (e: SyntheticEvent<HTMLVideoElement>) => {
    const videoTarget = e.target as HTMLVideoElement;

    if (isNaN(videoTarget.duration)) return;
    if (videoTarget.currentTime >= videoTarget.duration - 2.1) {
      // Fade out the video
      if (!vidRef.current) return;
      vidRef.current.style.opacity = '0';
    }
    if (videoTarget.currentTime >= videoTarget.duration - 0.1) {
      // Start the video again
      if (!vidRef.current) return;
      vidRef.current.currentTime = 0;
      vidRef.current.play();
      vidRef.current.style.opacity = '0.5';
    }
  };

  return (<section className="relative h-screen bg-blue-900 pt-[90px]">
    <video autoPlay muted playsInline ref={vidRef} onTimeUpdate={handleProgress} className="absolute bottom-0 w-full object-cover mix-blend-screen z-0 opacity-50 transition-opacity duration-2000 ease-in-out">
      <source src="/videos/hero.webm" type="video/mp4" />
    </video>
    <div className='relative'>
      <h1>
        <div className="text-light-green text-5xl font-semibold">Digital Twins: </div>
        <div className="text-white text-5xl font-semibold">Innovative Research for a Sustainable Future</div>
      </h1>
      <VerticalCarousel className="text-white text-3xl">
        <div>
          Bridging data and discovery with state-of-the-art digital twin technology
        </div>
        <div>
          Advancing climate knowledge through digital twins
        </div>
        <div>
          Harnessing advanced simulations to adapt to and mitigate climate impacts
        </div>
      </VerticalCarousel>
      <Button variant="white" className='z-10 group'>
        <Link href="#">View use cases</Link>
        <ArrowRightIcon className="w-5 h-5 group-hover:text-blue-900 text-white transform group-hover:translate-x-0.5 transition-transform" />
      </Button>
      <MotionButton variant="secondary"
        initial="rest"
        whileHover="hover"
        animate="rest"
        className='z-10'
      >
        <HoverRepeatAnimation isChild>
          <Link href="#">Keep exploring</Link>
        </HoverRepeatAnimation>
      </MotionButton>
    </div>
    <BouncingMarquee className="w-full text-light-green text-xl gap-12 border-t border-light-green py-4 absolute bottom-0">
      <div>Bridging data and discovery with state-of-the-art digital twin technology</div>
      <div>Advancing climate knowledge through digital twins</div>
      <div>Harnessing advanced simulations to adapt to and mitigate climate impacts</div>
    </BouncingMarquee>
  </section>);
};