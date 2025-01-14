'use client';

import { setAuthState } from "@/app/redux/auth/auth";
import { setBoard } from "@/app/redux/board/board";
import { getData } from "@/utils/utils";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ActiveBoard from "@/app/components/activeBoard/ActiveBoard";
import PopUpModal from "@/app/components/popup/Popupmodal";
import Sidebar from "@/app/components/sidebar/Sidebar";

export interface Item {
  itemId: number;
  name: string;
  pos: number;
}

export interface Group {
  groupId: number;
  name: string;
  description: string | null;
  items: Item[];
}

interface BoardResponse {
  boardName: string;
  groups: Group[];
}


export default function BoardDetail() {
  const dispatch = useDispatch();
  const [boardData, setBoardData] = useState<BoardResponse>({boardName: "", groups: []});
  const { id } = useParams();
  const { boardDetail } = useSelector((state: any) => state.boardInfo);
  const { boardName, groups } = boardDetail;
  
  useEffect(() => {
    const fetch = async () => {
      const authToken = typeof window !== "undefined" && window.localStorage.getItem("authToken");
      if(authToken) {
        const boardData: BoardResponse = await getData(`/api/v1/items?boardId=${id}`, authToken);
        dispatch(setBoard(boardData));
        setBoardData(boardData);
      }
    };
    fetch();
  }, []);

  return (
    <>
      <Sidebar />
      <div className="flex flex-col h-full w-full pl-8 pt-3 board-detail">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full">
          <div className="w-full">
            <div className="flex flex-row justify-between	pr-8">
              <h2 className="text-xl capitalize board-name">{boardName}</h2>
              <PopUpModal 
                btnTitle= "Add Collection"
                title= "Add New Collection"
                type="addCollection"
                fullWidth={false}
              />
            </div>
            {groups && groups.length > 0  && (
              <ActiveBoard groups={groups} />
            )}
            {boardName && groups.length === 0 && (<p>No collections found. Add a collection by clicking the <b>Add Collection</b> on top right</p>)}
          </div>
        </main>

      </div>
    </>

  );
}
