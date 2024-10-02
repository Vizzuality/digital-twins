import { useTexture, useVideoTexture } from "@react-three/drei";
import { Suspense, useRef } from "react";
import { Mesh } from "three";

function VideoMaterial({ url }: { url: string }) {
  const texture = useVideoTexture(url)
  return <meshStandardMaterial map={texture} toneMapped={false} />
}

function FallbackMaterial({ url }: { url: string }) {
  const texture = useTexture(url)
  return <meshStandardMaterial map={texture} toneMapped={false} />
}

export const Globe = () => {
  const sphereMeshRef = useRef<Mesh>(null!);

  return (
    <mesh
      ref={sphereMeshRef}
      position={[0, 0, 0]}
    // rotation={[Math.PI / 2, 0, 0, 'XYZ']}
    >
      <sphereGeometry args={[1, 64, 64]} />
      <Suspense fallback={<FallbackMaterial url="10.jpg" />}>
        <VideoMaterial url="wind_speed_global_10km.mp4" />
      </Suspense>
    </mesh>
  )
}