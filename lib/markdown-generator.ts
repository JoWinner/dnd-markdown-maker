import { MarkdownElement } from '../types/markdown';

export const generateMarkdown = (elements: MarkdownElement[]): string => {
  return elements.map(element => {
    switch (element.type) {
      case 'heading':
        return `${'#'.repeat(element.level)} ${element.content}\n\n`;
      case 'paragraph':
        return `${element.content}\n\n`;
      case 'list':
        return element.items.map(item => 
          `${element.ordered ? '1. ' : '- '}${item}`
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
      default:
        return '';
    }
  }).join('');
}; 