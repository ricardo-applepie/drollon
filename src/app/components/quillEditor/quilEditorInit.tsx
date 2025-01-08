"use client";

import "./quillEditor.scss";
import React, { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

interface QuillEditorProps {
  initialContent?: string;
  onSave?: (content: string) => void;
}

const QuillInitEditor: React.FC<QuillEditorProps> = ({ initialContent = "", onSave }) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (quillRef.current || !editorRef.current) return;

    quillRef.current = new Quill(editorRef.current, {
      theme: "snow",
      modules: {
        toolbar: [
          ["bold", "italic", "underline", "strike"],
          [{ header: [1, 2, 3, false] }],
          [{ list: "ordered" }, { list: "bullet" }],
          ["clean", "image"],
        ],
      },
    });

    if (initialContent) {
      quillRef.current.root.innerHTML = initialContent;
    }
  }, [initialContent]);

  const handleSave = () => {
    if (quillRef.current && onSave) {
      const content = quillRef.current.root.innerHTML;
      onSave(content);
    }
  };

  return (
    <div className="simple-quill-editor w-2/3">
      <div ref={editorRef} style={{ minHeight: "150px" }}></div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3"
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
};

export default QuillInitEditor;
