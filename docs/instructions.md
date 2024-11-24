
---

### Prompt

I want to create a standalone no-code markdown maker app in **React** with **Tailwind CSS** for styling. The app should allow users to build markdown documents through a **drag-and-drop** interface and view a **live preview** of the generated markdown. Users should be able to export the final markdown as a `.md` file or copy it to the clipboard. Here's a breakdown of what I need you to code:

1. **Set up the Project**:
   - Initialize a React project using **Vite**.
   - Install **Tailwind CSS** for styling, **react-dnd** for drag-and-drop, and **marked.js** for Markdown parsing.
   - Configure Tailwind CSS for the project, adding it to `src/index.css`.

2. **Define Components and Project Structure**:
   - Set up a `components/` folder with the following structure:
     ```
     src/
      ├── components/
      │   ├── Sidebar.js                // Sidebar with draggable markdown elements
      │   ├── MarkdownEditor.js         // Editor workspace for dropped elements
      │   ├── Preview.js                // Markdown preview area
      │   ├── Header.js                 // Top navigation or header for export buttons
      │   ├── markdown-elements/        // Individual markdown components
      │   │   ├── Heading.js            // Represents headings (H1, H2, etc.)
      │   │   ├── Paragraph.js          // Basic paragraph text
      │   │   ├── List.js               // Ordered and unordered lists
      │   │   ├── Image.js              // Embeds images by URL
      │   │   ├── Blockquote.js         // Blockquote section for quoting text
      │   │   ├── CodeBlock.js          // Code block for multi-line code with syntax highlighting
      │   │   ├── InlineCode.js         // Inline code snippet for single-line code in text
      │   │   ├── Link.js               // Hyperlinks with text and URL
      │   │   ├── HorizontalRule.js     // Horizontal line or divider
      │   │   ├── Table.js              // Markdown table with customizable rows and columns
      │   │   └── CheckboxList.js       // Checkbox list for to-do items or tasks
      └── App.js

     ```

3. **Sidebar Component** (`Sidebar.js`):
   - Create a sidebar that displays markdown elements users can drag into the editor (heading, paragraph, list, image).
   - Each element should be draggable and represented by a unique identifier.

4. **MarkdownEditor Component** (`MarkdownEditor.js`):
   - Create the main workspace for users to drag and drop markdown elements.
   - Set up React DnD to allow elements to be dragged from the `Sidebar` into this editor space.
   - As elements are dropped, they should be added to an ordered list within the editor.

5. **Markdown Element Components** (`Heading.js`, `Paragraph.js`, etc.):
   ## Detailed Description of Each Component
         - **Heading.js**: For headings (H1–H6) with an option to select the level.
         - **Paragraph.js**: Standard paragraph text.
         - **List.js**: Supports ordered (`1.`) and unordered (`*`) lists, with the ability to add multiple list items.
         - **Image.js**: Allows users to embed an image by providing a URL. Optionally includes fields for captions and alt text.
         - **Blockquote.js**: For quoting text in markdown using the `>` syntax.
         - **CodeBlock.js**: Multi-line code blocks using triple backticks (```) with optional syntax highlighting based on language selection.
         - **InlineCode.js**: Single-line inline code snippets using single backticks (`) for highlighting code within text.
         - **Link.js**: Creates hyperlinks with options for link text and URL.
         - **HorizontalRule.js**: Horizontal divider line using `---` or `***`.
         - **Table.js**: Table creation with customizable rows and columns. Users should be able to add, remove, and edit cells.
         - **CheckboxList.js**: Checkbox list for creating to-do lists with items that can be checked off.

   - Each element should update the markdown state when edited, so the markdown syntax is generated dynamically.

6. **Preview Component** (`Preview.js`):
   - Create a preview section that renders the markdown as HTML.
   - Use **marked.js** to parse the markdown content and display it with styling from Tailwind CSS.
   - Update the preview in real-time as users edit the markdown components.

7. **Markdown State Management**:
   - Use **React Context API** or **Redux** to manage the app’s markdown state globally.
   - Store each markdown element as an object in a list within the state, with properties (e.g., type, content, settings) that define its structure.
   - This state should reflect any modifications in the `MarkdownEditor` and update the preview dynamically.

8. **Export and Copy Features**:
   - Add export and copy-to-clipboard functions in a **Header** component:
     - **Export as .md file**: Implement a function that converts the markdown state to a `.md` file and triggers a download.
     - **Copy to Clipboard**: Add a button that copies the markdown to the clipboard using `navigator.clipboard.writeText()`.

9. **Styling**:
   - Use **Tailwind CSS** to style each component, giving the app a clean, modern look.
   - Implement a responsive layout for mobile and desktop views.
   - Optional: Include a dark mode toggle using Tailwind's dark theme.

10. **Testing**:
    - Write tests for the components, focusing on:
      - Ensuring each markdown element displays correctly when dragged and edited.
      - Verifying the markdown export and clipboard features work as expected.
      - Testing drag-and-drop behavior to ensure components are positioned and ordered correctly.

11. **Deployment**:
    - Prepare the app for deployment on **Vercel**.

---


Add these markdown elements in addition to the ones we already have:
Italic, bold, subscript, superscript, strikethrough, newline

Don't change element implementation style, dont change coding style. Refer to the other elements and implement them the same way they were implemented.

I havnt used proptypes so don't use it yet in the new elements




Create a SaaS boilerplate for an app with
Next.js14 (app router), NextAuth, Typescript, Prisma, Supabase (Postgres), Lemon Squeezy for Subscriptions and plan management, shadcn/ui, Lucide icons, Tailwindcss, zod, Account Pages.

- write the instructions needed to setup and run the boilerplate app.
- Write a seperate ".env.example" file for the environment viariables needed.
- The app I would build is about markdown, so i want a markdown-looking-design for the landing.

// const newElement: MarkdownElement = {
      //   id: crypto.randomUUID(),
      //   type: data.type,
      //   content: "",
      //   ...(data.type === "list" && {
      //     items: [""],
      //     ordered: false,
      //   }),
      //   ...(data.type === "table" && {
      //     headers: [""],
      //     rows: [[""]],
      //   }),
      //   ...(data.type === "checkbox" && {
      //     items: [{ text: "", checked: false }],
      //   }),
      //   ...(data.type === "heading" && {
      //     level: 1,
      //   }),
      //   ...(data.type === "image" && {
      //     url: "",
      //     alt: "",
      //   }),
      //   ...(data.type === "link" && {
      //     text: "",
      //     url: "",
      //   }),
      //   ...(data.type === "code" && {
      //     language: "",
      //   }),
      // };

1. Direct GitHub repository integration
2. Export options (HTML, PDF)
3. Cloud storage integration
Enhanced markdown toolbar



this is still not solved. issue is that I have two emails 123@gmail and abc@gmail.com. I have connected the app to 123@gmail.com, but I have only a github account with abc@gmail.com. So when try to connect to github through abc@gmail.com, it logs out 123@gmail from the app and signs in abc@gmail.com to the app and github.

I think instead of just maintaining the auth session for 123@gmail.com and seperate the connection for repo soley for abc@gmail.com it rather create a new auth session and logs 123@gmail.com out and signs in abc@gmail.com.

these flow must be seperated somehow. Please lets fix it



The connect to https://github.com/login/oauth/authorize?client_id=Ov23liztp3AOFfLIeuPo&scope=read:user%20user:email%20repo&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fdashboard

Be careful!

The redirect_uri is not associated with this application.

The application might be misconfigured or could be trying to redirect you to a website you weren't expecting.


http://localhost:3000/login?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2Fdashboard&error=OAuthCallback