import { Group, Vector3 } from 'three'
import { useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { convertLatLonToVec3 } from "@/lib/globe-utils";
import ArrowRight from '@/svgs/arrow-right.svg';
import Close from '@/svgs/close.svg';
import { popupContent } from './data';
import { motion } from 'framer-motion';

const Popup = ({ closePopup, setSelectedMarker, index }: {
  closePopup: () => void
  setSelectedMarker: (index: number) => void
  index: number,
}) => {
  const { title, subtitle, description, video, legend } = popupContent[index];

  return (
    <div className="relative -mt-[140px] -ml-[140px] flex justify-center">
      <div className='w-[662px] h-[350px] pl-8 pr-4 py-8 bg-white/20 backdrop-blur-[15px] text-white gap-6 inline-flex'>
        <div className="gap-6 flex">
          <div className="min-w-[286px] w-[286px] h-[286px] justify-center items-center flex">
            <video className="w-[280px] h-[280px] rounded-[50px]" autoPlay loop muted>
              <source src={video} type="video/mp4" />
            </video>
          </div>
          <div className="flex-col gap-4 flex">
            <div className="flex-col justify-start items-start gap-2 inline-flex">
              <div className='flex justify-between w-full'><div className="text-base leading-relaxed">{title}</div>
                <div className="rounded-sm items-center gap-0.5 flex">
                  <button onClick={() => setSelectedMarker(index - 1 < 0 ? (popupContent.length - 1) : index - 1)}>
                    <div className='sr-only'>Previous marker</div>
                    <ArrowRight className="w-5 h-5 p-[2px] -rotate-180" />
                  </button>
                  <button onClick={() => setSelectedMarker(index + 1 > popupContent.length - 1 ? 0 : index + 1)}>
                    <div className='sr-only'>Next marker</div>
                    <ArrowRight className="w-5 h-5 p-[2px]" />
                  </button>
                </div>
              </div>
              <div className="text-xl uppercase">{subtitle}</div>
              <div className="w-[258px] flex flex-col gap-1">
                <div className="flex justify-between w-full gap-1">
                  <div className="text-[10px] leading-3">LOW ({legend.low})</div>
                  <div className="text-[10px] leading-3">HIGH ({legend.high})</div>
                </div>
                <img src={legend.image} alt="Amazon legend" className="h-3" />
              </div>
            </div>
            <div className="text-sm  h-[160px] overflow-auto leading-tight">
              {description}
            </div>
          </div>
        </div>
      </div>
      <button onClick={closePopup} className="absolute -top-4 p-[9px] bg-light-green rounded-full items-center gap-[7px] flex">
        <Close
          width={14}
          height={14}
        />
      </button>
    </div>
  );
}

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