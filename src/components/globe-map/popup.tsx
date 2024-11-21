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
    <div className="absolute -left-1 -top-1">
      <div className="h-0.5 w-8 bg-white"></div>
      <div className="h-8 w-0.5 bg-white"></div>
    </div>
    <div className="absolute -right-1 -top-1">
      <div className="h-0.5 w-8 bg-white"></div>
      <div className="absolute right-0 h-8 w-0.5 bg-white"></div>
    </div>
    <div className="absolute -bottom-1 -left-1">
      <div className="absolute bottom-0 h-0.5 w-8 bg-white"></div>
      <div className="bottom-0 h-8 w-0.5 bg-white"></div>
    </div>
    <div className="absolute -bottom-1 -right-1">
      <div className="h-0.5 w-8 bg-white"></div>
      <div className="absolute bottom-0 right-0 h-8 w-0.5 bg-white"></div>
    </div>
  </>
);

const Popup = ({
  closePopup,
  setSelectedMarker,
  index,
}: {
  closePopup: () => void;
  setSelectedMarker: (index: number) => void;
  index: number;
}) => {
  const { title, subtitle, description, video, legend } = popupContent[index];
  const isMobile = useIsMobile();

  const renderPopup = (
    <div
      className={cn("globe-popup flex justify-center", {
        "relative -ml-[140px] -mt-[140px] xl:-ml-[140px]": !isMobile,
        "xs:left-[calc(50%-250px)] xs:max-w-[500px] fixed top-0 z-50 h-full w-full items-center justify-center px-4 sm:left-[calc(50%-325px)] sm:max-w-[650px]":
          isMobile,
      })}
    >
      <div
        className="relative inline-flex w-fit gap-6 py-8 pl-8 pr-4 text-white xl:h-[344px] xl:w-[662px] bg-white/20 backdrop-blur-[15px]"
      >
        <div className="flex flex-col-reverse gap-6 xl:flex-row">
          <div className="flex items-center justify-center">
            <div className="relative h-full w-full">
              <Corners />
              <VideoPlayer src={video} className="h-[280px] w-[280px]" />
            </div>
          </div>
          <div className="flex flex-col gap-4">
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
              <div className="max-w-[258px] text-xl uppercase">{subtitle}</div>
              <div className="flex w-[258px] flex-col gap-1">
                <div className="flex w-full justify-between gap-1">
                  <div className="text-[10px] leading-3">LOW ({legend.low})</div>
                  {legend.center && <div className="text-[10px] leading-3">{legend.center}</div>}
                  <div className="text-[10px] leading-3">HIGH ({legend.high})</div>
                </div>
                <img src={legend.image} alt="Amazon legend" className="h-3" />
              </div>
            </div>
            <div className="h-[160px] overflow-auto text-sm leading-tight xl:w-[304px]">
              <div className="max-w-[258px]">{description}</div>
            </div>
          </div>
        </div>
        <button
          onClick={closePopup}
          className="absolute -top-4 left-[calc(50%_-_9px)] flex transform items-center gap-[7px] rounded-full bg-light-green p-[9px] transition-transform hover:rotate-45"
        >
          <Close width={14} height={14} />
        </button>
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
