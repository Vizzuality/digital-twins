import { useRef, SyntheticEvent } from 'react';

const HeroVideo = () => {
  const vidRef = useRef<HTMLVideoElement>(null);
  const handleProgress = (e: SyntheticEvent<HTMLVideoElement>) => {
    const videoTarget = e.target as HTMLVideoElement;

    if (isNaN(videoTarget.duration)) return;
    if (videoTarget.currentTime >= videoTarget.duration - 2.1) {
      // Fade out the video
      if (!vidRef.current) return;
      vidRef.current.style.opacity = '0';
    }
    if (videoTarget.currentTime >= videoTarget.duration - 1) {
      // Start the video again
      if (!vidRef.current) return;
      vidRef.current.currentTime = 1;
      vidRef.current.play();
      vidRef.current.style.opacity = '0.5';
    }
  };

  return (
    <video autoPlay muted playsInline ref={vidRef} onTimeUpdate={handleProgress} className="absolute bottom-0 w-full object-cover mix-blend-screen z-0 opacity-50 transition-opacity duration-2000 ease-in-out">
      <source src="/videos/hero.webm" type="video/mp4" />
    </video>

  );
}

export default HeroVideo;