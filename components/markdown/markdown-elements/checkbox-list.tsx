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

interface CheckboxItem {
  checked: boolean;
  text: string;
}

interface CheckboxListProps {
  items?: CheckboxItem[];
  onChange: (props: { items: CheckboxItem[] }) => void;
}

function CheckboxList({ items = [], onChange }: CheckboxListProps) {
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
    const selectedText = items[index].text.slice(start, end);

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
    const before = item.text.slice(0, selection.start);
    const after = item.text.slice(selection.end);
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
    newItems[activeIndex] = { 
      ...newItems[activeIndex], 
      text: before + formattedText + after 
    };
    onChange({ items: newItems });
    setSelection(null);
  };

  const addItem = () => {
    onChange({ items: [...items, { text: '', checked: false }] });
  };

  const updateItem = (index: number, updates: Partial<CheckboxItem>) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], ...updates };
    onChange({ items: newItems });
  };

  const removeItem = (index: number) => {
    onChange({ items: items.filter((_, i) => i !== index) });
  };

  return (
    <div className="space-y-2">
      <button
        onClick={addItem}
        className="flex items-center gap-1 px-2 py-1 rounded border border-border text-sm"
      >
        <Plus size={14} /> Add Item
      </button>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={item.checked}
              onChange={(e) => updateItem(index, { checked: e.target.checked })}
              className="w-4 h-4 rounded border-border"
            />
            <div className="relative flex-1">
              <textarea
                value={item.text}
                onChange={(e) => updateItem(index, { text: e.target.value })}
                onSelect={() => handleSelect(index)}
                onBlur={() => setTimeout(() => setSelection(null), 200)}
                placeholder="List item..."
                className="w-full h-10 px-2 py-1 rounded border border-border bg-accent"
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

export default CheckboxList;