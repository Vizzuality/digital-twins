import GlobeVideo from "@/components/globe-video";

export default function Home() {
  return (
    <main className="flex min-h-screen h-[3000px] flex-col items-center justify-between p-24 text-blue-800">
      Hello BSC!
      <div className="fixed top-8">
        <GlobeVideo />
      </div>
    </main >
  );
}
