'use client';
import Lines from "@/components/lines";
import Globe from "@/components/globe";

export default function Section1() {

  return (
    <section className="relative bg-green-700 py-20 px-[150px]">
      <Lines verticalClassName="left-8" sectionName="section-1" columns={[100]} rows={[100]} colorClass="bg-blue-900/20" />
      <Globe />
    </section >);
};