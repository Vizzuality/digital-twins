// import { useEffect, useMemo } from "react";

import { useVideoTexture } from "@react-three/drei";
import { NearestFilter } from "three";

// import { useVideoSync } from "../video-sync-context";

function VideoMaterial({ url }: { url: string; syncId?: string }) {
  // NOTE: the sync video feature was removed due to bugs generated in Safari and iOS devices
  // const videoSyncContext = useVideoSync(syncId);

  // If it's an iphone using safari, the loadeddata event is not triggered, so we need to autoplay the videos
  // const autoplay = useMemo(() => {
  //   return typeof window !== "undefined" && /iphone.*safari/i.test(navigator?.userAgent);
  // }, []);

  const texture = useVideoTexture(url, {
    playsInline: true,
    autoplay: false,
    // muted: true,
    // Start videos paused to sync them. Only autoplay if it's an iphone using safari
    start: false,
  });

  texture.minFilter = NearestFilter;
  texture.magFilter = NearestFilter;

  // useEffect(() => {
  //   const currentVideoRef = texture.source.data;
  //   if (currentVideoRef) {
  //     if (syncId && videoSyncContext) {
  //       const { registerVideo, unregisterVideo, playAll, areAllVideosLoaded } = videoSyncContext;

  //       registerVideo(url, currentVideoRef);
  //       const handleLoadedData = () => {
  //         if (areAllVideosLoaded()) {
  //           playAll();
  //         }
  //       };

  //       currentVideoRef.addEventListener("loadeddata", handleLoadedData);

  //       return () => {
  //         unregisterVideo(url);
  //         currentVideoRef.removeEventListener("loadeddata", handleLoadedData);
  //       };
  //     } else {
  //       // Handle video independently if not using sync
  //       const handleLoadedData = () => {
  //         currentVideoRef.play();
  //       };

  //       currentVideoRef.addEventListener("loadeddata", handleLoadedData);

  //       return () => {
  //         currentVideoRef.removeEventListener("loadeddata", handleLoadedData);
  //       };
  //     }
  //   }
  // }, [url, syncId, videoSyncContext, texture]);

  return <meshBasicMaterial map={texture} toneMapped={false} />;
}

export default VideoMaterial;
