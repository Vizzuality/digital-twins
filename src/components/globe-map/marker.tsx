import { Group, Vector3 } from 'three'
import { useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { convertLatLonToVec3 } from "@/lib/globe-utils";
import ArrowRight from '@/svgs/arrow-right.svg';
import Close from '@/svgs/close.svg';

const Popup = ({ setSelectedMarker, index }: {
  setSelectedMarker:
  (index: number | null) => void
  index: number
}) => {
  return (
    <div className="relative -mt-[140px] -ml-[140px] flex justify-center">
      <div className='h-[350px] pl-8 pr-4 py-8 bg-white/20 backdrop-blur-[15px] gap-6 inline-flex'>
        <div className="gap-6 flex">
          <div className="w-[286px] h-[286px] justify-center items-center flex">
            <video className="w-[280px] h-[280px] rounded-[50px]" autoPlay loop muted>
              <source src="/iberia_hist_scenario.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="flex-col gap-2.5 inline-flex">
            <div className="grow shrink basis-0 flex-col justify-start items-start gap-4 flex">
              <div className="justify-start items-start gap-1.5 inline-flex">
                <div className="flex-col justify-start items-start gap-2 inline-flex">
                  <div className="justify-start items-start gap-1 inline-flex">
                    <div className="flex-col justify-start items-start inline-flex">
                      <div className="w-[258px] text-white text-lg font-normal font-['Roboto'] leading-relaxed">Amazon. Brazil</div>
                      <div className="w-[258px] text-white text-2xl font-normal font-['Roboto'] uppercase">Diurnal precipitation cycle</div>
                    </div>
                    <div className="rounded-sm items-center gap-0.5 flex">
                      <button onClick={() => setSelectedMarker(index - 1)}>
                        <div className='sr-only'>Previous marker</div>
                        <ArrowRight className="w-5 h-5 p-[2px] -rotate-180 text-white" />
                      </button>
                      <button onClick={() => setSelectedMarker(index + 1)}>
                        <div className='sr-only'>Next marker</div>
                        <ArrowRight className="w-5 h-5 p-[2px] text-white" />
                      </button>
                    </div>
                  </div>
                  <div className="h-6 flex-col justify-start items-start gap-1 flex">
                    <div className="self-stretch justify-between items-start inline-flex">
                      <div className="text-white text-[10px] font-normal font-['Roboto'] leading-3">LOW (0 m³/m²)</div>
                      <div className="text-white text-[10px] font-normal font-['Roboto'] leading-3">HIGH (0.1 m³/m²)</div>
                    </div>
                    <div className="self-stretch h-[258px] origin-top-left -rotate-90 bg-gradient-to-b from-[#e4e6e4] via-[#5882a0] to-[#2a0061] rounded-[50px]" />
                  </div>
                </div>
              </div>
              <div className="self-stretch grow shrink basis-0 justify-start items-start gap-6 inline-flex">
                <div className="pr-0.5 justify-center items-center flex">
                  <div className="w-[258px] h-40 text-white text-sm font-normal font-['Roboto'] leading-tight">The diurnal precipitation cycle over the Amazon rainforest highlights the complex interactions and feedbacks between atmosphere and land. The diurnal rainfall, maintained by moisture inflow from the Atlantic ocean into the Amazon basin, arises due to evapotranspiration and moisture recycling from the dense forest. This self-sustained cycle is in turn driven by sharp contrasts in temperature between day and night.</div>
                </div>
                <div className="self-stretch px-2 justify-start items-center gap-2.5 flex">
                  <div className="w-1 pb-[37px] bg-white/20 rounded-[50px] flex-col justify-start items-center inline-flex">
                    <div className="w-1 h-[123px] bg-white rounded-[50px]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button onClick={() => setSelectedMarker(null)} className="absolute -top-4 p-[9px] bg-light-green rounded-full items-center gap-[7px] flex">
        <Close
          width={14}
          height={14}
        />
      </button>
    </div>
  );
}
function Marker({ id, index, lat, lng, children, setSelectedMarker, isSelected, ...props }: {
  id: string
  index: number
  lat: number
  lng: number
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
        {isSelected ? <Popup setSelectedMarker={setSelectedMarker} index={index} /> :
          <><div className='bg-yellow-500 rounded-full h-3 w-3 hover:bg-white cursor-pointer'
            onClick={() => setSelectedMarker(index)}
          ></div>
            {!!children && <div className='mt-6 w-[200px] -ml-[100px]  text-white text-lg text-center bg-gray-500/30 p-2'>{children}</div>}
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