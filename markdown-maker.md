---

[![github-forks](https://img.shields.io/github/forks/facebook/react?style=flat-square)](https://github.com/facebook/react/network/members) [![github-issues](https://img.shields.io/github/issues/facebook/react?style=flat-square)](https://github.com/facebook/react/issues) [![license](https://img.shields.io/github/license/facebook/react?style=flat-square)](https://github.com/facebook/react/blob/main/LICENSE) [![license](https://img.shields.io/github/license/facebook/react?style=social)](https://github.com/facebook/react/blob/main/LICENSE)

`asasasasasasasasas`

- [x] 
- [x] d
- [ ] d

1 | 2
--- | ---
3 | 4
5 | 6

[]()

[asasasasas](assasasa)

> asasasasasasasasasasasa

![](https://cdn.pixabay.com/photo/2016/04/02/09/43/apple-1302430_1280.jpg)

1. 1
1. 2
1. 3
1. 4
1. 5

# dfdfdfdfdfdfdf

**dfdfdfd<sup>f</sup>dfd<sub>f</sub>dfdfdf**

import { marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import { gfmHeadingId } from 'marked-gfm-heading-id';
import hljs from 'highlight.js';
import { generateMarkdown } from '@/lib/markdown-generator';
import { MarkdownElement } from '../../../types/markdown';
import GeneratorBtns from './generator-btns';
import 'highlight.js/styles/github-dark.css';

// Configure marked with GitHub Flavored Markdown support
marked.use({
  gfm: true,
  breaks: true
});

// Add syntax highlighting
marked.use(markedHighlight({
  langPrefix: 'hljs language-',
  highlight(code, lang) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  }
}));

// Add GitHub-style heading IDs
marked.use(gfmHeadingId());

interface PreviewProps {
  markdown: MarkdownElement[];
}

function Preview({ markdown }: PreviewProps) {
  const htmlContent = marked(generateMarkdown(markdown));

  return (
    <div className="panel p-4 overflow-scroll">
      <div className='flex items-center justify-between'>
        <h2 className="panel-title">Preview</h2>
        <GeneratorBtns markdown={markdown} />
      </div>
      <div 
        className="prose dark:prose-invert overflow-y-scroll overflow-x-hidden break-words prose-slate 
          prose-headings:text-slate-900 dark:prose-headings:text-slate-100 
          prose-a:text-primary dark:prose-a:text-primary-dark
          prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:p-1 prose-code:rounded
          prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800 prose-pre:p-4 prose-pre:rounded
          prose-blockquote:border-l-4 prose-blockquote:border-gray-300 dark:prose-blockquote:border-gray-700
          prose-table:border prose-table:border-collapse
          prose-th:border prose-th:border-gray-300 dark:prose-th:border-gray-700 prose-th:p-2 prose-th:bg-gray-50 dark:prose-th:bg-gray-800
          prose-td:border prose-td:border-gray-300 dark:prose-td:border-gray-700 prose-td:p-2
          [&_.task-list-item]:list-none [&_.task-list-item]:pl-0
          [&_p>a>img]:inline-block [&_p>a>img]:m-0 [&_p>a]:inline-block [&_p>a]:m-0 [&_p]:flex [&_p]:flex-wrap [&_p]:gap-1 [&_p]:items-center"
        dangerouslySetInnerHTML={{ __html: htmlContent }} 
      />
    </div>
  );
}

export default Preview;

```javascript
import { marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import { gfmHeadingId } from 'marked-gfm-heading-id';
import hljs from 'highlight.js';
import { generateMarkdown } from '@/lib/markdown-generator';
import { MarkdownElement } from '../../../types/markdown';
import GeneratorBtns from './generator-btns';
import 'highlight.js/styles/github-dark.css';

// Configure marked with GitHub Flavored Markdown support
marked.use({
  gfm: true,
  breaks: true
});

// Add syntax highlighting
marked.use(markedHighlight({
  langPrefix: 'hljs language-',
  highlight(code, lang) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  }
}));

// Add GitHub-style heading IDs
marked.use(gfmHeadingId());

interface PreviewProps {
  markdown: MarkdownElement[];
}

function Preview({ markdown }: PreviewProps) {
  const htmlContent = marked(generateMarkdown(markdown));

  return (
    <div className="panel p-4 overflow-scroll">
      <div className='flex items-center justify-between'>
        <h2 className="panel-title">Preview</h2>
        <GeneratorBtns markdown={markdown} />
      </div>
      <div 
        className="prose dark:prose-invert overflow-y-scroll overflow-x-hidden break-words prose-slate 
          prose-headings:text-slate-900 dark:prose-headings:text-slate-100 
          prose-a:text-primary dark:prose-a:text-primary-dark
          prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:p-1 prose-code:rounded
          prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800 prose-pre:p-4 prose-pre:rounded
          prose-blockquote:border-l-4 prose-blockquote:border-gray-300 dark:prose-blockquote:border-gray-700
          prose-table:border prose-table:border-collapse
          prose-th:border prose-th:border-gray-300 dark:prose-th:border-gray-700 prose-th:p-2 prose-th:bg-gray-50 dark:prose-th:bg-gray-800
          prose-td:border prose-td:border-gray-300 dark:prose-td:border-gray-700 prose-td:p-2
          [&_.task-list-item]:list-none [&_.task-list-item]:pl-0
          [&_p>a>img]:inline-block [&_p>a>img]:m-0 [&_p>a]:inline-block [&_p>a]:m-0 [&_p]:flex [&_p]:flex-wrap [&_p]:gap-1 [&_p]:items-center"
        dangerouslySetInnerHTML={{ __html: htmlContent }} 
      />
    </div>
  );
}

export default Preview;
```

