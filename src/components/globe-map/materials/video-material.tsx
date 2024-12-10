import { useEffect } from "react";

import { useVideoTexture } from "@react-three/drei";
import { NearestFilter } from "three";

import { useVideoSync } from "../video-sync-context";

function VideoMaterial({ url, syncId }: { url: string; syncId?: string }) {
  const videoSyncContext = useVideoSync(syncId);

  const texture = useVideoTexture(url, {
    playsInline: true,
    autoplay: false,
    // Start videos paused to sync them
    start: false,
  });

  texture.minFilter = NearestFilter;
  texture.magFilter = NearestFilter;

  useEffect(() => {
    const currentVideoRef = texture.source.data;
    if (currentVideoRef) {
      if (syncId && videoSyncContext) {
        const { registerVideo, unregisterVideo, playAll, areAllVideosLoaded } = videoSyncContext;

        registerVideo(url, currentVideoRef);
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
      } else {
        // Handle video independently if not using sync
        const handleLoadedData = () => {
          currentVideoRef.play();
        };

        currentVideoRef.addEventListener("loadeddata", handleLoadedData);

        return () => {
          currentVideoRef.removeEventListener("loadeddata", handleLoadedData);
        };
      }
    }
  }, [url, syncId, videoSyncContext, texture]);

  return <meshBasicMaterial map={texture} toneMapped={false} />;
}

export default VideoMaterial;
