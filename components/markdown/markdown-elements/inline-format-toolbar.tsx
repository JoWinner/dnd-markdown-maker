import {
  Bold,
  Italic,
  Strikethrough,
  SubscriptIcon,
  SuperscriptIcon,
} from "lucide-react";

// Define the type for the formatting action
type FormatAction = 'bold' | 'italic' | 'strikethrough' | 'subscript' | 'superscript';

// Define the prop types for the component
interface InlineFormatToolbarProps {
  onFormat: (action: FormatAction) => void;
  position: { x: number; y: number } | null;
}

function InlineFormatToolbar({ onFormat, position}: InlineFormatToolbarProps) {
  if (!position) return null;

  return (
    <div
      className="flex absolute z-50 top-0 left-0 -translate-y-full items-center gap-1 p-1 bg-slate-300 dark:bg-slate-800 rounded-md shadow-lg border border-slate-400 dark:border-slate-700"
    >
      <button
        onClick={() => onFormat("bold")}
        className="p-1 hover:bg-white dark:hover:bg-slate-700 rounded"
        title="Bold"
      >
        <Bold size={16} />
      </button>
      <button
        onClick={() => onFormat("italic")}
        className="p-1 hover:bg-white dark:hover:bg-slate-700 rounded"
        title="Italic"
      >
        <Italic size={16} />
      </button>
      <button
        onClick={() => onFormat("strikethrough")}
        className="p-1 hover:bg-white dark:hover:bg-slate-700 rounded"
        title="Strikethrough"
      >
        <Strikethrough size={16} />
      </button>
      <button
        onClick={() => onFormat("subscript")}
        className="p-1 hover:bg-white dark:hover:bg-slate-700 rounded"
        title="Subscript"
      >
        <SubscriptIcon size={16} />
      </button>
      <button
        onClick={() => onFormat("superscript")}
        className="p-1 hover:bg-white dark:hover:bg-slate-700 rounded"
        title="Superscript"
      >
        <SuperscriptIcon size={16} />
      </button>
    </div>
  );
}

export default InlineFormatToolbar;
