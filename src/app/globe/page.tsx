import Globe from "@/components/globe";

export default function Globetest() {
  return (
    <main className="flex min-h-screen h-[3000px] flex-col items-center justify-between p-24 text-blue-800">
      <div className="fixed top-8">
        <Globe />
      </div>
    </main >
  );
}
