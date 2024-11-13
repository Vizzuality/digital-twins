import Acknowledgements from "@/components/about/acknowledgements";
import Intro from "@/components/about/intro";
import Project1 from "@/components/about/project-1";
import Project2 from "@/components/about/project-2";
import Project3 from "@/components/about/project-3";
import Project4 from "@/components/about/project-4";
import Section1 from "@/components/about/section-1";
export default function About() {
  return (
    <main>
      <Intro />
      <Section1 />
      <Project1 />
      <Project2 />
      <Project3 />
      <Project4 />
      <Acknowledgements />
    </main>
  );
}
