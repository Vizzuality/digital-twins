import React, { createContext, useContext, useRef } from "react";

interface VideoSyncContextProps {
  registerVideo: (id: string, video: HTMLVideoElement) => void;
  unregisterVideo: (id: string) => void;
  playAll: () => void;
  areAllVideosLoaded: () => boolean;
}

const VideoSyncContext = createContext<VideoSyncContextProps | undefined>(undefined);

// Used to sync the playback of multiple globe videos. It should be a parent component of several GlobeMap components to sync the videos inside.
export const VideoSyncProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const videosRef = useRef<{ [key: string]: HTMLVideoElement }>({});

  const registerVideo = (id: string, video: HTMLVideoElement) => {
    videosRef.current[id] = video;
  };

  const unregisterVideo = (id: string) => {
    delete videosRef.current[id];
  };

  const playAll = () => {
    Object.values(videosRef.current).forEach((video) => video.play());
  };

  const areAllVideosLoaded = () => {
    if (Object.values(videosRef.current).length < 2) return false;
    return Object.values(videosRef.current).every((video) => video.readyState === 4);
  };

  return (
    <VideoSyncContext.Provider
      value={{
        registerVideo,
        unregisterVideo,
        playAll,
        areAllVideosLoaded,
      }}
    >
      {children}
    </VideoSyncContext.Provider>
  );
};

export const useVideoSync = (syncId?: string) => {
  const context = useContext(VideoSyncContext);
  if (syncId && !context) {
    throw new Error("useVideoSync must be used within a VideoSyncProvider");
  }
  return context;
};
