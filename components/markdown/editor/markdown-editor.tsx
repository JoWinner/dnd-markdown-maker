import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import SortableMarkdownElement from '../markdown-elements/sortable-markdown-element';
import { MarkdownElement } from '../../../types/markdown';
import Link from 'next/link';

interface MarkdownEditorProps {
  markdown: MarkdownElement[];
  setMarkdown: React.Dispatch<React.SetStateAction<MarkdownElement[]>>;
  moveElement: (id: string, direction: 'up' | 'down') => void;
  collapsed: boolean;
  onBadgeConfig?: (containerId: string) => void;
}

function MarkdownEditor({ markdown, setMarkdown, moveElement, collapsed, onBadgeConfig}: MarkdownEditorProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: 'editor',
  });


  const updateElement = (id: string, updates: Partial<MarkdownElement>) => {
    setMarkdown(prev => prev.map(element => 
      element.id === id ? { ...element, ...updates } : element
    ) as MarkdownElement[]);
  };

  const removeElement = (id: string) => {
    setMarkdown(prev => prev.filter(element => element.id !== id) as MarkdownElement[]);
  };

  return (
    <div 
      ref={setNodeRef}
      className={`panel p-4 min-h-[600px] overflow-scroll transition-all ${
        isOver && markdown.length === 0 ? 'ring-2 ring-primary dark:ring-primary-dark' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <h2 className="panel-title">{collapsed ? '✏️' : 'Editor'}</h2>
        <Link 
          href="/dashboard" 
          className="text-sm text-muted-foreground hover:text-primary transition-colors mb-4"
        >
          {'<--- dashboard'}
        </Link>
      </div>
      <div className="space-y-4">
        <SortableContext 
          items={markdown.map(item => item.id)}
          strategy={verticalListSortingStrategy}
        >
          {markdown.map((element) => (
            <SortableMarkdownElement
              key={element.id}
              element={element}
              updateElement={updateElement}
              removeElement={removeElement}
              moveElement={moveElement}
              onBadgeConfig={onBadgeConfig}
            />
          ))}
        </SortableContext>
        {markdown.length === 0 && (
          <div className="text-center text-slate-500 dark:text-slate-400 py-12 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg">
            Drag elements here to start building your markdown
          </div>
        )}
      </div>
    </div>
  );
}

export default MarkdownEditor;