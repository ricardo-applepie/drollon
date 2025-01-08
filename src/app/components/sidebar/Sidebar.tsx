"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getData } from "@/utils/utils";
import { usePathname } from "next/navigation"; // ✅ Use usePathname instead of useRouter
import { useAppSelector } from "@/store/store";
import "./sidebar.scss";

import PopUpModal from "../popup/Popupmodal";

const sideNav = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "Search", type: "input" },
];

const sideNav1 = [
  { id: 3, className: "mt-14", name: "Automation" },
  { id: 4, name: "Track Time" },
];

export default function Sidebar() {
  const [boards, setBoards] = useState([]);
  const pathname = usePathname(); // ✅ Get the current path
  const authState = useAppSelector((state) => state);
  console.log(authState, "authState");

  // Extract the boardId from the path
  const boardId = pathname.split("/")[2];

  useEffect(() => {
    const fetch = async () => {
      const boards = await getData("/api/v1/boards");
      setBoards(boards);
    };
    fetch();
  }, []);

  return (
    <nav className="px-3 h-full flex flex-col justify-between sidebar min-w-52">
      <div>
        {sideNav.map((sub) => (
          <div className="mt-3 pl-1" key={sub.id}>
            {sub.type === "input" ? (
              <>
                <input
                  className="pl-3 py-1 mt-2 mb-4 rounded w-full"
                  placeholder={sub.name}
                />
                <PopUpModal
                  btnTitle="Create New Board"
                  title="Add Project"
                  type="addBoard"
                  fullWidth={true}
                />
              </>
            ) : (
              <Link className="flex gap-3" href={sub.link || "/"}>
                <Image
                  src="/file.svg"
                  alt="File icon"
                  width={16}
                  height={16}
                  priority
                />
                <div>{sub.name}</div>
              </Link>
            )}
          </div>
        ))}
        {boards &&
          boards?.map((board: any) => (
            <div className={`mt-2 py-1 pl-1 ${`${board.boardId}` === boardId ? 'active' : ''}`} key={board.boardId}>
              <Link className={`flex gap-3`} href={`/boards/${board.boardId}`}>
                <Image
                  src="/file.svg"
                  alt="File icon"
                  width={16}
                  height={16}
                  priority
                />
                <div>{board.name}</div>
              </Link>
            </div>
          ))}
      </div>

      <div>
        {sideNav1.map((sub) => (
          <div className="flex gap-3 mt-3" key={sub.id}>
            <Image
              src="/file.svg"
              alt="File icon"
              width={16}
              height={16}
              priority
            />
            <div>{sub.name}</div>
          </div>
        ))}
        <div className="flex gap-3 pb-12 mt-14">
          <button className="px-2 py-2 bg-black text-white rounded w-full">
            Invite members
          </button>
        </div>
      </div>
    </nav>
  );
};