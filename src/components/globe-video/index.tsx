'use client';
import { useScroll, useMotionValueEvent } from "framer-motion";
import { useEffect, useRef } from "react";

export default function GlobeVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    if (!videoRef?.current) return;
    videoRef.current.pause();
  }, [videoRef]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (videoRef?.current?.readyState) {
      videoRef.current.currentTime = videoRef.current.duration * latest;
    }
  })


  return (
    <>
      <video
        ref={videoRef}
        muted
        playsInline
        preload="true"
        src="https://cdn.pixabay.com/video/2015/11/26/1393-147055573_small.mp4"
      ></video>
      <div className="absolute h-full w-full z-50 inset-0">
        <span className="absolute top-[46%] left-[45%] h-3 w-3 rounded-full bg-yellow-500 hover:scale-150"></span>
      </div>
    </>
  );
}
