import { useRef, useEffect, useState, ReactElement } from "react";
import { cn } from "@/lib/utils";
import { useContainerWidthWithResize, useIsMobile } from "@/lib/hooks";
import { Resizable } from "re-resizable";
import Image from "next/image";
import { Button } from "@/components/button";
import CaretRight from "@/svgs/caret-right.svg";


const ImageSliderWithText = ({
  text1,
  text2,
  legend,
  image1,
  image2,
  alt1,
  alt2,
  video1,
  video2,
  sliderHeightClass,
  textClass = 'text-green-700',
  className,
  resizeButtonClassName,
  initialPosition = 500
}: {
  text1: JSX.Element;
  text2: JSX.Element;
  legend?: JSX.Element;
  image1?: string;
  image2?: string;
  alt1?: string;
  alt2?: string;
  video1?: string;
  video2?: string;
  sliderHeightClass: string;
  textClass?: string;
  className?: string;
  resizeButtonClassName?: string;
  initialPosition?: number;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const containerWidth = useContainerWidthWithResize(containerRef);
  const [resizableWidth, setResizableWidth] = useState(initialPosition);
  const [resizableCurrentWidth, setResizableCurrentWidth] = useState(initialPosition);

  const ResizeButton = () => (
    <>
      <Button
        className={cn(
          "z-50 absolute -left-[53px] xl:-left-[103px] h-[25px] xl:h-fit py-[5px] xl:py-[14px] px-[7px] xl:px-[18px] bg-white text-green-700 border-0 max-xl:gap-1",
          resizeButtonClassName
        )}
      >
        <div className="text-center text-2xs xl:text-sm text-green-700 uppercase">Sim. 01</div>
        <CaretRight className="w-2.5 h-2.5 xl:h-4 xl:w-4 rotate-180" />
        <div className='bg-green-800/10 w-px h-6'></div>
        <CaretRight className="w-2.5 h-2.5 xl:h-4 xl:w-4" />
        <div className="text-center text-2xs xl:text-sm text-green-700 uppercase">Sim. 02</div>
      </Button>
    </>
  );
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleTouchMove = (event: TouchEvent) => {
      if (event.cancelable) {
        event.preventDefault();
      }
    };

    const containerElement = containerRef.current;
    if (containerElement) {
      containerElement.addEventListener('touchmove', handleTouchMove, { passive: false });
    }

    return () => {
      if (containerElement) {
        containerElement.removeEventListener('touchmove', handleTouchMove);
      }
    };
  }, []);

  return (
    <div className={cn("relative flex flex-col overflow-hidden", className)}>
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
            maxWidth={isMobile ? (containerWidth || 1000) - 65 : (containerWidth || 1000) - 200}
            minWidth={isMobile ? 65 : 200}
            handleComponent={{
              right: ResizeButton ? <ResizeButton /> : undefined,
            }}
          >
            <div className='h-full w-full overflow-hidden'>
              {/* Left video or image */}
              <div
                className={sliderHeightClass}
                style={{ width: containerWidth }}
              >
                {video1 && <video autoPlay loop muted playsInline className={cn('w-full', sliderHeightClass)}>
                  <source src={video1} type='video/mp4' />
                </video>}
                {image1 && <Image
                  alt={alt1 || ''}
                  src={image1}
                  className={cn('w-full', sliderHeightClass)}
                  height={440}
                  width={1160}
                />}
              </div>
              <div className={cn("max-w-[378px] flex-col gap-4 hidden xl:inline-flex transition-opacity duration-500 pt-10  xl:pb-[120px]",
                textClass,
                {
                  'opacity-0': resizableCurrentWidth < 400,
                }
              )}>
                {text1}
              </div>
            </div>
          </Resizable>
        </div>

        {/* Right video or image */}
        <div className='h-full w-full relative'>
          {video2 && <video autoPlay loop muted playsInline className={cn('h-full w-full object-fit', sliderHeightClass)}>
            <source src={video2} type='video/mp4' />
          </video>}
          {image2 && <Image
            alt={alt2 || ''}
            src={image2}
            className={cn('w-full', sliderHeightClass)}
            height={440}
            width={1160}
          />}
          <div className={cn("max-w-[378px] flex-col gap-4 hidden xl:inline-flex transition-opacity duration-500 pt-10 xl:pb-[120px]", textClass,
            {
              'opacity-0': resizableCurrentWidth > ((containerWidth || 800) - 400),
            })}
            style={{
              transform: `translateX(${resizableCurrentWidth}px)`
            }}>
            {text2}
          </div>
        </div>
      </div>
      {legend}
      <div className={cn("xl:hidden pt-10 flex flex-col gap-4 pb-10", textClass)}>
        {text1}
        {text2}
      </div>
    </div>
  );
};

export default ImageSliderWithText;