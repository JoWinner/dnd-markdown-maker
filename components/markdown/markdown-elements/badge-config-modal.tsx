import React, { useState } from 'react';
import { Badge, BadgeStyle, BadgeType } from '@/types/markdown';

interface BadgeConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBadge: (badge: Omit<Badge, 'id'>) => void;
  defaultValues?: Partial<Badge>;
}

const badgeTypes: { value: BadgeType; label: string }[] = [
  { value: 'github-stars', label: 'GitHub Stars' },
  { value: 'github-forks', label: 'GitHub Forks' },
  { value: 'github-issues', label: 'GitHub Issues' },
  { value: 'github-prs', label: 'GitHub Pull Requests' },
  { value: 'license', label: 'License' },
];

const badgeStyles: { value: BadgeStyle; label: string }[] = [
  { value: 'flat', label: 'Flat' },
  { value: 'flat-square', label: 'Flat Square' },
  { value: 'plastic', label: 'Plastic' },
  { value: 'for-the-badge', label: 'For The Badge' },
  { value: 'social', label: 'Social' },
];

const BadgeConfigModal: React.FC<BadgeConfigModalProps> = ({
  isOpen,
  onClose,
  onAddBadge,
  defaultValues = {},
}) => {
  const [type, setType] = useState<BadgeType>(defaultValues.type || 'github-stars');
  const [username, setUsername] = useState(defaultValues.username || '');
  const [repository, setRepository] = useState(defaultValues.repository || '');
  const [style, setStyle] = useState<BadgeStyle>(defaultValues.style || 'flat');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddBadge({
      type,
      username,
      repository,
      style,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Configure Badge</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Badge Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as BadgeType)}
                className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
              >
                {badgeTypes.map((badgeType) => (
                  <option key={badgeType.value} value={badgeType.value}>
                    {badgeType.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">GitHub Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                placeholder="e.g., facebook"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Repository Name</label>
              <input
                type="text"
                value={repository}
                onChange={(e) => setRepository(e.target.value)}
                className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                placeholder="e.g., react"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Badge Style</label>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value as BadgeStyle)}
                className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
              >
                {badgeStyles.map((badgeStyle) => (
                  <option key={badgeStyle.value} value={badgeStyle.value}>
                    {badgeStyle.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm border rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add Badge
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BadgeConfigModal;
