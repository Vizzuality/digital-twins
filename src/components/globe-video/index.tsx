'use client';
import { useScroll, useMotionValueEvent, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function GlobeVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [interactionVisible, setInteractionVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const [goToEnd, setGoToEnd] = useState(false);

  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const direction: 'down' | 'up' = latest > lastScrollY ? "down" : "up";
    if (videoRef?.current?.readyState) {
      if (!goToEnd && direction === "down" && latest > 0.95) {
        setGoToEnd(true);
      } else if (goToEnd && (direction === "down" && latest < 0.95) || direction === "up") {
        setGoToEnd(false);
      }

      if (!goToEnd && videoRef.current.paused) {
        videoRef.current.play();
      }
    }
    setLastScrollY(latest);
  })



  useEffect(() => {
    const handleTimeUpdate = () => {
      if (videoRef.current === null || typeof videoRef.current === undefined) return;

      const remainingTime = videoRef.current.duration - videoRef.current.currentTime;
      if (goToEnd) {
        // Max speed playback
        videoRef.current.playbackRate = 16;
        if (remainingTime > 8) {
          // Use video jumps to get close to the end o the video
          videoRef.current!.currentTime = videoRef.current!.currentTime + (remainingTime / 20);
        } else if (remainingTime === 0) {
          // End of video
          videoRef.current.pause();
          setInteractionVisible(true);
          videoRef.current.playbackRate = 1;
          setGoToEnd(false);
        }
      } else {
        // Normal playback
        videoRef.current.playbackRate = 1;
        setInteractionVisible(false);
      }
    };

    const currentVideo = videoRef.current;
    if (currentVideo) {
      currentVideo.addEventListener("timeupdate", handleTimeUpdate);
    }

    return () => {
      if (currentVideo) {
        currentVideo.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, [goToEnd]);

  return (
    <>
      <video
        ref={videoRef}
        muted
        playsInline
        preload="true"
        src="https://cdn.pixabay.com/video/2015/11/26/1393-147055573_small.mp4"
      ></video>
      {interactionVisible && <motion.div
        className="absolute h-full w-full z-50 inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <span className="absolute top-[46%] left-[45%] h-3 w-3 rounded-full bg-yellow-500 hover:scale-150"></span>
      </motion.div>}
    </>
  );
}
