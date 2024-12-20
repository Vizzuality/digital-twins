import dynamic from "next/dynamic";
const Lines = dynamic(() => import("@/components/lines"), { ssr: false });

export default function Section1() {
  return (
    <section className="relative bg-white text-green-700">
      <Lines
        verticalClassName="left-8 w-[calc(100vh-16px)]"
        sectionName="intro"
        columns={[64, 432, 757, 897]}
        rows={[]}
        colorClass="bg-blue-900/10"
      />
      <div className="container relative space-y-[18px] py-6 pb-[60px] pl-8 xl:py-[100px] xl:pl-24">
        <h2 className="uppercase tracking-tight xl:text-xl">Digital Twins: From Data to Impact</h2>
        <div className="max-w-[832px] text-xl xl:text-2xl">
          The information displayed in the Digital Twins platform has been co-produced by the
          Barcelona Supercomputing Center (BSC-CNS) in the context of the Spanish project GLORIA,
          the EU Destination Earth programme (DestinE) and the EU-funded nextGEMS and EERIE
          projects. These projects and initiatives work on the development of digital
          representations of the Earth system. The high-resolution simulations are only possible
          thanks to the computing power of the first pre-exascale supercomputers in Europe, such as
          MareNostrum 5.
        </div>
      </div>
    </section>
  );
}
