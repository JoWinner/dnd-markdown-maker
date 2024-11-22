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

const components = {
  heading: Heading,
  paragraph: Paragraph,
  list: List,
  image: ImageElement,
  blockquote: Blockquote,
  code: CodeBlock,
  inlineCode: InlineCode,
  link: Link,
  hr: HorizontalRule,
  table: Table,
  checkbox: CheckboxList,
};

function MarkdownElement({ element, updateElement }) {
  const Component = components[element.type];

  if (!Component) return null;

  return (
    <div>
      <Component
        {...element}
        onChange={(updates) => updateElement(element.id, updates)}
      />
    </div>
  );
}

export default MarkdownElement;
