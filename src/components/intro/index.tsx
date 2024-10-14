'use client';

import { MotionButton, Button } from '@/components/button';
import VerticalCarousel from '@/components/vertical-carousel';
import Marquee from '@/components/animations/marquee';
import HoverRepeatAnimation from '@/components/animations/hover-repeat';
import Link from 'next/link';
import ArrowRightIcon from '@/svgs/arrow-right.svg';
import HeroVideo from './hero-video';
import Lines from '@/components/lines';

export default function Intro() {
  const handleAnchor = (anchor: string) => {
    const element = document.getElementById(anchor);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
  return (
    <section className="relative h-[110vh] bg-blue-900">
      <HeroVideo />
      <Lines verticalClassName="left-8 w-[calc(100vh-16px)]" sectionName='intro' columns={[64, 254, 270, 430, 1074]} rows={[204, 444, 516, 559, 598]} />
      <div className='container relative pt-[198px] space-y-[30px] pl-24'>
        <h1 className='max-w-[1012px]'>
          <div className="text-light-green text-5xl font-semibold">Digital Twins: </div>
          <div className="text-white text-5xl font-semibold">Innovative Research for a Sustainable Future</div>
        </h1>
        <VerticalCarousel className="text-white text-2xl">
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
        <div className='flex gap-4'>
          <Button variant="white" size="lg" className='z-10 group'>
            <Link href="#">View use cases</Link>
            <ArrowRightIcon className="w-5 h-5 group-hover:text-blue-900 text-white transform group-hover:translate-x-0.5 transition-transform" />
          </Button>
          <MotionButton variant="secondary"
            initial="rest"
            whileHover="hover"
            animate="rest"
            size="lg"
            className='z-10'
          >
            <HoverRepeatAnimation isChild>
              <Link href="/#section-1" onClick={() => handleAnchor('section-1')} scroll={false}>Keep exploring</Link>
            </HoverRepeatAnimation>
          </MotionButton>
        </div>
      </div>
      <Marquee className="w-full text-light-green text-xl gap-12 border-t border-light-green py-4 absolute bottom-0">
        <span className='ml-10 pl-10 border-l h-8 border-light-green' >Bridging data and discovery with state-of-the-art digital twin technology</span>
        <span className='ml-10 pl-10 border-l h-8 border-light-green' >Advancing climate knowledge through digital twins</span>
        <span className='ml-10 pl-10 border-l h-8 border-light-green' >Harnessing advanced simulations to adapt to and mitigate climate impacts</span>
      </Marquee>
    </section>);
};