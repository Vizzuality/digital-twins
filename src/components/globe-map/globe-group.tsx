import { useFrame } from "@react-three/fiber";
import { Group } from "three";

import type { markers as MarkerType } from "./data";
import { Globe } from "./globe";
import Marker from "./marker";

const GlobeGroup = ({
  hasMarkers,
  markers,
  selectedMarker,
  setEnabled,
  setSelectedMarker,
  rotate,
  videoMaterial,
  groupRef,
  sync,
  isInView,
}: {
  hasMarkers: boolean;
  markers: typeof MarkerType;
  selectedMarker: number | null;
  setEnabled: (enabled: boolean) => void;
  setSelectedMarker: (index: number | null) => void;
  rotate: boolean;
  videoMaterial?: string;
  groupRef: React.MutableRefObject<Group>;
  sync?: boolean;
  isInView: boolean;
}) => {
  useFrame(() => {
    if (rotate && groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group position={[0, 0, 0]} ref={groupRef}>
      <Globe inView={isInView} videoMaterial={videoMaterial} sync={sync} />
      {hasMarkers &&
        markers.map((marker, index) => (
          <Marker
            key={`globe-marker-${index}`}
            index={markers.indexOf(marker)}
            isSelected={selectedMarker === markers.indexOf(marker)}
            setSelectedMarker={setSelectedMarker}
            lat={marker.lat}
            lng={marker.lng}
            setControlsEnabled={setEnabled}
          >
            {index === 0 && "Click to explore the phenomenon"}
          </Marker>
        ))}
    </group>
  );
};
export default GlobeGroup;
