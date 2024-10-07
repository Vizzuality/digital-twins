import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen h-[300px] flex-col items-center p-24 text-blue-800">
      Hello BSC!
      <div className="text-black text-lg hover:gray-500 space-x-5">

        <Link href="/globe">Globe</Link>
        <Link href="/grid">Grid</Link>
      </div>
    </main >
  );
}
