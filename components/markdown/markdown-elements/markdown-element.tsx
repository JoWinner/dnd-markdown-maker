import { MarkdownElement as MarkdownElementType } from '@/types/markdown';
import Heading from "./heading";
import Paragraph from "./paragraph";
import List from "./list";
import ImageElement from "./image-element";
import Blockquote from "./blockquote";
import CodeBlock from "./code-block";
import InlineCode from "./inline-code";
import Link from "./link";
import HorizontalRule from "./horizontal-rule";
import Table from "./table";
import CheckboxList from "./checkbox-list";
import BadgeContainer from "./badge-container";

interface MarkdownElementProps {
  element: MarkdownElementType;
  updateElement: (id: string, updates: Partial<MarkdownElementType>) => void;
  removeElement: (id: string) => void;
  onBadgeConfig?: (containerId: string) => void;
}

function MarkdownElement({ element, updateElement, removeElement, onBadgeConfig }: MarkdownElementProps) {
  if (element.type === 'badge-container') {
    return (
      <div>
        <BadgeContainer
          id={element.id}
          badges={element.badges}
          onChange={updates => updateElement(element.id, updates)}
          onBadgeConfig={onBadgeConfig}
        />
      </div>
    );
  }

  switch (element.type) {
    case 'heading':
      return (
        <div>
          <Heading
            content={element.content}
            level={element.level}
            onChange={updates => updateElement(element.id, updates)}
          />
        </div>
      );
    case 'paragraph':
      return (
        <div>
          <Paragraph
            content={element.content}
            onChange={updates => updateElement(element.id, updates)}
          />
        </div>
      );
    case 'list':
      return (
        <div>
          <List
            items={element.items}
            ordered={element.ordered}
            onChange={updates => updateElement(element.id, updates)}
          />
        </div>
      );
    case 'image':
      return (
        <div>
          <ImageElement
            url={element.url}
            alt={element.alt}
            onChange={updates => updateElement(element.id, updates)}
          />
        </div>
      );
    case 'blockquote':
      return (
        <div>
          <Blockquote
            content={element.content}
            onChange={updates => updateElement(element.id, updates)}
          />
        </div>
      );
    case 'code':
      return (
        <div>
          <CodeBlock
            content={element.content}
            language={element.language}
            onChange={updates => updateElement(element.id, updates)}
          />
        </div>
      );
    case 'inlineCode':
      return (
        <div>
          <InlineCode
            content={element.content}
            onChange={updates => updateElement(element.id, updates)}
          />
        </div>
      );
    case 'link':
      return (
        <div>
          <Link
            text={element.text}
            url={element.url}
            onChange={updates => updateElement(element.id, updates)}
          />
        </div>
      );
    case 'hr':
      return (
        <div>
          <HorizontalRule />
        </div>
      );
    case 'table':
      return (
        <div>
          <Table
            headers={element.headers}
            rows={element.rows}
            onChange={updates => updateElement(element.id, updates)}
          />
        </div>
      );
    case 'checkbox':
      return (
        <div>
          <CheckboxList
            items={element.items}
            onChange={updates => updateElement(element.id, updates)}
          />
        </div>
      );
    default:
      return null;
  }
}

export default MarkdownElement;
