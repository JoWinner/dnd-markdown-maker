interface InlineCodeProps {
  content?: string;
  onChange: (params: { content: string }) => void;
}

function InlineCode({ content = '', onChange }: InlineCodeProps) {
  return (
    <input
      type="text"
      value={content}
      onChange={(e) => onChange({ content: e.target.value })}
      placeholder="Inline code..."
      className="w-full px-2 py-1 rounded border  border-border bg-accent font-mono"
    />
  );
}

export default InlineCode;