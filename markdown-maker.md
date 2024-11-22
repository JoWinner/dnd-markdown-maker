# The Code here

const newElement: MarkdownElement = (() => {
  switch (data.type) {
    case 'list':
      return {
        id: crypto.randomUUID(),
        type: 'list',
        content: '',
        items: [''],
        ordered: false,
      };
    case 'table':
      return {
        id: crypto.randomUUID(),
        type: 'table',
        headers: [''],
        rows: [['']],
      };
    case 'checkbox':
      return {
        id: crypto.randomUUID(),
        type: 'checkbox',
        items: [{ text: '', checked: false }],
      };
    case 'heading':
      return {
        id: crypto.randomUUID(),
        type: 'heading',
        content: '',
        level: 1,
      };
    case 'image':
      return {
        id: crypto.randomUUID(),
        type: 'image',
        url: '',
        alt: '',
        content: '',
      };
    case 'link':
      return {
        id: crypto.randomUUID(),
        type: 'link',
        text: '',
        url: '',
      };
    case 'paragraph':
      return {
        id: crypto.randomUUID(),
        type: 'paragraph',
        content: '',
      };
    default:
      throw new Error(`Unsupported markdown element type: ${data.type}`);
  }
})()

- 1
- 2

![](https://cdn.pixabay.com/photo/2016/04/02/09/43/apple-1302430_1280.jpg)



