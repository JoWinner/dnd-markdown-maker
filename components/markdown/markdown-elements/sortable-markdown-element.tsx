import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { X, GripVertical, ChevronUp, ChevronDown } from 'lucide-react';
import MarkdownElement from './markdown-element';
import { MarkdownElement as MarkdownElementType } from '@/types/markdown';

interface SortableMarkdownElementProps {
  element: MarkdownElementType;
  updateElement: (id: string, updates: Partial<MarkdownElementType>) => void;
  removeElement: (id: string) => void;
  moveElement: (id: string, direction: 'up' | 'down') => void;
  onBadgeConfig?: (containerId: string) => void;
}

function SortableMarkdownElement({ element, updateElement, removeElement, moveElement, onBadgeConfig }: SortableMarkdownElementProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    isOver,
  } = useSortable({ id: element.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`markdown-element group relative ${
        isDragging ? 'opacity-50  ring-2 ring-primary dark:ring-primary-dark' : ''
      } ${isOver ? 'ring-2 ring-primary dark:ring-primary-dark' : ''}`}
    >
      <div className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
       
        <div className="flex flex-col gap-0.5">
          <button
            onClick={() => moveElement(element.id, 'up')}
            className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400"
          >
            <ChevronUp size={16} />
          </button>
          <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400"
        >
          <GripVertical size={16} />
        </div>
          <button
            onClick={() => moveElement(element.id, 'down')}
            className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400"
          >
            <ChevronDown size={16} />
          </button>
        </div>
      </div>
      
      <button
        onClick={() => removeElement(element.id)}
        className="absolute z-10 top-2 right-2 p-1.5 rounded-md hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500 dark:text-red-400
                   opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <X size={16} />
      </button>

      <div className="pl-6">
        <MarkdownElement
          element={element}
          updateElement={updateElement}
          removeElement={removeElement}
          onBadgeConfig={onBadgeConfig}
        />
      </div>
    </div>
  );
}

export default SortableMarkdownElement;