import { useMemo } from 'react';
import { Globe } from './globe';
import Marker from './marker';
import { useFrame } from '@react-three/fiber';
import type { markers as MarkerType } from './data';
import { Group } from 'three';
import { BACKGROUND_VIDEOS } from './data';

const GlobeGroup = ({ hasMarkers, markers, selectedMarker, setEnabled, setSelectedMarker, rotate, videoMaterial, groupRef }:
  {
    hasMarkers: boolean,
    markers: typeof MarkerType,
    selectedMarker: number | null,
    setEnabled: (enabled: boolean) => void,
    setSelectedMarker: (index: number | null) => void,
    rotate: boolean,
    videoMaterial?: string,
    groupRef: React.MutableRefObject<Group>
  }
) => {

  const markerBackgroundVideoMaterial = useMemo(() => {
    if (!hasMarkers || selectedMarker === null) return null;
    return BACKGROUND_VIDEOS[selectedMarker || 0];
  }, [selectedMarker, hasMarkers]);

  useFrame(() => {
    if (rotate && groupRef.current) {
      groupRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group position={[0, 0, 0]} ref={groupRef}>
      <Globe videoMaterial={markerBackgroundVideoMaterial || videoMaterial} />
      {
        hasMarkers && markers.map((marker, index) => (
          <Marker
            key={index}
            index={markers.indexOf(marker)}
            id={marker.id}
            isSelected={selectedMarker === markers.indexOf(marker)}
            setSelectedMarker={setSelectedMarker}
            lat={marker.lat}
            lng={marker.lng}
            setControlsEnabled={setEnabled}
          >
            {index === 0 && 'Click to explore the phenomenon'}
          </Marker>
        ))
      }
    </group >
  );
}
export default GlobeGroup;