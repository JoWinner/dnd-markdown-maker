import { useDraggable } from "@dnd-kit/core";
import {
  Heading,
  Pilcrow,
  List,
  Image,
  Quote,
  Code,
  Link as LinkIcon,
  Minus,
  Table,
  CheckSquare,
} from "lucide-react";
import React from "react";
import { LucideIcon } from 'lucide-react';
import { MarkdownElementType } from '@/types/markdown';

interface DraggableItemProps {
  id: MarkdownElementType;
  icon: LucideIcon;
  label: string;
  collapsed: boolean;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ id, icon: Icon, label, collapsed }) => {
  
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: id,
      data: {
        type: id,
      },
    });
    if (!Icon) return null;

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: isDragging ? 50 : undefined,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`sidebar-item group relative z-10 ${
        collapsed ? "justify-center" : ""
      } ${isDragging ? "bg-white dark:bg-slate-800 shadow-lg" : ""}`}
      title={collapsed ? label : ""}
    >
      <Icon
        size={16}
        className="text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-all"
      />
      {!collapsed && <span>{label}</span>}
    </div>
  );
};

interface SidebarProps {
  collapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const items: { id: MarkdownElementType; icon: LucideIcon; label: string }[] = [
    { id: "heading" as MarkdownElementType, icon: Heading, label: "Heading" },
    { id: "paragraph" as MarkdownElementType, icon: Pilcrow, label: "Paragraph" },
    { id: "list" as MarkdownElementType, icon: List, label: "List" },
    { id: "image" as MarkdownElementType, icon: Image, label: "Image" },
    { id: "blockquote" as MarkdownElementType, icon: Quote, label: "Quote" },
    { id: "code" as MarkdownElementType, icon: Code, label: "Code Block" },
    { id: "inlineCode" as MarkdownElementType, icon: Code, label: "Inline Code" },
    { id: "link" as MarkdownElementType, icon: LinkIcon, label: "Link" },
    { id: "hr" as MarkdownElementType, icon: Minus, label: "Divider" },
    { id: "table" as MarkdownElementType, icon: Table, label: "Table" },
    { id: "checkbox" as MarkdownElementType, icon: CheckSquare, label: "Checkbox List" },
  ];

  return (
    <div className="panel p-4 ">
      <h2 className={`panel-title ${collapsed ? "text-center" : ""}`}>
        {collapsed ? "≡" : "Elements"}
      </h2>
      <div className="space-y-1">
        {items.map((item) => (
          <DraggableItem key={item.id} {...item} collapsed={collapsed} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
