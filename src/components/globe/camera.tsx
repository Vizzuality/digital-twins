import { CameraControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber"
import { useRef } from "react";

export const Camera = () => {
  const cameraControlsRef = useRef<CameraControls>(null!);

  useThree(({ controls }) => {
    if (controls) {
      cameraControlsRef.current.setPosition(0, 1, 4);
      cameraControlsRef.current.setTarget(0, 0, 0);
    }
  });

  return (
    <CameraControls
      ref={cameraControlsRef}
      makeDefault
      dollySpeed={0}
      polarRotateSpeed={0}
    />
  )
}