import { useState, useRef } from "react";

import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import { Group, Vector3 } from "three";

import { convertLatLonToVec3 } from "@/lib/globe-utils";

import Popup from "./popup";

function Marker({
  index,
  lat,
  lng,
  children,
  setSelectedMarker,
  setControlsEnabled,
  isSelected,
  ...props
}: {
  index: number;
  lat: number;
  lng: number;
  setControlsEnabled: (enabled: boolean) => void;
  setSelectedMarker: (index: number | null) => void;
  isSelected: boolean;
  children: React.ReactNode;
}) {
  const ref = useRef<Group>(null);
  // This holds the local occluded state
  const [isOccluded, setOccluded] = useState<boolean>();
  const [isInRange, setInRange] = useState<boolean>();
  const isVisible = isInRange && !isOccluded;
  // Test distance
  const vec = new Vector3();
  useFrame((state) => {
    if (!ref.current) return;
    const range = state.camera.position.distanceTo(ref.current.getWorldPosition(vec)) <= 10;
    if (range !== isInRange) setInRange(range);
  });

  const closePopup = () => {
    setControlsEnabled(true);
    setSelectedMarker(null);
  };

  return (
    <group ref={ref}>
      <Html
        position={convertLatLonToVec3(lat, lng, 1)}
        // Hide contents "behind" other meshes
        occlude
        // Tells us when contents are occluded (or not)
        onOcclude={setOccluded}
        // We just interpolate the visible state into css opacity and transforms
        style={{
          transition: "all 0.1s",
          opacity: isVisible ? 1 : 0,
          transform: `scale(${isVisible ? 1 : 0.1})`,
        }}
        {...props}
      >
        {isSelected ? (
          <Popup closePopup={closePopup} setSelectedMarker={setSelectedMarker} index={index} />
        ) : (
          <>
            <button
              type="button"
              className="group relative flex h-12 w-12 -translate-x-6 -translate-y-6 items-center justify-center"
              onClick={() => setSelectedMarker(index)}
            >
              <motion.div
                className="h-12 w-12 rounded-full outline outline-light-green/30"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1] }}
                transition={{
                  duration: 0.5,
                  times: [0, 1],
                  repeat: Infinity,
                  delay: 1,
                  repeatDelay: 1,
                }}
              >
                <motion.div
                  className="h-full w-full rounded-full bg-light-green/30"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 0.5, repeat: Infinity, delay: 1, repeatDelay: 1 }}
                ></motion.div>
              </motion.div>
              <div className="absolute inset-0 flex h-full w-full items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-light-green group-hover:bg-white"></div>
              </div>
            </button>
            {!!children && (
              <button
                type="button"
                onClick={() => setSelectedMarker(index)}
                className="-ml-[78.5px] w-[157px] bg-gray-500/30 p-2 text-center text-white backdrop-blur-[15px]"
              >
                {children}
              </button>
            )}
          </>
        )}
      </Html>
    </group>
  );
}

export type MarkerType = {
  id: string;
  lat: number;
  lng: number;
};

export default Marker;
