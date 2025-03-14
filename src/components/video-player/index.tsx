import { useEffect, useRef, SyntheticEvent } from "react";

import { useInView } from "framer-motion";
import videojs from "video.js";
import "video.js/dist/video-js.css";

export const VideoPlayer = ({
  src,
  className,
  videoClassName,
  onTimeUpdate,
  fluid = true,
}: {
  src: string;
  className?: string;
  onTimeUpdate?: (e: SyntheticEvent<HTMLVideoElement>) => void;
  videoClassName?: string;
  fluid?: boolean;
}) => {
  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<typeof videojs.players | null>(null);
  const isInView = useInView(videoRef, {
    margin: "200% 0px 50% 0px",
    once: true,
  });

  useEffect(() => {
    if (videoRef.current && !playerRef.current && isInView) {
      const videoElement = document.createElement("video-js");

      videoRef.current.appendChild(videoElement);
      const player = (playerRef.current = videojs(videoElement, {
        autoplay: "muted",
        responsive: true,
        playsinline: true,
        fluid,
        preload: "metadata",
        muted: true,
        loop: true,
        html5: {
          hls: {
            enableLowInitialPlaylist: true,
            maxBufferLength: 30, // Maximum buffer length in seconds
            maxMaxBufferLength: 60, // Maximum buffer size
            backBufferLength: 10, // How much to keep in buffer behind current time
            bandwidth: 1000000, // Initial bandwidth estimate
            smoothQualityChange: true,
            handleManifestRedirects: true,
            levelLoadingTimeOut: 10000, // Timeout for loading segments
            fragLoadingTimeOut: 20000, // Timeout for loading fragments
            enableWorker: true, // Enable web worker for better performance
            startLevel: -1, // Start with lowest quality
            abrEwmaDefaultEstimate: 500000, // Conservative bandwidth estimate
          },
        },
        sources: [
          {
            src: src,
            type: "application/x-mpegURL",
          },
        ],
      }));

      // Add classes to video tag element
      // https://github.com/videojs/video.js/issues/2806#issuecomment-156575414
      const videoTagElement = videoElement.getElementsByTagName("video");
      if (videoClassName && videoTagElement) {
        const videoClassNames = videoClassName.split(" ");
        videoTagElement[0].classList.add(...videoClassNames);
      }

      player.on("error", (e: Error) => {
        console.error("Video error:", e);
      });

      player.on("timeupdate", (e: SyntheticEvent<HTMLVideoElement>) => {
        if (onTimeUpdate) {
          onTimeUpdate(e);
        }
      });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, isInView]);

  return <div data-vjs-player ref={videoRef} className={className} />;
};

export default VideoPlayer;
