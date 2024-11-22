import { MarkdownElement, Badge } from '../types/markdown';

const generateBadgeMarkdown = (badge: Badge): string => {
  const badgeUrl = (() => {
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
  })();

  const linkUrl = (() => {
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
  })();

  return `[![${badge.type}](${badgeUrl})](${linkUrl})`;
};

export const generateMarkdown = (elements: MarkdownElement[]): string => {
  return elements.map(element => {
    switch (element.type) {
      case 'heading':
        return `${'#'.repeat(element.level)} ${element.content}\n\n`;
      case 'paragraph':
        return `${element.content}\n\n`;
      case 'list':
        return element.items.map((item, index) => 
          `${element.ordered ? `${index + 1}. ` : '- '}${item}`
        ).join('\n') + '\n\n';
      case 'image':
        return `![${element.alt}](${element.url})\n\n`;
      case 'blockquote':
        return `> ${element.content}\n\n`;
      case 'code':
        return `\`\`\`${element.language}\n${element.content}\n\`\`\`\n\n`;
      case 'inlineCode':
        return `\`${element.content}\`\n\n`;
      case 'link':
        return `[${element.text}](${element.url})\n\n`;
      case 'hr':
        return '---\n\n';
      case 'table':
        const headers = element.headers.join(' | ');
        const separator = element.headers.map(() => '---').join(' | ');
        const rows = element.rows.map(row => row.join(' | ')).join('\n');
        return `${headers}\n${separator}\n${rows}\n\n`;
      case 'checkbox':
        return element.items.map(item => 
          `- [${item.checked ? 'x' : ' '}] ${item.text}`
        ).join('\n') + '\n\n';
      case 'badge-container':
        return element.badges.map(badge => generateBadgeMarkdown(badge)).join(' ') + '\n\n';
      default:
        return '';
    }
  }).join('');
};