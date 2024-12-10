import { useEffect } from "react";

import { useVideoTexture } from "@react-three/drei";
import { NearestFilter } from "three";

import { useVideoSync } from "../video-sync-context";

function VideoMaterial({ url }: { url: string; }) {
  const { registerVideo, unregisterVideo, playAll, areAllVideosLoaded } = useVideoSync();

  const texture = useVideoTexture(url, {
    playsInline: true,
  });

  texture.minFilter = NearestFilter;
  texture.magFilter = NearestFilter;

  useEffect(() => {
    const currentVideoRef = texture.source.data;
    if (currentVideoRef) {
      registerVideo(url, currentVideoRef);
      if (!areAllVideosLoaded()) {
        // Pause the video until all videos are loaded
        currentVideoRef.pause();
      }

      const handleLoadedData = () => {
        if (areAllVideosLoaded()) {
          playAll();
        }
      };

      currentVideoRef.addEventListener("loadeddata", handleLoadedData);

      return () => {
        unregisterVideo(url);
        currentVideoRef.removeEventListener("loadeddata", handleLoadedData);
      };
    }
  }, [url, registerVideo, unregisterVideo, playAll, areAllVideosLoaded, texture]);

  return <meshBasicMaterial map={texture} toneMapped={false} />;
}

export default VideoMaterial;
