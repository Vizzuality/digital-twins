import { useEffect, useRef, useState } from "react";

import Image from "next/image";

import { Resizable } from "re-resizable";

import { useContainerWidthWithResize } from "@/lib/hooks";
import { cn } from "@/lib/utils";

import { Button } from "@/components/button";
import VideoPlayer from "@/components/video-player";

import CaretRight from "@/svgs/caret-right.svg";

const ImageSlider = ({
  legend,
  image1,
  image2,
  alt1,
  alt2,
  video1,
  video2,
  sliderHeightClass,
  className,
  resizeButtonClassName,
  initialPosition = 550,
}: {
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

  // Place the resizable bar in the middle of the container once we know the container width
  useEffect(() => {
    setResizableWidth(containerWidth / 2);
  }, [containerWidth]);

  const ResizeButton = () => (
    <>
      <Button
        className={cn(
          "absolute -left-[53px] z-50 h-[25px] border-0 bg-white px-[7px] py-[5px] text-green-700 max-xl:gap-1 xl:-left-[103px] xl:h-fit xl:px-[18px] xl:py-[14px]",
          resizeButtonClassName,
        )}
      >
        <div className="text-center text-2xs uppercase text-green-700 xl:text-sm">Sim. 01</div>
        <CaretRight className="h-2.5 w-2.5 rotate-180 xl:h-4 xl:w-4" />
        <div className="h-6 w-px bg-green-800/10"></div>
        <CaretRight className="h-2.5 w-2.5 xl:h-4 xl:w-4" />
        <div className="text-center text-2xs uppercase text-green-700 xl:text-sm">Sim. 02</div>
      </Button>
    </>
  );

  return (
    <div className={cn("relative flex flex-col overflow-hidden", className)}>
      <div className="relative w-full overflow-hidden" ref={containerRef} id="container">
        <div className="absolute inset-0 z-30 w-full">
          <Resizable
            className={cn("z-50 border-r border-blue-900/10")}
            size={{ width: resizableWidth, height: "100%" }}
            onResizeStop={(e, direction, ref, d) => {
              setResizableWidth(resizableWidth + d.width);
            }}
            maxWidth={containerWidth || 1000}
            minWidth={0}
            handleComponent={{
              right: ResizeButton ? <ResizeButton /> : undefined,
            }}
          >
            <div className="h-full w-full overflow-hidden">
              {/* Left video or image */}
              <div className={sliderHeightClass} style={{ width: containerWidth }}>
                {video1 && <VideoPlayer src={video1} className={cn("w-full", sliderHeightClass)} />}
                {image1 && (
                  <Image
                    alt={alt1 || ""}
                    src={image1}
                    className={cn("w-full", sliderHeightClass)}
                    height={440}
                    width={1160}
                  />
                )}
              </div>
            </div>
          </Resizable>
        </div>

        {/* Right video or image */}
        <div className="relative h-full w-full">
          {video2 && (
            <VideoPlayer
              src={video2}
              className={cn("object-fit h-full w-full", sliderHeightClass)}
            />
          )}
          {image2 && (
            <Image
              alt={alt2 || ""}
              src={image2}
              className={cn("w-full", sliderHeightClass)}
              height={440}
              width={1160}
            />
          )}
        </div>
      </div>
      {legend}
    </div>
  );
};

export default ImageSlider;
