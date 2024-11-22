import { useState, useCallback } from 'react';
import InlineFormatToolbar from './inline-format-toolbar';
interface Selection {
  text: string;
  start: number;
  end: number;
  x: number;
  y: number;
}

interface LinkProps {
  text?: string;
  url?: string;
  onChange: (params: { text: string; url: string }) => void;
}

function Link({ text = '', url = '', onChange }: LinkProps) {
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
    const selectedText = text.slice(start, end);

    setSelection({
      text: selectedText,
      start,
      end,
      x: rect.x + (rect.width / 2),
      y: rect.y,
    });
  }, [text]);

  const handleFormat = (type: 'bold' | 'italic' | 'strikethrough' | 'subscript' | 'superscript') => {
    if (!selection) return;

    const before = text.slice(0, selection.start);
    const after = text.slice(selection.end);
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

    onChange({ text: before + formattedText + after, url });
    setSelection(null);
  };

  return (
    <div className="space-y-2">
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => onChange({ text: e.target.value, url })}
          onSelect={handleSelect}
          onBlur={() => setTimeout(() => setSelection(null), 200)}
          placeholder="Link text..."
          className="w-full h-10 px-2 py-1 rounded border  border-border bg-accent"
          rows={2}
        />
        <InlineFormatToolbar
          position={selection}
          onFormat={handleFormat}
        />
      </div>
      <input
        type="text"
        value={url}
        onChange={(e) => onChange({ text, url: e.target.value })}
        placeholder="URL..."
        className="w-full px-2 py-1 rounded border  border-border bg-accent"
      />
    </div>
  );
}

export default Link;