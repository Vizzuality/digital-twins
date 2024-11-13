import Intro from "@/components/about/intro";
import Project1 from "@/components/about/project-1";
import Project2 from "@/components/about/project-2";
import Section1 from "@/components/about/section-1";

export default function About() {
  return (
    <main>
      <Intro />
      <Section1 />
      <Project1 />
      <Project2 />
    </main>
  );
}
