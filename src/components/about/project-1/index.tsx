'use client';

import dynamic from 'next/dynamic'
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ExternalLink from '@/svgs/icon-external-link.svg'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from 'next/image';
import KnowMoreButton from '@/components/know-more-button';
const Lines = dynamic(() => import('@/components/lines'), { ssr: false })

export default function Section1() {
  const [openedKnowMore, setOpenedKnowMore] = useState(false);
  return (
    <section>
      <div className="relative bg-blue-950 text-white">
        <Lines verticalClassName="left-8 w-[calc(100vh-16px)]" sectionName='project-1' columnsNumber={3} rows={[180, 600]} colorClass='bg-white/10' />
        <div className='container relative pb-[60px] py-6 xl:py-[100px] pl-8 xl:pl-24 space-y-6 xl:space-y-[60px]'>
          <h2 className='w-full flex flex-col items center xl:text-center'>
            <div className='uppercase xl:text-lg'>Project 1</div>
            <div className="text-2xl xl:text-4xl uppercase">Gloria</div>
          </h2>
          <div className="text-sm xl:text-base space-y-4 max-w-[760px]">
            <p>
              GLORIA (GLObal digital twin for RegIonal and local climate Adaptation) is a project funded by the Spanish Ministry of Science and Innovation/National Research Agency and the European Union ‘NextGenerationEU/PRTR’, running from 2022-2024. The main objective of the project is to develop a digital twin of the Earth’s climate to substantially improve the quality of climate simulations and address the pressing demands for action-oriented, credible climate information in an interactive way.
            </p>
            <p>
              To achieve this goal, three specific objectives are proposed:
            </p>
            <a
              target="_blank"
              href="https://www.bsc.es/es/research-and-development/projects/gloria-global-digital-twin-regional-and-local-climate-adaptation/project-people"
              rel='noreferrer'
              className="underline leading-relaxed flex items-center gap-1 hover:opacity-70"
            >
              <ExternalLink></ExternalLink>
              Visit GLORIA
            </a>
          </div>
          <div className="gap-6 xl:gap-[80px] flex flex-col xl:flex-row">
            <div className="flex-col gap-4 flex xl:w-1/3">
              <div className="text-2xl xl:text-6xl">01</div>
              <div className="text-base xl:text-3xl">Develop a digital twin</div>
              <div className="text-sm xl:text-base leading-relaxed">of the Earth’s climate based on the most efficient version of the global model IFS-NEMO that, as a simulation platform, satisfies the requirements of the Spanish climate research, governance and services communities.</div>
            </div>
            <div className="flex-col gap-4 flex xl:w-1/3">
              <div className="text-2xl xl:text-6xl">02</div>
              <div className="text-base xl:text-3xl">Perform global climate simulations</div>
              <div className="text-sm xl:text-base leading-relaxed">at unprecedented spatial resolution addressing some of the main systematic errors of current climate models with a simulation protocol and software infrastructure that allows an almost real-time interaction between the digital twin and the climate adaptation community.</div>
            </div>
            <div className="flex-col gap-4 flex xl:w-1/3">
              <div className="text-2xl xl:text-6xl">03</div>
              <span className="text-base xl:text-3xl">Design a user engagement approach</span>
              <div className="text-sm xl:text-base">that takes advantage of the interactivity and flexibility of the digital twin and improves the time-to-solution of the climate adaptation community to access the best climate information.</div>
            </div>
          </div>
        </div >
      </div>
      <div className="relative bg-white text-green-700">
        <Lines verticalClassName="left-8 w-[calc(100vh-16px)]" sectionName='project-1' columnsNumber={3} rows={[180, 600]} colorClass='bg-white/10' />
        <div className='container relative pb-[60px] py-6 xl:py-[100px] pl-8 xl:pl-24 space-y-6 xl:space-y-[80px]'>
          <div className="text-sm xl:text-base space-y-4 max-w-[760px]">
            <p>
              The GLORIA digital twin for regional and local adaptation will change the way in which climate information has been traditionally provided to the climate adaptation community, using a user-centered design, considering user needs, and providing an interactive data flow in an operational manner. To achieve this, key external users participate in user engagement activities around the sectoral applications.
            </p>
          </div>
          <h3 className="text-xl xl:leading-[61px] xl:text-[52px] max-w-[572px]">Sectorial applications in GLORIA</h3>
          <Tabs defaultValue="agriculture">
            <TabsList>
              <TabsTrigger value="agriculture">Agriculture</TabsTrigger>
              <TabsTrigger value="energy">Energy</TabsTrigger>
              <TabsTrigger value="insurance">Insurance</TabsTrigger>
            </TabsList>
            <TabsContent value="agriculture" className="pt-6 xl:pt-10 flex justify-between">
              <div className='relative space-y-[18px]'>
                <div className="text-xl xl:text-2xl max-w-[680px] pb-[40px]">The wine sector is an important pillar of the global economy (EU 2024), with Spain being the third largest wine producer in the world (OIV 2024). Climate variations strongly affect the year-to-year production of wine and grapes. Hence, reliable and timely information on climatic conditions will enable wineries to optimise planning and management activities over a range of timescales.</div>
                <KnowMoreButton onClick={() => setOpenedKnowMore(!openedKnowMore)} opened={openedKnowMore} />
                <AnimatePresence>
                  {openedKnowMore && <motion.div
                    key="know-more-green-transition"
                    initial={{ opacity: 0, height: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="text-sm xl:text-base space-y-4"
                  >
                    <p>
                      There are many moments during the vineyard cycle where climate plays a key role. For instance, spring is a critical season for frosts, as just one night of frost can damage the whole production. On the producer’s side, there are some management actions that can be applied to reduce damages in the short-medium term, such as late pruning to delay the bud-break (Persico et al. 2023). Wine companies may also consider paying insurance to receive compensation in the case of frost damage affecting grape production. In the longer term, wineries may consider investing in a frost prevention system or choosing grape varieties with delayed bud-break that are better adapted to climate change. Having information about the changes in the frequency and intensity of spring frosts in the future can help wineries to decide on the most suitable adaptation actions.
                    </p>
                    <p>
                      Another challenge for Spanish agriculture, especially in the Mediterranean region, are droughts, which exacerbate during the summer period. As long as there is water available in the reservoirs, wine producers with irrigation systems in place may be able to irrigate the vines. However, in the case of water restrictions, wineries have to assume a lower production or buy grapes from external farmers. A useful indicator for the monitoring of agricultural drought is the Standardised Precipitation and Evapotranspiration Index (SPEI), which assesses water availability comparing the balance between precipitation and potential evapotranspiration. Another indicator such as the average maximum temperature for the months of June-July-August is also useful to identify heat stress hotspots.
                    </p>
                  </motion.div>}
                </AnimatePresence>
              </div>
              <div className='flex max-w-[390px] flex-1 gap-4'>
                <Image
                  width={232}
                  height={88}
                  className='w-[116px] h-[44px]'
                  src="/images/about-logo-ptv.png"
                  alt="Plataforma tecnológica del vino"
                />
                <a href="https://www.ptvino.com/en/home/" target="_blank" rel="noreferrer" className="max-w-[160px] text-xs underline">
                  Spanish Wine Technological Platform
                </a>
              </div>
            </TabsContent>
            <TabsContent value="energy" className="pt-6 xl:pt-10 flex justify-between">
              <div className='relative space-y-[18px]'>
                <div className="text-xl xl:text-2xl max-w-[680px] pb-[40px]">As the need for decarbonisation of the global energy system intensifies, renewable energies have become one of the most promising assets to achieve net zero emissions. Yet, unlike their fossil fuel counterparts, renewables are more vulnerable to a changing climate and the expected increase in extreme weather events.</div>
                <KnowMoreButton onClick={() => setOpenedKnowMore(!openedKnowMore)} opened={openedKnowMore} />
                <AnimatePresence>
                  {openedKnowMore && <motion.div
                    key="know-more-green-transition"
                    initial={{ opacity: 0, height: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="text-sm xl:text-base space-y-4"
                  >
                    Wind energy is particularly exposed, emphasising the need for accurate representations of future wind resources. Such climate information will allow us to provide more reliable estimates of future energy production of current wind farms and support decision-making regarding the viability of new wind farm locations. By using the outputs of the climate models as the simulation is running, an energy company would be able to calculate meaningful indicators directly related to their activity, such as capacity factors, energy demand predictors (e.g. cooling and heating degree days) or wind speed anomalies, among others. The implementation of this streaming environment allows us to estimate user-tailored indicators in a timely manner, without the need to store the complete model output permanently. By directly simulating wind at turbine hub height and through enhanced spatial and temporal resolution, interactive and user-oriented digital twins represent a step forward in assisting near- to long-term measures against the impacts of climate change. Having prompt access to this kind of climate information would help the renewable energy sector avoid misdirected decisions and failed opportunities in terms of adaptation.
                  </motion.div>}
                </AnimatePresence>
              </div>
              <div className='flex max-w-[376px] min-w-[376px] gap-4 h-fit items-end flex-1'>
                <Image
                  width={201}
                  height={44}
                  className='w-[201px] h-[44px]'
                  src="/images/about-logo-endesa.png"
                  alt="Endesa"
                />
                <a href="https://www.endesa.com/es" target="_blank" rel="noreferrer" className="max-w-[160px] text-xs underline">
                  Endesa
                </a>
              </div>
            </TabsContent>
            <TabsContent value="insurance" className="pt-6 xl:pt-10 flex justify-between">
              <div className='relative space-y-[18px]'>
                <div className="text-xl xl:text-2xl max-w-[594px] pb-[40px]">Storm Gloria was a large extra-tropical cyclone that struck the east of Spain, Southern France, and the Balearic islands in January 2020, causing heavy coastal flooding and significant impacts.</div>
                <KnowMoreButton onClick={() => setOpenedKnowMore(!openedKnowMore)} opened={openedKnowMore} />
                <AnimatePresence>
                  {openedKnowMore && <motion.div
                    key="know-more-green-transition"
                    initial={{ opacity: 0, height: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="text-sm xl:text-base space-y-4"
                  >
                    During 18th - 24th January heavy coastal flooding occurred, due to large storm swells and record breaking precipitation. This caused significant impacts on coastline equipment, deterioration in tourist infrastructures and terrestrial and maritime communication and affectations to marine ecosystems, evidencing the vulnerability of the Mediterranean coast to large-scale atmospheric disturbances (Amores et al. 2020, Berdalet et al. 2020).The damages resulted in 14 deaths and more than 80 people injured, accumulating 71 million euros of financial damage (Consorcio de Compensacion, 2020).
                  </motion.div>}
                </AnimatePresence>
              </div>
              <div className='flex max-w-[335px] flex-1 gap-4'>
                <Image
                  width={160}
                  height={44}
                  className='w-[160px] h-[44px]'
                  src="/images/about-logo-axa.png"
                  alt="AXA XL"
                />
                <a href="https://axaxl.com/" target="_blank" rel="noreferrer" className="max-w-[160px] text-xs underline">
                  AXA XL
                </a>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};