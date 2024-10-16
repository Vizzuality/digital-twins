import { useTexture, useVideoTexture } from "@react-three/drei";
import { Suspense } from "react";


function VideoMaterial({ url }: { url: string }) {
  const texture = useVideoTexture(url)
  return <meshStandardMaterial map={texture} toneMapped={false} />
}

function FallbackMaterial({ url }: { url: string }) {
  const texture = useTexture(url)
  return <meshStandardMaterial map={texture} toneMapped={false} />
}

export const Globe = ({ videoMaterial }: {
  videoMaterial: string;
}) => {

  return (
    <mesh
      position={[0, 0, 0]}
    >
      <sphereGeometry args={[1, 64, 64]} />
      <Suspense fallback={<FallbackMaterial url="10.jpg" />}>
        <VideoMaterial url={videoMaterial} />
      </Suspense>
    </mesh>
  )
}