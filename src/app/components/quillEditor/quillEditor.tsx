"use client";
import "./quillEditor.scss";
import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

interface QuillEditorProps {
  comment?: any;
  initialComment?: boolean;
  index?: number;
  saveComment?: any;
  addReply?: boolean;
  hideBtn?: boolean;
}

const QuillEditor = ({ comment, initialComment, hideBtn, saveComment, index }: QuillEditorProps) => {
  const quillRef = useRef<any>(null); // Reference for the editor
  const [editorContent, setEditorContent] = useState(""); // Store the content
  const [uniqueId, setUniqueId] = useState<string>(""); // Unique ID for the editor
  const [isReadOnly, setIsReadOnly] = useState<boolean>(false); // Read-only mode

  useEffect(() => {
    // Generate a sanitized unique ID for the editor
    function generateUniqueId() {
      const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0,
          v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
      return `editor-${uuid.replace(/-/g, "")}`; // Replace dashes and prepend 'editor-'
    }

    // Set the unique ID
    setUniqueId(generateUniqueId());
  }, []);

  useEffect(() => {
    if (uniqueId) {
      // Ensure the DOM element exists before initializing Quill
      const quillInstance = new Quill(`#${uniqueId}`, {
        theme: "snow",
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], // Formatting buttons
            [{ header: [1, 2, 3, false] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["clean", "image"], // Clear formatting
          ],
        },
        readOnly: isReadOnly
      });

      // Set the Quill instance reference
      quillRef.current = quillInstance;

      // Prepopulate content if `comment` exists
      if (comment) {
        quillInstance.root.innerHTML = comment.content;
      }

      // Cleanup on unmount
      return () => {
        quillRef.current = null;
      };
    }
  }, [uniqueId, comment]);


  return (
    <div className={`mb-8 ${hideBtn ? "hide mt-3" : ""} w-2/3	`} key={`item.s-${index}`}>
      {/* Only render the editor container once the uniqueId is set */}
      {uniqueId && (
        <div
          id={uniqueId}
          style={{ height: "auto", minHeight: "80px", marginBottom: "20px" }}
        ></div>
      )}
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() =>{ 
          setIsReadOnly(true);
          saveComment(quillRef);
        }}>Save</button>
    </div>
  );
};

export default QuillEditor;
