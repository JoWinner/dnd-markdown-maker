import { useState, useCallback } from 'react';
import { Plus, Trash } from 'lucide-react';
import InlineFormatToolbar from './inline-format-toolbar';

interface Selection {
  text: string;
  start: number;
  end: number;
  x: number;
  y: number;
}

interface ListProps {
  items?: string[];
  ordered?: boolean;
  onChange: (params: { items: string[], ordered: boolean }) => void;
}

function List({ items = [], ordered = false, onChange }: ListProps) {
  const [selection, setSelection] = useState<Selection | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleSelect = useCallback((index: number) => {
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
    const selectedText = items[index].slice(start, end);

    setActiveIndex(index);
    setSelection({
      text: selectedText,
      start,
      end,
      x: rect.x + (rect.width / 2),
      y: rect.y,
    });
  }, [items]);

  const handleFormat = (type: string) => {
    if (!selection || activeIndex === null) return;

    const item = items[activeIndex];
    const before = item.slice(0, selection.start);
    const after = item.slice(selection.end);
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

    const newItems = [...items];
    newItems[activeIndex] = before + formattedText + after;
    onChange({ items: newItems, ordered });
    setSelection(null);
  };

  const addItem = () => {
    onChange({ items: [...items, ''], ordered });
  };

  const updateItem = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index] = value;
    onChange({ items: newItems, ordered });
  };

  const removeItem = (index: number) => {
    onChange({ items: items.filter((_, i) => i !== index), ordered });
  };

  const toggleOrdered = () => {
    onChange({ items, ordered: !ordered });
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <button
          onClick={toggleOrdered}
          className="px-2 py-1 rounded border dark:border-gray-700 text-sm"
        >
          {ordered ? 'Ordered' : 'Unordered'}
        </button>
        <button
          onClick={addItem}
          className="flex items-center gap-1 px-2 py-1 rounded border dark:border-gray-700 text-sm"
        >
          <Plus size={14} /> Add Item
        </button>
      </div>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="text-gray-500 w-6">
              {ordered ? `${index + 1}.` : '•'}
            </span>
            <div className="relative flex-1">
              <textarea
                value={item}
                onChange={(e) => updateItem(index, e.target.value)}
                onSelect={() => handleSelect(index)}
                onBlur={() => setTimeout(() => setSelection(null), 200)}
                className="w-full h-10 px-2 py-1 rounded border  border-border bg-accent"
                rows={2}
              />
              {activeIndex === index && (
                <InlineFormatToolbar
                  position={selection}
                  onFormat={handleFormat}
                />
              )}
            </div>
            <button
              onClick={() => removeItem(index)}
              className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Trash size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default List;