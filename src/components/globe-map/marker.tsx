import { Group, Vector3 } from 'three'
import { useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { convertLatLonToVec3 } from "@/lib/globe-utils";
import { motion } from 'framer-motion';
import Popup from './popup';

function Marker({ id, index, lat, lng, children, setSelectedMarker, setControlsEnabled, isSelected, ...props }: {
  id: string
  index: number
  lat: number
  lng: number
  setControlsEnabled: (enabled: boolean) => void,
  setSelectedMarker: (index: number | null) => void,
  isSelected: boolean,
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

  const closePopup = () => {
    setControlsEnabled(true);
    setSelectedMarker(null);
  };

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
        {isSelected ? <Popup closePopup={closePopup} setSelectedMarker={setSelectedMarker} index={index} /> :
          <>
            <button
              type="button"
              className='h-12 w-12 -translate-x-6 -translate-y-6 flex items-center justify-center relative group'
              onClick={() => setSelectedMarker(index)}
            >
              <motion.div
                className='outline outline-light-green/30 rounded-full h-12 w-12'
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1] }}
                transition={{ duration: 0.5, times: [0, 1], repeat: Infinity, delay: 1, repeatDelay: 1 }}
              >
                <motion.div className='bg-light-green/30 h-full w-full rounded-full'
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 0.5, repeat: Infinity, delay: 1, repeatDelay: 1 }}
                >

                </motion.div>
              </motion.div>
              <div className='absolute inset-0 w-full h-full flex justify-center items-center'>
                <div className='bg-light-green rounded-full h-3 w-3 group-hover:bg-white'></div>
              </div>
            </button>
            {!!children && <button type="button" onClick={() => setSelectedMarker(index)} className='mt-6 w-[200px] -ml-[100px]  text-white text-lg text-center bg-gray-500/30 p-2'>
              {children}
            </button>}
          </>
        }
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