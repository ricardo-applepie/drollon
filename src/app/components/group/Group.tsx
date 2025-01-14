'use client';

import Link from "next/link";
import { useState } from "react";
import { updateGroups } from "@/app/redux/board/board";
import { useDispatch } from "react-redux";
import { postData } from "@/utils/utils";
import { useParams } from "next/navigation";
import './group.scss';

import Item from "../Item/Item";
import PopUpModal from "../popup/Popupmodal";


interface GroupProps {
  group: any;
}

export default function Group(props: GroupProps) {
  const { group } = props;
  const { items } = group;
  const [taskname, setTaskname] = useState("");
  const dispatch = useDispatch();
  const { id } = useParams();
  const authToken = typeof window !== "undefined" && window.localStorage.getItem('authToken');

  const handleBlur = async () => {
    if (!taskname) return;

    // Add the task first
    const { groupId } = props.group;
    if(authToken) {
      const itemGroups = await postData("/api/v1/item", {
        groupId: groupId,
        boardId: Number(id),
        itemName: taskname,
      }, authToken);
      dispatch(updateGroups(itemGroups)); 
      setTaskname("");
    }
  };

  const handleChange = (event: any) => {
   const value = event.target.value;
   setTaskname(value)
  }

  return (
    <div className="mt-10 group" key={`group-detail-${group.groupId}`}>
      <div className="flex-row mb-3 flex w-full">
        <h3 className="font-medium text-lg bold capitalize w-full pl-4">{group.name}</h3> 
      </div>

      {items.map((item: any, index: number) => {
        return (
          <Item 
            index={`item_${index}`} 
            item={item}
          />
        )
      })}
      <input 
        className="py-3 px-8 boards--board border  block border-slate-200 border-solid board-item w-full focus:outline-none focus:shadow-outline" placeholder="+ add task" 
        onBlur={() => handleBlur()}  
        onChange={handleChange}
        value={taskname}
      />
    </div>
  );
};