import { useState, useCallback } from 'react';
import InlineFormatToolbar from './inline-format-toolbar';

interface Selection {
  text: string;
  start: number;
  end: number;
  x: number;
  y: number;
}

interface BlockquoteProps {
  content?: string;
  onChange: (params: { content: string }) => void;
}

function Blockquote({ content = '', onChange }: BlockquoteProps) {
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
    if (textarea.tagName !== 'TEXTAREA') return;

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

  const handleFormat = (type: string) => {
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

    onChange({ content: before + formattedText + after });
    setSelection(null);
  };

  return (
    <div className="border-l-4 border-border pl-4">
      <div className="relative">
        <textarea
          value={content}
          onChange={(e) => onChange({ content: e.target.value })}
          onSelect={handleSelect}
          onBlur={() => setTimeout(() => setSelection(null), 200)}
          placeholder="Quote text..."
          rows={3}
          className="w-full px-2 py-1 rounded border border-border bg-accent resize-y"
        />
        <InlineFormatToolbar
          position={selection}
          onFormat={handleFormat}
        />
      </div>
    </div>
  );
}

export default Blockquote;