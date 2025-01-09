'use client';

import Image from "next/image";
import RecentBoards from "./components/recentboards/RecentBoards";
import Sidebar from "./components/sidebar/Sidebar";

export default function Home() {
  return (
    <>
      <Sidebar />
      <div className="w-full h-full	font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col h-full	">
          <RecentBoards />
        </main>
      </div>
    </>

  );
}
