"use client";

import { getData } from "@/utils/utils";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import ActiveBoard from "@/app/components/activeBoard/ActiveBoard";
import QuillInitEditor from "@/app/components/quillEditor/quilEditorInit";
import QuillEditor from "@/app/components/quillEditor/quillEditor";
import Sidebar from "@/app/components/sidebar/Sidebar";


export default function Home() {
  const [comments, setComments] = useState<any>([1,2,3,4]);
  const [item, setItem] = useState<any>({name: ""});

  const params = useParams();
  const { itemId } = params;
  const { name } = item;

  const saveComment = (quillRef: any, index: number) => {
    if (quillRef.current) {
      // Retrieve HTML content
      const htmlContent = quillRef.current?.root.innerHTML;
      setComments([...comments, {id: comments.length + 1 , content: htmlContent}]);
      quillRef.current.setContents([]);
    }
  }
  const fetchItem = async () => {
    const authToken = localStorage.getItem("authToken");
    const item = await getData(`/api/v1/item?itemId=${itemId}`, authToken )
    setItem(item);
  }

  useEffect(() => {
    fetchItem();
  }, []);

  return (
    <>
      <Sidebar />
      <div className="flex flex-col h-full w-full px-16 pb-5 mt-5 overflow-y-scroll">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full">
          <div className="w-full">
            <h2 className="text-xl mb-4">{name}</h2>
            <QuillInitEditor />
            <h2>Comments</h2>
            <QuillEditor 
              hideBtn={true}
            /> 
          </div>
        </main>
      </div>
    </>
  );
}
