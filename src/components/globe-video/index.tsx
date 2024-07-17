'use client';
import { useScroll, useMotionValueEvent, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function GlobeVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll();
  const [interactionVisible, setInteractionVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.1) {
      if (videoRef?.current?.readyState) {

        if (videoRef.current.paused) {
          videoRef.current.play();
        }
      }
    }

    if (videoRef?.current?.readyState && latest > 0.1) {
      if (!videoRef.current.paused) {
        videoRef.current.pause();
      }
      videoRef.current.currentTime = videoRef.current.duration * latest;
    }
    if (!interactionVisible && latest > 0.99) {
      setInteractionVisible(true);
    }

    if (interactionVisible && latest < 0.99) {
      setInteractionVisible(false);
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
