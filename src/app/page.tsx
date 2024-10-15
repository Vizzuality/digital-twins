import Intro from "@/components/intro";
import Section1 from "@/components/section-1";
import Section2 from "@/components/section-2";
import Section3 from "@/components/section-3";

export default function Home() {
  return (
    <main className="snap-y snap-mandatory">
      <Intro />
      <Section1 />
      <Section2 />
      <Section3 />
    </main >
  );
}
