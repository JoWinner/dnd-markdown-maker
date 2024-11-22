import { marked } from 'marked';
import { generateMarkdown } from '@/lib/markdown-generator';
import { MarkdownElement } from '../../../types/markdown';
import GeneratorBtns from './generator-btns';

interface PreviewProps {
  markdown: MarkdownElement[];
}

function Preview({ markdown }: PreviewProps) {
  const htmlContent = marked(generateMarkdown(markdown));

  return (
    <div className="panel p-4 overflow-scroll">
      <div className='flex items-center justify-between'>

        <h2 className="panel-title">Preview</h2>
        <GeneratorBtns
            markdown={markdown}
          />
            </div>
        <div 
        className="prose dark:prose-invert overflow-y-scroll  overflow-x-hidden break-words prose-slate prose-headings:text-slate-900 dark:prose-headings:text-slate-100 prose-a:text-primary dark:prose-a:text-primary-dark"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  );
}

export default Preview;