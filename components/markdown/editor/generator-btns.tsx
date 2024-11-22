import { Download, Copy } from 'lucide-react';
import { generateMarkdown } from '@/lib/markdown-generator';
import { Button } from '@/components/ui/button';
import { MarkdownElement } from '@/types/markdown';

interface GeneratorBtnsProps {
  markdown: MarkdownElement[];
}

function GeneratorBtns({ markdown }: GeneratorBtnsProps) {
  const handleExport = () => {
    const content = generateMarkdown(markdown);
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'markdown-maker.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = async () => {
    const content = generateMarkdown(markdown);
    await navigator.clipboard.writeText(content);
    alert('Copied to clipboard!');
  };

  return (
    <div className="flex items-center ">
      <div className="flex items-center justify-between mb-4 gap-3">
        <Button
          variant="outline"
          onClick={handleCopy}
          className="flex items-center gap-2"
        >
          <Copy size={16} /> Copy
        </Button>
        <Button
          variant="outline"
          onClick={handleExport}
          className="flex items-center gap-2"
        >
          <Download size={16} /> Export
        </Button>
      </div>
    </div>
  );
}

export default GeneratorBtns;