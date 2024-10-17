import Intro from "@/components/intro";
import Section1 from "@/components/section-1";
import Section2 from "@/components/section-2";
import Section3 from "@/components/section-3";
import Section5 from "@/components/section-5";

export default function Home() {
  return (
    <main className="snap-y snap-mandatory">
      <Intro />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section5 />
    </main >
  );
}
