import { Suspense } from "react";

import GlobeShaderMaterial from "./materials/globe-shader-material";
import VideoMaterial from "./materials/video-material";

export const Globe = ({ videoMaterial, syncId }: { videoMaterial?: string; syncId?: string }) => {
  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[1, 64, 64]} />
      <Suspense fallback={null}>
        {videoMaterial ? (
          <VideoMaterial url={videoMaterial} syncId={syncId} />
        ) : (
          <GlobeShaderMaterial url="images/coastline.png" />
        )}
      </Suspense>
    </mesh>
  );
};
