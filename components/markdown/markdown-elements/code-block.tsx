interface CodeBlockProps {
  content?: string;
  language?: string;
  onChange: (params: { content?: string; language?: string }) => void;
}

function CodeBlock({ content = '', language = '', onChange }: CodeBlockProps) {
  const languages = [
    'javascript', 'python', 'java', 'cpp', 'ruby', 'php',
    'html', 'css', 'markdown', 'sql', 'bash', 'json'
  ] as const;

  return (
    <div className="space-y-2">
      <select
        value={language}
        onChange={(e) => onChange({ language: e.target.value })}
        className="px-2 py-1 rounded border  border-border bg-accent"
      >
        <option value="">Select language</option>
        {languages.map(lang => (
          <option key={lang} value={lang}>{lang}</option>
        ))}
      </select>
      <textarea
        value={content}
        onChange={(e) => onChange({ content: e.target.value })}
        placeholder="Code here..."
        rows={5}
        className="w-full px-2 py-1 rounded border  border-border bg-accent font-mono resize-y"
      />
    </div>
  );
}

export default CodeBlock;