import { useState, useCallback } from 'react';
import { Plus, Trash } from 'lucide-react';
import InlineFormatToolbar from './inline-format-toolbar';

interface SelectionState {
  text: string;
  start: number;
  end: number;
  x: number;
  y: number;
}

interface ActiveCellState {
  isHeader: boolean;
  rowIndex: number;
  colIndex: number;
}

interface TableProps {
  headers?: string[];
  rows?: string[][];
  onChange: (update: { headers: string[]; rows: string[][] }) => void;
}

function Table({ headers = [''], rows = [['']], onChange }: TableProps) {
  const [selection, setSelection] = useState<SelectionState | null>(null);
  const [activeCell, setActiveCell] = useState<ActiveCellState | null>(null);

  const handleSelect = useCallback((isHeader: boolean, rowIndex: number, colIndex: number) => {
    const selection = window.getSelection();
    if (!selection?.toString()) {
      setSelection(null);
      return;
    }

    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    
    const textarea = document.activeElement as HTMLTextAreaElement | null;
    if (!textarea || textarea.tagName !== 'TEXTAREA') return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = isHeader ? headers[colIndex] : rows[rowIndex][colIndex];
    const selectedText = text.slice(start, end);

    setActiveCell({ isHeader, rowIndex, colIndex });
    setSelection({
      text: selectedText,
      start,
      end,
      x: rect.x + (rect.width / 2),
      y: rect.y,
    });
  }, [headers, rows]);

  const handleFormat = (type: string) => {
    if (!selection || !activeCell) return;

    const { isHeader, rowIndex, colIndex } = activeCell;
    const text = isHeader ? headers[colIndex] : rows[rowIndex][colIndex];
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

    if (isHeader) {
      const newHeaders = [...headers];
      newHeaders[colIndex] = before + formattedText + after;
      onChange({ headers: newHeaders, rows });
    } else {
      const newRows = [...rows];
      newRows[rowIndex] = [...newRows[rowIndex]];
      newRows[rowIndex][colIndex] = before + formattedText + after;
      onChange({ headers, rows: newRows });
    }
    setSelection(null);
  };

  const addColumn = () => {
    const newHeaders = [...headers, ''];
    const newRows = rows.map(row => [...row, '']);
    onChange({ headers: newHeaders, rows: newRows });
  };

  const addRow = () => {
    const newRow = new Array(headers.length).fill('');
    onChange({ headers, rows: [...rows, newRow] });
  };

  const updateHeader = (index: number, value: string) => {
    const newHeaders = [...headers];
    newHeaders[index] = value;
    onChange({ headers: newHeaders, rows });
  };

  const updateCell = (rowIndex: number, colIndex: number, value: string) => {
    const newRows = [...rows];
    newRows[rowIndex] = [...newRows[rowIndex]];
    newRows[rowIndex][colIndex] = value;
    onChange({ headers, rows: newRows });
  };

  const removeRow = (index: number) => {
    onChange({ headers, rows: rows.filter((_, i) => i !== index) });
  };

  const removeColumn = (index: number) => {
    const newHeaders = headers.filter((_, i) => i !== index);
    const newRows = rows.map(row => row.filter((_, i) => i !== index));
    onChange({ headers: newHeaders, rows: newRows });
  };

  return (
    <div className="space-y-4 ">
      <div className="flex gap-2">
        <button
          onClick={addColumn}
          className="flex items-center gap-1 px-2 py-1 rounded border dark:border-gray-700 text-sm"
        >
          <Plus size={14} /> Add Column
        </button>
        <button
          onClick={addRow}
          className="flex items-center gap-1 px-2 py-1 rounded border dark:border-gray-700 text-sm"
        >
          <Plus size={14} /> Add Row
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index} className="p-1">
                  <div className="flex gap-2">
                    <div className=" flex-1">
                      <textarea
                        value={header}
                        onChange={(e) => updateHeader(index, e.target.value)}
                        onSelect={() => handleSelect(true, -1, index)}
                        onBlur={() => setTimeout(() => setSelection(null), 200)}
                        placeholder="Header..."
                        className="w-full h-10 px-2 py-1 rounded border  border-border bg-accent"
                        rows={2}
                      />
                      {activeCell?.isHeader && activeCell.colIndex === index && (
                        <InlineFormatToolbar
                          position={selection}
                          onFormat={handleFormat}
                        />
                      )}
                    </div>
                    <button
                      onClick={() => removeColumn(index)}
                      className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <Trash size={14} />
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <td key={colIndex} className="p-1">
                    <div className="relative ">
                      <textarea
                        value={cell}
                        onChange={(e) => updateCell(rowIndex, colIndex, e.target.value)}
                        onSelect={() => handleSelect(false, rowIndex, colIndex)}
                        onBlur={() => setTimeout(() => setSelection(null), 200)}
                        className="w-full h-10 px-2 py-1 rounded border  border-border bg-accent"
                        rows={2}
                      />
                      {activeCell && !activeCell.isHeader && 
                        activeCell.rowIndex === rowIndex && 
                        activeCell.colIndex === colIndex && (
                          <InlineFormatToolbar
                            position={selection}
                            onFormat={handleFormat}
                          />
                      )}
                    </div>
                  </td>
                ))}
                <td className="p-1">
                  <button
                    onClick={() => removeRow(rowIndex)}
                    className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Trash size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;