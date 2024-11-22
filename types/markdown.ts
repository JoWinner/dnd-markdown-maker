// Base interface for all markdown elements
export interface BaseMarkdownElement {
  id: string;
  type: MarkdownElementType;
  content?: string;
}

export type MarkdownElementType = 
  | 'heading'
  | 'paragraph'
  | 'list'
  | 'image'
  | 'blockquote'
  | 'code'
  | 'inlineCode'
  | 'link'
  | 'hr'
  | 'table'
  | 'checkbox'
  | 'badge-container';

// Specific element interfaces
export interface HeadingElement extends BaseMarkdownElement {
  type: 'heading';
  level: 1 | 2 | 3 | 4 | 5 | 6;
  content: string;
}

export interface ParagraphElement extends BaseMarkdownElement {
  type: 'paragraph';
  content: string;
}

export interface ListElement extends BaseMarkdownElement {
  type: 'list';
  items: string[];
  ordered: boolean;
}

export interface ImageElement extends BaseMarkdownElement {
  type: 'image';
  url: string;
  alt: string;
}

export interface BlockquoteElement extends BaseMarkdownElement {
  type: 'blockquote';
  content: string;
}

export interface CodeElement extends BaseMarkdownElement {
  type: 'code';
  content: string;
  language: string;
}

export interface InlineCodeElement extends BaseMarkdownElement {
  type: 'inlineCode';
  content: string;
}

export interface LinkElement extends BaseMarkdownElement {
  type: 'link';
  text: string;
  url: string;
}

export interface HorizontalRuleElement extends BaseMarkdownElement {
  type: 'hr';
}

export interface TableElement extends BaseMarkdownElement {
  type: 'table';
  headers: string[];
  rows: string[][];
}

export interface CheckboxItem {
  text: string;
  checked: boolean;
}

export interface CheckboxElement extends BaseMarkdownElement {
  type: 'checkbox';
  items: CheckboxItem[];
}

export type BadgeType = 
  | 'github-stars'
  | 'github-forks'
  | 'github-issues'
  | 'github-prs'
  | 'license'
  | 'custom';

export type BadgeStyle = 'flat' | 'flat-square' | 'plastic' | 'for-the-badge' | 'social';

export interface Badge {
  id: string;
  type: BadgeType;
  username: string;
  repository: string;
  style: BadgeStyle;
}

export interface BadgeContainerElement extends BaseMarkdownElement {
  type: 'badge-container';
  badges: Badge[];
}

// Union type of all possible markdown elements
export type MarkdownElement =
  | HeadingElement
  | ParagraphElement
  | ListElement
  | ImageElement
  | BlockquoteElement
  | CodeElement
  | InlineCodeElement
  | LinkElement
  | HorizontalRuleElement
  | TableElement
  | CheckboxElement
  | BadgeContainerElement;

// Editor component props
export interface MarkdownEditorProps {
  markdown: MarkdownElement[];
  onChange: (elements: MarkdownElement[]) => void;
}

// Preview component props
export interface MarkdownPreviewProps {
  markdown: MarkdownElement[];
}

// Sidebar component props
export interface MarkdownSidebarProps {
  collapsed: boolean;
}

// Header component props
export interface HeaderProps {
  onExport?: () => void;
  onSave?: () => void;
}
