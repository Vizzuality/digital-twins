import { useTexture, useVideoTexture } from "@react-three/drei";
import { Suspense, useRef } from "react";
import { Mesh } from "three";
import { useFrame } from '@react-three/fiber';

function VideoMaterial({ url }: { url: string }) {
  const texture = useVideoTexture(url)
  return <meshStandardMaterial map={texture} toneMapped={false} />
}

function FallbackMaterial({ url }: { url: string }) {
  const texture = useTexture(url)
  return <meshStandardMaterial map={texture} toneMapped={false} />
}

export const Globe = ({ rotate = false, videoMaterial }: {
  rotate?: boolean;
  videoMaterial: string;
}) => {
  const sphereMeshRef = useRef<Mesh>(null!);

  useFrame(() => {
    if (rotate && sphereMeshRef.current) {
      sphereMeshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh
      ref={sphereMeshRef}
      position={[0, 0, 0]}
    >
      <sphereGeometry args={[1, 64, 64]} />
      <Suspense fallback={<FallbackMaterial url="10.jpg" />}>
        <VideoMaterial url={videoMaterial} />
      </Suspense>
    </mesh>
  )
}