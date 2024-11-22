"use client"

import { DndContext, pointerWithin, DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Sidebar from "./markdown-sidebar";
import MarkdownEditor from "./markdown-editor";
import Preview from "./markdown-preview";
import { MarkdownElement } from "../../../types/markdown";

function MarkdownEditorPage() {
  const [markdown, setMarkdown] = useState<MarkdownElement[]>([]);

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [editorCollapsed, setEditorCollapsed] = useState(false);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    // Handle new elements from sidebar
    if (!markdown.find((item) => item.id === active.id)) {
      const data = active.data.current as { type: MarkdownElement['type'] };
      if (!data || !data.type) return;

      const newElement: MarkdownElement = (() => {
        switch (data.type) {
          case 'list':
            return {
              id: crypto.randomUUID(),
              type: 'list',
              content: '',
              items: [''],
              ordered: false,
            };
          case 'table':
            return {
              id: crypto.randomUUID(),
              type: 'table',
              headers: [''],
              rows: [['']],
            };
          case 'checkbox':
            return {
              id: crypto.randomUUID(),
              type: 'checkbox',
              items: [{ text: '', checked: false }],
            };
          case 'heading':
            return {
              id: crypto.randomUUID(),
              type: 'heading',
              content: '',
              level: 1,
            };
          case 'image':
            return {
              id: crypto.randomUUID(),
              type: 'image',
              url: '',
              alt: '',
              content: '',
            };
          case 'link':
            return {
              id: crypto.randomUUID(),
              type: 'link',
              text: '',
              url: '',
            };
          case 'paragraph':
            return {
              id: crypto.randomUUID(),
              type: 'paragraph',
              content: '',
            };
          case 'blockquote':
            return {
              id: crypto.randomUUID(),
              type: 'blockquote',
              content: '',
            };
          case 'code':
            return {
              id: crypto.randomUUID(),
              type: 'code',
              content: '',
              language: '',
            };
          case 'inlineCode':
            return {
              id: crypto.randomUUID(),
              type: 'inlineCode',
              content: '',
            };
          case 'hr':
            return {
              id: crypto.randomUUID(),
              type: 'hr',
            };
          default:
            throw new Error(`Unsupported markdown element type: ${data.type}`);
        }
      })()

      // If dropping over the editor container
      if (over.id === "editor") {
        setMarkdown((prev) => [...prev, newElement]);
        return;
      }

      // If dropping over an existing element
      const overIndex = markdown.findIndex((item) => item.id === over.id);
      setMarkdown((prev) => [
        ...prev.slice(0, overIndex),
        newElement,
        ...prev.slice(overIndex),
      ]);
      return;
    }

    // Handle reordering existing elements
    if (active.id !== over.id) {
      setMarkdown((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const moveElement = (id: string, direction: "up" | "down") => {
    const currentIndex = markdown.findIndex((item) => item.id === id);
    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

    if (newIndex >= 0 && newIndex < markdown.length) {
      setMarkdown((prev) => arrayMove(prev, currentIndex, newIndex));
    }
  };

  return (
   
      <div className="min-h-screen  bg-dot-pattern">
        <DndContext
          onDragEnd={handleDragEnd}
          collisionDetection={pointerWithin}
        >
          <div className="container mx-auto py-32">
            <div className="grid grid-cols-12 gap-4">
              <div
                className={`transition-all duration-300 relative ${
                  sidebarCollapsed ? "col-span-1" : "col-span-2"
                }`}
              >
                <button
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="absolute -right-3 top-1/2 transform -translate-y-1/2 z-20 bg-white dark:bg-slate-800 p-1 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm"
                >
                  {sidebarCollapsed ? (
                    <ChevronRight size={16} />
                  ) : (
                    <ChevronLeft size={16} />
                  )}
                </button>
                <Sidebar collapsed={sidebarCollapsed} />
              </div>
              <div
                className={`transition-all duration-300 relative ${
                  editorCollapsed
                    ? "col-span-4"
                    : sidebarCollapsed
                    ? "col-span-5"
                    : "col-span-5"
                }`}
              >
                <button
                  onClick={() => setEditorCollapsed(!editorCollapsed)}
                  className="absolute -right-3 top-1/2 transform -translate-y-1/2 z-20 bg-white dark:bg-slate-800 p-1 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm"
                >
                  {editorCollapsed ? (
                    <ChevronRight size={16} />
                  ) : (
                    <ChevronLeft size={16} />
                  )}
                </button>
                <MarkdownEditor
                  markdown={markdown}
                  setMarkdown={setMarkdown}
                  moveElement={moveElement}
                  collapsed={editorCollapsed}
                />
              </div>
              <div
                className={`transition-all duration-300 relative ${
                  editorCollapsed  && sidebarCollapsed
                    ? "col-span-7"
                    : sidebarCollapsed
                    ? "col-span-6"
                    : editorCollapsed
                    ? "col-span-6"
                    : "col-span-5"
                }`}
              >
                <Preview markdown={markdown} />
              </div>
            </div>
          </div>
        </DndContext>
      </div>
  );
}

export default MarkdownEditorPage;
