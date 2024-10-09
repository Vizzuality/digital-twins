'use client';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

const Marquee = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className={cn('overflow-hidden', className)}>
      <div className="flex whitespace-nowrap">
        <div className="flex animate-marquee" ref={containerRef}>
          <div className="flex">
            {children}
          </div>
          <div className="flex">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Marquee;
