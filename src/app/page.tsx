import Link from "next/link";

export default function Home() {
  return (
    <main className="start">
      <div>
        <h1 className="text-[#ec6e2a] font-bold">BOINKS</h1>
        <h1 className="text-[#28ab96] font-bold">BUDGETING</h1>
      </div>
      <h2 className="text-black">{'"Where your finances has a plan"'}</h2>
      <Link href={"/home"}>
        <button className="startButton">Start</button>
      </Link>
    </main>
  );
}
