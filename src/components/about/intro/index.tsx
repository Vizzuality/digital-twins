import dynamic from "next/dynamic";
const Lines = dynamic(() => import("@/components/lines"), { ssr: false });

export default function Intro() {
  return (
    <section className="relative bg-blue-900 text-white">
      <Lines
        verticalClassName="left-8 w-[calc(100vh-16px)]"
        sectionName="intro"
        columns={[64, 432, 757, 897]}
        rows={[179, 246]}
      />
      <div className="container relative pb-[60px] pl-8 pt-[110px] xl:pb-[140px] xl:pl-24 xl:pt-[177px]">
        <h1 className="text-light-white text-2xl font-semibold xl:text-[90px] xl:leading-[81px]">
          About Us
        </h1>
      </div>
    </section>
  );
}
