"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ExternalLink from "@/svgs/icon-external-link.svg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import KnowMoreButton from "@/components/know-more-button";
const Lines = dynamic(() => import("@/components/lines"), { ssr: false });
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/lib/hooks";

export default function Section1() {
  const [openedKnowMore, setOpenedKnowMore] = useState(false);
  const [openedKnowMoreInsurance, setOpenedKnowMoreInsurance] = useState(false);
  const isMobile = useIsMobile();
  const gridColumns = isMobile ? "flex flex-col gap-4" : "grid grid-cols-[274px_1fr_1fr_1px]";

  const agricultureContent = (
    <TabsContent
      value="agriculture"
      className="max-xl:divide-y-green-700/10 space-y-6 pt-6 max-xl:divide-y xl:space-y-20 xl:pt-10"
    >
      <div className="flex flex-col justify-between gap-8 xl:flex-row">
        <div className="relative space-y-[18px]">
          <div className="max-w-[680px] pb-4 text-xl xl:pb-10 xl:text-2xl">
            The wine sector is an important pillar of the global economy (EU 2024), with Spain being
            the third largest wine producer in the world (OIV 2024). Climate variations strongly
            affect the year-to-year production of wine and grapes. Hence, reliable and timely
            information on climatic conditions will enable wineries to optimise planning and
            management activities over a range of timescales.
          </div>
          <KnowMoreButton
            onClick={() => setOpenedKnowMore(!openedKnowMore)}
            opened={openedKnowMore}
          />
          <AnimatePresence>
            {openedKnowMore && (
              <motion.div
                key="know-more-green-transition"
                initial={{ opacity: 0, height: 0 }}
                exit={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="space-y-4 text-sm xl:text-base"
              >
                <p>
                  There are many moments during the vineyard cycle where climate plays a key role.
                  For instance, spring is a critical season for frosts, as just one night of frost
                  can damage the whole production. On the producer’s side, there are some management
                  actions that can be applied to reduce damages in the short-medium term, such as
                  late pruning to delay the bud-break (Persico et al. 2023). Wine companies may also
                  consider paying insurance to receive compensation in the case of frost damage
                  affecting grape production. In the longer term, wineries may consider investing in
                  a frost prevention system or choosing grape varieties with delayed bud-break that
                  are better adapted to climate change. Having information about the changes in the
                  frequency and intensity of spring frosts in the future can help wineries to decide
                  on the most suitable adaptation actions.
                </p>
                <p>
                  Another challenge for Spanish agriculture, especially in the Mediterranean region,
                  are droughts, which exacerbate during the summer period. As long as there is water
                  available in the reservoirs, wine producers with irrigation systems in place may
                  be able to irrigate the vines. However, in the case of water restrictions,
                  wineries have to assume a lower production or buy grapes from external farmers. A
                  useful indicator for the monitoring of agricultural drought is the Standardised
                  Precipitation and Evapotranspiration Index (SPEI), which assesses water
                  availability comparing the balance between precipitation and potential
                  evapotranspiration. Another indicator such as the average maximum temperature for
                  the months of June-July-August is also useful to identify heat stress hotspots.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="flex max-w-[390px] flex-1 gap-4">
          <Image
            width={232}
            height={88}
            className="h-[44px] w-[116px]"
            src="/images/about-logo-ptv.png"
            alt="Plataforma tecnológica del vino"
          />
          <a
            href="https://www.ptvino.com/en/home/"
            target="_blank"
            rel="noreferrer"
            className="max-w-[160px] text-xs underline"
          >
            Spanish Wine Technological Platform
          </a>
        </div>
      </div>
      <div className="max-xl:pt-6">
        {isMobile ? (
          <div className="w-full">
            <Image
              className="h-[213px]"
              alt=""
              src="/images/about-gloria-agriculture-1.png"
              height={426}
              width={432}
              style={{ objectFit: "cover" }}
            />
            <Image
              className="h-[213px]"
              alt=""
              src="/images/about-gloria-agriculture-2.png"
              height={426}
              width={432}
              style={{ objectFit: "cover" }}
            />
          </div>
        ) : (
          <div className={cn("mb-10 flex h-[432px] w-full overflow-hidden", gridColumns)}>
            <AnimatePresence>
              {Array(2)
                .fill(null)
                .map((_, index) => (
                  <motion.div
                    key={`image-section1-${index}`}
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    transition={{ delay: 0.5 + index, duration: 1, ease: "easeInOut" }}
                    className={cn(
                      "relative z-10 flex h-full items-center",
                      `col-start-${index + 2}`,
                    )}
                  >
                    <Image
                      alt=""
                      src={`/images/about-gloria-agriculture-${index + 1}.png`}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        )}
        <div className={cn("mt-6 grid text-green-700 xl:mt-0")}>
          <div className={cn(gridColumns)}>
            <h4 className="col-span-1 mb-4 max-w-[274px] text-lg xl:mb-0 xl:text-xl">
              Climate and geographic indicators for wine production in Spain
            </h4>
          </div>
          <div className={cn(gridColumns, "mb-2 xl:mb-[30px]")}>
            <div className="col-start-2">
              <div className="max-w-[338px] text-xs leading-tight xl:text-sm">
                <a
                  target="_blank"
                  className="underline hover:opacity-70"
                  rel="noreferrer"
                  href="https://www.mapa.gob.es/es/cartografia-y-sig/ide/descargas/alimentacion/vinos.aspx"
                >
                  Capa GIS disponible en la web del Ministerio de Agricultura, Pesca y Alimentación
                </a>
              </div>
            </div>
            <div className="col-start-3">
              <div className="max-w-[410px] text-xs xl:text-sm">
                Average maximum temperature for JJA (June-July-August) in 2020 over the Iberian
                Peninsula at a horizontal resolution of 5 km. The average was computed using daily
                temperature values. Data comes from the ICON model. Grey-shaded areas represent
                urban regions. Credit: BSC
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col max-xl:pt-6 xl:flex-row xl:gap-[140px]">
        <h2 className="pb-6 text-3xl font-medium xl:pb-16 xl:text-4xl">
          Digital Twin Technology for Climate Change Adaptation
        </h2>
        <div className="inline-flex flex-col gap-8 xl:max-w-[500px]">
          <div className="text-xl xl:text-3xl">
            The digital twin for climate change adaptation allows the integration of climate models
            and impact models.{" "}
          </div>
          <div className="space-y-4 xl:text-lg">
            <p>
              This not only offers the Spanish wine sector the opportunity to have quick access to
              climate data on the past, present and future, but also the possibility of defining
              their own climate-related indicators.
            </p>
            <p>
              Such indicators include the average maximum temperature in summer, spring frost, or
              SPEI, which can be calculated as the climate model runs. This allows wineries to have
              regularly updated information on the risks of spring frost, heatwaves, and droughts
              that may affect their vineyards in the long-term future. Additionally, the digital
              twin offers a unified climate information source for those producers that own farms
              not only in the Spanish territory but also in other world regions suitable for grape
              and wine production, like California or South America to name a few.
            </p>
          </div>
        </div>
      </div>
    </TabsContent>
  );

  const energyContent = (
    <TabsContent
      value="energy"
      className="max-xl:divide-y-green-700/10 space-y-6 pt-6 max-xl:divide-y xl:space-y-20 xl:pt-10"
    >
      <div className="flex flex-col justify-between gap-8 xl:flex-row">
        <div className="relative space-y-[18px]">
          <div className="max-w-[680px] pb-4 text-xl xl:pb-10 xl:text-2xl">
            As the need for decarbonisation of the global energy system intensifies, renewable
            energies have become one of the most promising assets to achieve net zero emissions.
            Yet, unlike their fossil fuel counterparts, renewables are more vulnerable to a changing
            climate and the expected increase in extreme weather events.
          </div>
          <KnowMoreButton
            onClick={() => setOpenedKnowMore(!openedKnowMore)}
            opened={openedKnowMore}
          />
          <AnimatePresence>
            {openedKnowMore && (
              <motion.div
                key="know-more-green-transition"
                initial={{ opacity: 0, height: 0 }}
                exit={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="space-y-4 text-sm xl:text-base"
              >
                Wind energy is particularly exposed, emphasising the need for accurate
                representations of future wind resources. Such climate information will allow us to
                provide more reliable estimates of future energy production of current wind farms
                and support decision-making regarding the viability of new wind farm locations. By
                using the outputs of the climate models as the simulation is running, an energy
                company would be able to calculate meaningful indicators directly related to their
                activity, such as capacity factors, energy demand predictors (e.g. cooling and
                heating degree days) or wind speed anomalies, among others. The implementation of
                this streaming environment allows us to estimate user-tailored indicators in a
                timely manner, without the need to store the complete model output permanently. By
                directly simulating wind at turbine hub height and through enhanced spatial and
                temporal resolution, interactive and user-oriented digital twins represent a step
                forward in assisting near- to long-term measures against the impacts of climate
                change. Having prompt access to this kind of climate information would help the
                renewable energy sector avoid misdirected decisions and failed opportunities in
                terms of adaptation.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="flex h-fit min-w-[376px] max-w-[376px] flex-1 items-end gap-4">
          <Image
            width={201}
            height={44}
            className="h-[44px] w-[201px]"
            src="/images/about-logo-endesa.png"
            alt="Endesa"
          />
          <a
            href="https://www.endesa.com/es"
            target="_blank"
            rel="noreferrer"
            className="max-w-[160px] text-xs underline"
          >
            Endesa
          </a>
        </div>
      </div>
      <div className="space-y-4 max-xl:pt-6 xl:space-y-6">
        <Image
          className="h-full xl:w-[1160px]"
          alt="Energy sector visualization"
          src="/images/about-gloria-energy-0.png"
          height={416}
          width={1160}
        />
        <div className="max-w-[652px] text-xs">
          Visualisation of the streaming concept tailored towards the wind energy sector. The
          climate model outputs raw climate variables which are summarised in the form of wind speed
          distributions for a specific wind farm or region. The wind speed distribution is then
          converted to capacity factor, which can be adjusted for different types of turbines.
        </div>
      </div>
      <div className="flex flex-col max-xl:pt-6 xl:flex-row xl:gap-[140px]">
        <h2 className="pb-6 text-3xl font-medium xl:pb-16 xl:text-4xl">
          Capacity Factors and Energy System Resilience
        </h2>
        <div className="inline-flex flex-col gap-8 xl:max-w-[500px]">
          <div className="text-xl xl:text-3xl">
            Capacity factors are a measure of how much energy can be produced by a turbine over a
            specific period of time, as a fraction of its rated power.
          </div>
          <div className="space-y-4 xl:text-lg">
            <p>
              These tailored indicators allow the energy sector to more efficiently ensure the
              security of energy supply, price and power grid stability; obtain reliable data on how
              energy systems and turbine structural integrity can cope with the effects of extreme
              events; and have insights into future changes in climate variability to plan and
              manage the design of energy systems and the impact on energy demand and prices.
            </p>
          </div>
        </div>
      </div>
      <div className="max-xl:pt-6">
        {isMobile ? (
          <div className="w-full">
            <Image
              className="h-[213px]"
              alt=""
              src="/images/about-gloria-energy-1.png"
              height={426}
              width={432}
              style={{ objectFit: "cover" }}
            />
            <Image
              className="h-[213px]"
              alt=""
              src="/images/about-gloria-energy-2.png"
              height={426}
              width={432}
              style={{ objectFit: "cover" }}
            />
          </div>
        ) : (
          <div className={cn("mb-10 flex h-[432px] w-full overflow-hidden", gridColumns)}>
            <AnimatePresence>
              {Array(2)
                .fill(null)
                .map((_, index) => (
                  <motion.div
                    key={`image-section1-${index}`}
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    transition={{ delay: 0.5 + index, duration: 1, ease: "easeInOut" }}
                    className={cn(
                      "relative z-10 flex h-full items-center",
                      `col-start-${index + 2}`,
                    )}
                  >
                    <Image
                      alt=""
                      src={`/images/about-gloria-energy-${index + 1}.png`}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        )}
        <div className={cn("mt-6 grid text-green-700 xl:mt-0")}>
          <div className={cn(gridColumns)}>
            <h4 className="col-span-1 mb-4 max-w-[274px] text-lg xl:mb-0 xl:text-xl">
              Projected wind energy capacity factors for Europe and the Iberian Peninsula
            </h4>
          </div>
          <div className={cn(gridColumns, "mb-2 xl:mb-[30px]")}>
            <div className="col-start-2">
              <div className="max-w-[382px] text-xs xl:text-sm">
                Capacity factor (CF) for a class I/II Siemens-Gamesa G80 wind turbine at 1-hourly
                frequency and a spatial resolution of 5 km, averaged over one week for the European
                continent. Data was obtained from the DestinE IFS-NEMO 2020-2040 projection
                simulation.
              </div>
            </div>
            <div className="col-start-3">
              <div className="max-w-[382px] text-xs xl:text-sm">
                Capacity factor (CF) for a class I/II Siemens-Gamesa G80 wind turbine at 1-hourly
                frequency and a spatial resolution of 5 km, averaged over one week for the Iberian
                Peninsula. The dark blue dot marks the approximate position of the Tico wind farm in
                the Ebro Valley, operated by Enel Green Power (ENDESA). Data was obtained from the
                DestinE IFS-NEMO 2020-2040 projection simulation.
              </div>
            </div>
          </div>
        </div>
      </div>
    </TabsContent>
  );

  const insuranceContent = (
    <TabsContent
      value="insurance"
      className="max-xl:divide-y-green-700/10 space-y-6 pt-6 max-xl:divide-y xl:space-y-20 xl:pt-10"
    >
      <div className="flex flex-col justify-between gap-8 xl:flex-row">
        <div className="relative space-y-[18px]">
          <div className="max-w-[594px] pb-4 text-xl xl:pb-10 xl:text-2xl">
            Storm Gloria was a large extra-tropical cyclone that struck the east of Spain, Southern
            France, and the Balearic islands in January 2020, causing heavy coastal flooding and
            significant impacts.
          </div>
          <KnowMoreButton
            onClick={() => setOpenedKnowMore(!openedKnowMore)}
            opened={openedKnowMore}
          />
          <AnimatePresence>
            {openedKnowMore && (
              <motion.div
                key="know-more-green-transition"
                initial={{ opacity: 0, height: 0 }}
                exit={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="space-y-4 text-sm xl:text-base"
              >
                During 18th - 24th January heavy coastal flooding occurred, due to large storm
                swells and record breaking precipitation. This caused significant impacts on
                coastline equipment, deterioration in tourist infrastructures and terrestrial and
                maritime communication and affectations to marine ecosystems, evidencing the
                vulnerability of the Mediterranean coast to large-scale atmospheric disturbances
                (Amores et al. 2020, Berdalet et al. 2020).The damages resulted in 14 deaths and
                more than 80 people injured, accumulating 71 million euros of financial damage
                (Consorcio de Compensacion, 2020).
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="flex max-w-[335px] flex-1 gap-4">
          <Image
            width={160}
            height={44}
            className="h-[44px] w-[160px]"
            src="/images/about-logo-axa.png"
            alt="AXA XL"
          />
          <a
            href="https://axaxl.com/"
            target="_blank"
            rel="noreferrer"
            className="max-w-[160px] text-xs underline"
          >
            AXA XL
          </a>
        </div>
      </div>
      <div className="space-y-4 max-xl:pt-6 xl:space-y-6">
        <Image
          className="h-full xl:w-[1160px]"
          alt="Energy sector visualization"
          src="/images/about-gloria-insurance.png"
          height={416}
          width={1160}
        />
        <div className="max-w-[612px] text-xs">
          <div>
            Map of the Iberian Peninsula showing the differences in total precipitation from 18th -
            25th January between the +2K scenario (future) and the current (actual) day (left).
            Histograms of hourly precipitation in selected locations that experienced precipitation
            extremes (Alicante, Girona, Ibiza and Valencia) (right).
          </div>
          <div className="italic">Source: BSC with storyline simulations from AWI.</div>
        </div>
      </div>
      <div className="flex flex-col max-xl:pt-6 xl:flex-row xl:gap-[140px]">
        <h2 className="pb-6 text-3xl font-medium xl:pb-16 xl:text-4xl">
          Digital twin for climate change adaptation
        </h2>
        <div className="inline-flex flex-col gap-8 xl:max-w-[500px]">
          <div className="text-xl xl:text-3xl">
            It allows a more accurate simulation of peak rainfall events like storm Gloria.
          </div>
          <div className="space-y-4 xl:text-lg">
            <p>
              Using storyline simulations with high spatio-temporal resolution, we have been able to
              examine the impacts of this event and also how it would manifest in a +2 K warmer
              world. We have investigated four different locations (Alicante, Girona, Ibiza and
              Valencia) that experienced precipitation extremes and examined if these would
              intensify in a warmer climate. While a big spatial variability is seen in total
              rainfall, areas around Valencia and Alicante, that already experienced record
              rainfall, show increases of around 100mm. Combined with dryer soils due to
              Mediterranean warming, this type of increase in extreme precipitation, could greatly
              increase the likelihood of flash flooding.
            </p>
            <KnowMoreButton
              onClick={() => setOpenedKnowMoreInsurance(!openedKnowMoreInsurance)}
              opened={openedKnowMoreInsurance}
            />
            <AnimatePresence>
              {openedKnowMoreInsurance && (
                <motion.div
                  key="know-more-green-transition"
                  initial={{ opacity: 0, height: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-4 text-sm xl:text-base"
                >
                  <p>
                    This information may be of interest for the insurance and (re)insurance sectors,
                    since they have signaled flooding as a big issue, causing flood insurance
                    premiums to rise as these events are becoming more common. Having access to
                    climate data that could be coupled to their in-house catastrophe models may be
                    important for this sector.
                  </p>
                  <p>
                    Likewise, better modeling the effect of extreme rainfall events is of interest
                    for the ecological scientific community interested in the impacts of high-impact
                    storms on marine ecosystems (e.g. regression of beaches and health impacts due
                    to the proliferation of microalgae).
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </TabsContent>
  );

  return (
    <section>
      <div className="relative bg-blue-950 text-white">
        <Lines
          verticalClassName="left-8 w-[calc(100vh-16px)]"
          sectionName="project-1"
          columnsNumber={3}
          rows={[180, 600]}
          colorClass="bg-white/10"
        />
        <div className="container relative space-y-6 py-6 pb-[60px] pl-8 xl:space-y-[60px] xl:py-[100px] xl:pl-24">
          <h2 className="items center flex w-full flex-col xl:text-center">
            <div className="uppercase xl:text-lg">Project 1</div>
            <div className="text-2xl uppercase xl:text-4xl">Gloria</div>
          </h2>
          <div className="max-w-[760px] space-y-4 text-sm xl:text-base">
            <p>
              GLORIA (GLObal digital twin for RegIonal and local climate Adaptation) is a project
              funded by the Spanish Ministry of Science and Innovation/National Research Agency and
              the European Union ‘NextGenerationEU/PRTR’, running from 2022-2024. The main objective
              of the project is to develop a digital twin of the Earth’s climate to substantially
              improve the quality of climate simulations and address the pressing demands for
              action-oriented, credible climate information in an interactive way.
            </p>
            <p>To achieve this goal, three specific objectives are proposed:</p>
            <a
              target="_blank"
              href="https://www.bsc.es/es/research-and-development/projects/gloria-global-digital-twin-regional-and-local-climate-adaptation/project-people"
              rel="noreferrer"
              className="flex items-center gap-1 leading-relaxed underline hover:opacity-70"
            >
              <ExternalLink></ExternalLink>
              Visit GLORIA
            </a>
          </div>
          <div className="flex flex-col gap-6 xl:flex-row xl:gap-[80px]">
            <div className="flex flex-col gap-4 xl:w-1/3">
              <div className="text-2xl xl:text-6xl">01</div>
              <div className="text-base xl:text-3xl">Develop a digital twin</div>
              <div className="text-sm leading-relaxed xl:text-base">
                of the Earth’s climate based on the most efficient version of the global model
                IFS-NEMO that, as a simulation platform, satisfies the requirements of the Spanish
                climate research, governance and services communities.
              </div>
            </div>
            <div className="flex flex-col gap-4 xl:w-1/3">
              <div className="text-2xl xl:text-6xl">02</div>
              <div className="text-base xl:text-3xl">Perform global climate simulations</div>
              <div className="text-sm leading-relaxed xl:text-base">
                at unprecedented spatial resolution addressing some of the main systematic errors of
                current climate models with a simulation protocol and software infrastructure that
                allows an almost real-time interaction between the digital twin and the climate
                adaptation community.
              </div>
            </div>
            <div className="flex flex-col gap-4 xl:w-1/3">
              <div className="text-2xl xl:text-6xl">03</div>
              <span className="text-base xl:text-3xl">Design a user engagement approach</span>
              <div className="text-sm xl:text-base">
                that takes advantage of the interactivity and flexibility of the digital twin and
                improves the time-to-solution of the climate adaptation community to access the best
                climate information.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative bg-white text-green-700">
        <Lines
          verticalClassName="left-8 w-[calc(100vh-16px)]"
          sectionName="project-1"
          columnsNumber={3}
          rows={[180, 600]}
          colorClass="bg-white/10"
        />
        <div className="container relative space-y-6 py-6 pb-[60px] pl-8 xl:space-y-[80px] xl:py-[100px] xl:pl-24">
          <div className="max-w-[760px] space-y-4 text-sm xl:text-base">
            <p>
              The GLORIA digital twin for regional and local adaptation will change the way in which
              climate information has been traditionally provided to the climate adaptation
              community, using a user-centered design, considering user needs, and providing an
              interactive data flow in an operational manner. To achieve this, key external users
              participate in user engagement activities around the sectoral applications.
            </p>
          </div>
          <h3 className="max-w-[572px] text-xl xl:text-[52px] xl:leading-[61px]">
            Sectorial applications in GLORIA
          </h3>
          <Tabs defaultValue="agriculture">
            <TabsList>
              <TabsTrigger value="agriculture">Agriculture</TabsTrigger>
              <TabsTrigger value="energy">Energy</TabsTrigger>
              <TabsTrigger value="insurance">Insurance</TabsTrigger>
            </TabsList>
            {agricultureContent}
            {energyContent}
            {insuranceContent}
          </Tabs>
        </div>
      </div>
    </section>
  );
}
