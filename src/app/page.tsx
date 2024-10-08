import Link from "next/link";
import Intro from "@/components/intro";

export default function Home() {
  return (
    <main>
      <Intro />
      <div className="text-black text-lg hover:gray-500 space-x-5">
        <Link href="/globe">Globe</Link>
      </div>
    </main >
  );
}
