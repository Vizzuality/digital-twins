import { createPortal } from 'react-dom';
import { useIsMobile } from '@/lib/hooks';
import { cn } from "@/lib/utils";
import ArrowRight from '@/svgs/arrow-right.svg';
import Close from '@/svgs/close.svg';
import { popupContent } from './data';

const Corners = () => (
  <>
    <div className="absolute -top-1 -left-1">
      <div className="w-8 h-0.5 bg-white"></div>
      <div className="h-8 w-0.5 bg-white"></div>
    </div>
    <div className="absolute -top-1 -right-1">
      <div className="w-8 h-0.5 bg-white"></div>
      <div className="h-8 w-0.5 bg-white absolute right-0"></div>
    </div>
    <div className="absolute -bottom-1 -left-1">
      <div className="w-8 h-0.5 bg-white absolute bottom-0"></div>
      <div className="h-8 w-0.5 bg-white bottom-0"></div>
    </div>
    <div className="absolute -bottom-1 -right-1">
      <div className="w-8 h-0.5 bg-white"></div>
      <div className="h-8 w-0.5 bg-white absolute bottom-0 right-0"></div>
    </div>
  </>
);

const Popup = ({ closePopup, setSelectedMarker, index }: {
  closePopup: () => void
  setSelectedMarker: (index: number) => void
  index: number,
}) => {
  const { title, subtitle, description, video, legend } = popupContent[index];
  const isMobile = useIsMobile();

  const renderPopup = (<div className={cn(
    "flex justify-center globe-popup",
    {
      "relative -mt-[140px] -ml-[140px] xl:-ml-[140px]": !isMobile,
      "fixed top-0 xs:left-[calc(50%-250px)] sm:left-[calc(50%-325px)] z-50 px-4 w-full h-full items-center justify-center xs:max-w-[500px] sm:max-w-[650px]": isMobile
    })}>
    <div className={cn('relative w-fit xl:w-[662px] xl:h-[350px] pl-8 pr-4 py-8  backdrop-blur-[15px] text-white gap-6 inline-flex',
      {
        'bg-white/20': index !== 0,
        'bg-green-700/60': index === 0
      }
    )}>
      <div className="flex flex-col-reverse xl:flex-row gap-6">
        <div className="justify-center items-center flex">
          <div className="relative w-full h-full">
            <Corners />
            <video autoPlay loop muted className="w-[280px] h-[280px]">
              <source src={video} type="video/mp4" />
            </video>
          </div>
        </div>
        <div className="flex-col gap-4 flex">
          <div className="flex-col justify-start items-start gap-2 inline-flex">
            <div className='flex justify-between w-full'>
              <div className="text-sm xl:text-base leading-relaxed">{title}</div>
              <div className="rounded-sm items-center gap-0.5 flex">
                <button onClick={() => setSelectedMarker(index - 1 < 0 ? (popupContent.length - 1) : index - 1)}>
                  <div className='sr-only'>Previous marker</div>
                  <ArrowRight className="w-5 h-5 p-[2px] -rotate-180" />
                </button>
                <button onClick={() => setSelectedMarker(index + 1 > popupContent.length - 1 ? 0 : index + 1)}>
                  <div className='sr-only'>Next marker</div>
                  <ArrowRight className="w-5 h-5 p-[2px]" />
                </button>
              </div>
            </div>
            <div className="text-xl uppercase max-w-[258px]">{subtitle}</div>
            <div className="w-[258px] flex flex-col gap-1">
              <div className="flex justify-between w-full gap-1">
                <div className="text-[10px] leading-3">LOW ({legend.low})</div>
                <div className="text-[10px] leading-3">HIGH ({legend.high})</div>
              </div>
              <img src={legend.image} alt="Amazon legend" className="h-3" />
            </div>
          </div>
          <div className="text-sm h-[160px] overflow-auto leading-tight xl:w-[304px]">
            <div className='max-w-[258px]'>

              {description}
            </div>
          </div>
        </div>
      </div>
      <button onClick={closePopup} className="absolute left-[calc(50%_-_9px)] -top-4 p-[9px] bg-light-green rounded-full items-center gap-[7px] flex">
        <Close
          width={14}
          height={14}
        />
      </button>
    </div>
  </div>
  );

  if (isMobile) {
    const canvasContainer = document.getElementById('high-globe-container');
    if (canvasContainer) {
      return createPortal(renderPopup, canvasContainer);
    }
  }
  return renderPopup;

}

export default Popup;