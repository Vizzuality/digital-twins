import { MotionButton, Button } from '@/components/button';
import VerticalCarousel from '@/components/vertical-carousel';
import BouncingMarquee from '@/components/bouncing-marquee';
import HoverRepeatAnimation from '@/components/animations/hover-repeat';
import Link from 'next/link';
import ArrowRightIcon from '@/svgs/arrow-right.svg';

export default function Intro() {
  return (<section className="relative h-screen bg-blue-900 pt-[90px]">
    <video autoPlay loop muted playsInline className="absolute bottom-0 w-full h-[480px] object-cover mix-blend-screen z-0 opacity-50">
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