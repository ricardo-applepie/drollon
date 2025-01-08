import Image from "next/image";
import RecentBoards from "./components/recentboards/RecentBoards";

export default function Home() {
  return (
    <div className="w-full h-full	font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col h-full	">
        <RecentBoards />
      </main>
    </div>
  );
}
