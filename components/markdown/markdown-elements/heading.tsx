import { useState, useCallback } from 'react';
import InlineFormatToolbar from './inline-format-toolbar';

interface Selection {
  text: string;
  start: number;
  end: number;
  x: number;
  y: number;
}

interface HeadingProps {
  content?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  onChange: (params: { content: string; level: number }) => void;
}

function Heading({ content = '', level = 1, onChange }: HeadingProps) {
  const [selection, setSelection] = useState<Selection | null>(null);

  const handleSelect = useCallback(() => {
    const selection = window.getSelection();
    if (!selection || !selection.toString()) {
      setSelection(null);
      return;
    }

    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    
    const textarea = document.activeElement as HTMLTextAreaElement;
    if (!textarea || textarea.tagName !== 'TEXTAREA') return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.slice(start, end);

    setSelection({
      text: selectedText,
      start,
      end,
      x: rect.x + (rect.width / 2),
      y: rect.y,
    });
  }, [content]);

  const handleFormat = (type: 'bold' | 'italic' | 'strikethrough' | 'subscript' | 'superscript') => {
    if (!selection) return;

    const before = content.slice(0, selection.start);
    const after = content.slice(selection.end);
    let formattedText = selection.text;

    switch (type) {
      case 'bold':
        formattedText = `**${formattedText}**`;
        break;
      case 'italic':
        formattedText = `*${formattedText}*`;
        break;
      case 'strikethrough':
        formattedText = `~~${formattedText}~~`;
        break;
      case 'subscript':
        formattedText = `<sub>${formattedText}</sub>`;
        break;
      case 'superscript':
        formattedText = `<sup>${formattedText}</sup>`;
        break;
    }

    onChange({ content: before + formattedText + after, level });
    setSelection(null);
  };

  return (
    <div className="space-y-2 py-2">
      <div className="flex gap-2">
        <select
          value={level}
          onChange={(e) => onChange({ level: Number(e.target.value), content })}
          className="px-2 py-1 h-10 rounded border  border-border bg-accent"
        >
          {[1, 2, 3, 4, 5, 6].map((l) => (
            <option key={l} value={l}>H{l}</option>
          ))}
        </select>
        <div className="relative flex-1">
          <textarea
            value={content}
            onChange={(e) => onChange({ content: e.target.value, level })}
            onSelect={handleSelect}
            onBlur={() => setTimeout(() => setSelection(null), 200)}
            placeholder="Heading text..."
            className="w-full px-2 py-1 h-10 rounded border  border-border bg-accent"
            rows={2}
          />
          <InlineFormatToolbar
            position={selection}
            onFormat={handleFormat}
          />
        </div>
      </div>
    </div>
  );
}

export default Heading;