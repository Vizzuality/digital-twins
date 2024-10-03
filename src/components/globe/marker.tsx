import { Group, Vector3 } from 'three'
import { useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { convertLatLonToVec3 } from "@/lib/globe-utils";

function Marker({ id, lat, lng, children, setSelectedMarker, ...props }: {
  id: string
  lat: number
  lng: number
  setSelectedMarker: (id: string) => void,
  children: React.ReactNode
}) {
  const ref = useRef<Group>(null)
  // This holds the local occluded state
  const [isOccluded, setOccluded] = useState<boolean>()
  const [isInRange, setInRange] = useState<boolean>()
  const isVisible = isInRange && !isOccluded
  // Test distance
  const vec = new Vector3()
  useFrame((state) => {
    if (!ref.current) return
    const range = state.camera.position.distanceTo(ref.current.getWorldPosition(vec)) <= 10
    if (range !== isInRange) setInRange(range)
  })
  return (
    <group ref={ref} >
      <Html
        position={convertLatLonToVec3(lat, lng, 1)}
        // Hide contents "behind" other meshes
        occlude
        // Tells us when contents are occluded (or not)
        onOcclude={setOccluded}
        // We just interpolate the visible state into css opacity and transforms
        style={{ transition: 'all 0.1s', opacity: isVisible ? 1 : 0, transform: `scale(${isVisible ? 1 : 0.1})` }}
        {...props}>
        <div className='bg-yellow-500 rounded-full h-3 w-3 hover:bg-white cursor-pointer'
          onClick={() => setSelectedMarker(id)}
        ></div>
        {!!children && <div className='mt-6 w-[200px] -ml-[100px]  text-white text-lg text-center bg-gray-500/30 p-2'>{children}</div>}
      </Html>
    </group>
  )
}

export type MarkerType = {
  id: string
  lat: number
  lng: number
};

export default Marker;