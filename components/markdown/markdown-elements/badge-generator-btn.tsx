import React from 'react';
import { Shield } from 'lucide-react';
import { useDraggable } from '@dnd-kit/core';

interface BadgeGeneratorBtnProps {
  id: string;
}

const BadgeGeneratorBtn: React.FC<BadgeGeneratorBtnProps> = ({ id }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: id,
    data: {
      type: 'badge-container',
      badges: [],
    },
  });

  return (
    <button
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`
        w-full p-3 mb-2 flex items-center gap-2 rounded-lg
        text-gray-700 dark:text-gray-300
        hover:bg-gray-100 dark:hover:bg-gray-700
        border border-gray-200 dark:border-gray-600
        transition-colors duration-200
        ${isDragging ? 'opacity-50' : 'opacity-100'}
      `}
      style={{
        touchAction: 'none',
      }}
    >
      <Shield className="w-5 h-5" />
      <span className="text-sm font-medium">Badge Container</span>
    </button>
  );
};

export default BadgeGeneratorBtn;
