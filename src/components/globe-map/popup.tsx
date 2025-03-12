/* eslint-disable @next/next/no-img-element */
import { createPortal } from "react-dom";

import { useIsMobile } from "@/lib/hooks";
import { cn } from "@/lib/utils";

import VideoPlayer from "@/components/video-player";

import ArrowRight from "@/svgs/arrow-right.svg";
import Close from "@/svgs/close.svg";

import { popupContent } from "./data";

const Corners = () => (
  <>
    <div className="absolute left-0 top-0">
      <div className="h-0.5 w-8 bg-white"></div>
      <div className="h-8 w-0.5 bg-white"></div>
    </div>
    <div className="absolute right-0 top-0">
      <div className="h-0.5 w-8 bg-white"></div>
      <div className="absolute right-0 h-8 w-0.5 bg-white"></div>
    </div>
    <div className="absolute bottom-0 left-0">
      <div className="absolute bottom-0 h-0.5 w-8 bg-white"></div>
      <div className="bottom-0 h-8 w-0.5 bg-white"></div>
    </div>
    <div className="absolute bottom-0 right-0">
      <div className="h-0.5 w-8 bg-white"></div>
      <div className="absolute bottom-0 right-0 h-8 w-0.5 bg-white"></div>
    </div>
  </>
);

const Popup = ({
  closePopup,
  setSelectedMarker,
  index,
  isFallback,
}: {
  closePopup?: () => void;
  setSelectedMarker: (index: number) => void;
  index: number;
  isFallback?: boolean;
}) => {
  const { title, subtitle, description, video, legend } = popupContent[index];
  const isMobile = useIsMobile();

  const renderPopup = (
    <div
      className={cn("globe-popup flex justify-center", {
        "relative -ml-[140px] -mt-[140px] xl:-ml-[140px]": !isMobile,
        "xs:left-[calc(50%-250px)] xs:max-w-[500px] absolute top-0 z-30 h-full w-full items-center justify-center px-5 sm:left-[calc(50%-325px)] sm:max-w-[650px] xl:fixed xl:px-4":
          isMobile,
        "pointer-events-none h-screen items-end pb-4 sm:items-center": isFallback,
      })}
    >
      <div className="pointer-events-auto relative inline-flex w-fit gap-6 bg-white/20 px-8 py-8 text-white backdrop-blur-[15px] xl:h-[344px] xl:w-[662px] xl:pr-4">
        <div className="flex max-h-[90vh] flex-col-reverse gap-6 overflow-y-auto xl:flex-row xl:overflow-y-hidden">
          <div className="flex items-center justify-center">
            <div className="x-full relative w-full xl:h-[280px] xl:w-[280px]">
              <Corners />
              <VideoPlayer src={video} className="h-full w-full p-1.5 xl:h-[280px] xl:w-[280px]" />
            </div>
          </div>
          <div className="flex max-w-[500px] flex-col gap-4">
            <div className="inline-flex flex-col items-start justify-start gap-2">
              <div className="flex w-full justify-between">
                <div className="text-sm leading-relaxed xl:text-base">{title}</div>
                <div className="flex items-center gap-0.5 rounded-sm">
                  <button
                    onClick={() =>
                      setSelectedMarker(index - 1 < 0 ? popupContent.length - 1 : index - 1)
                    }
                  >
                    <div className="sr-only">Previous marker</div>
                    <ArrowRight className="h-5 w-5 -rotate-180 p-[2px]" />
                  </button>
                  <button
                    onClick={() =>
                      setSelectedMarker(index + 1 > popupContent.length - 1 ? 0 : index + 1)
                    }
                  >
                    <div className="sr-only">Next marker</div>
                    <ArrowRight className="h-5 w-5 p-[2px]" />
                  </button>
                </div>
              </div>
              <div className="text-xl uppercase xl:max-w-[258px]">{subtitle}</div>
              <div className="flex flex-col gap-1 xl:w-[258px]">
                <div className="flex w-full justify-between gap-1">
                  <div className="text-[10px] leading-3">LOW ({legend.low})</div>
                  {legend.center && <div className="text-[10px] leading-3">{legend.center}</div>}
                  <div className="text-[10px] leading-3">HIGH ({legend.high})</div>
                </div>
                <img src={legend.image} alt="Amazon legend" className="h-3" />
              </div>
            </div>
            <div className="h-[160px] overflow-auto text-sm leading-tight xl:w-[304px]">
              <div className="xl:max-w-[258px]">{description}</div>
            </div>
          </div>
        </div>
        {!!closePopup && (
          <button
            onClick={closePopup}
            className="absolute -top-4 left-[calc(50%_-_9px)] z-50 flex h-10 w-10 transform items-center justify-center gap-[7px] rounded-full bg-light-green p-[9px] transition-transform hover:rotate-45"
          >
            <Close width={15} height={15} className="stroke-2" />
          </button>
        )}
      </div>
    </div>
  );

  if (isMobile) {
    const canvasContainer = document.getElementById("high-globe-container");
    if (canvasContainer) {
      return createPortal(renderPopup, canvasContainer);
    }
  }
  return renderPopup;
};

export default Popup;
