/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Badge, BadgeContainerElement } from '@/types/markdown';
import { Github } from 'lucide-react';

interface BadgeContainerProps {
  id: string;
  badges: Badge[];
  onChange: (updates: Partial<BadgeContainerElement>) => void;
  onBadgeConfig?: (containerId: string) => void;
}

const BadgeContainer: React.FC<BadgeContainerProps> = ({
  id,
  badges,
  onChange,
  onBadgeConfig,
}) => {
  const handleOpenConfig = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onBadgeConfig) {
      onBadgeConfig(id);
    }
  };

  const handleRemoveBadge = (badgeId: string) => {
    onChange({
      badges: badges.filter(b => b.id !== badgeId)
    });
  };

  const getBadgeUrl = (badge: Badge): string => {
    switch (badge.type) {
      case 'github-stars':
        return `https://img.shields.io/github/stars/${badge.username}/${badge.repository}?style=${badge.style}`;
      case 'github-forks':
        return `https://img.shields.io/github/forks/${badge.username}/${badge.repository}?style=${badge.style}`;
      case 'github-issues':
        return `https://img.shields.io/github/issues/${badge.username}/${badge.repository}?style=${badge.style}`;
      case 'github-prs':
        return `https://img.shields.io/github/issues-pr/${badge.username}/${badge.repository}?style=${badge.style}`;
      case 'license':
        return `https://img.shields.io/github/license/${badge.username}/${badge.repository}?style=${badge.style}`;
      default:
        return '';
    }
  };

  const getLinkUrl = (badge: Badge): string => {
    if (!badge.username || !badge.repository) return '';
    
    switch (badge.type) {
      case 'github-stars':
        return `https://github.com/${badge.username}/${badge.repository}/stargazers`;
      case 'github-forks':
        return `https://github.com/${badge.username}/${badge.repository}/network/members`;
      case 'github-issues':
        return `https://github.com/${badge.username}/${badge.repository}/issues`;
      case 'github-prs':
        return `https://github.com/${badge.username}/${badge.repository}/pulls`;
      case 'license':
        return `https://github.com/${badge.username}/${badge.repository}/blob/main/LICENSE`;
      default:
        return '';
    }
  };

  return (
    <div className="relative group p-4 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
      <div className="absolute -top-3 left-2 flex space-x-2">
        <button
          onClick={handleOpenConfig}
          className="bg-white dark:bg-gray-800 p-1 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700"
          type="button"
        >
          <Github size={16} />
        </button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {badges.map((badge) => (
          <div key={badge.id} className="relative group/badge">
            <a href={getLinkUrl(badge)} target="_blank" rel="noopener noreferrer">
              <img src={getBadgeUrl(badge)} alt={badge.type} className="h-5" />
            </a>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleRemoveBadge(badge.id);
              }}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center opacity-0 group-hover/badge:opacity-100 transition-opacity"
              type="button"
            >
              ×
            </button>
          </div>
        ))}
        {badges.length === 0 && (
          <div className="text-sm text-gray-500">
            Click the GitHub icon to add badges
          </div>
        )}
      </div>
    </div>
  );
};

export default BadgeContainer;
