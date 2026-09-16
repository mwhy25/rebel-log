'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';

function ToolbarButton({ onClick, active, children, title }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      style={{
        background: active ? 'var(--red)' : 'transparent',
        color: active ? 'var(--black)' : 'var(--white)',
        border: '1px solid #333',
        padding: '0.35rem 0.7rem',
        cursor: 'pointer',
        fontSize: '0.85rem',
        fontWeight: 700,
      }}
    >
      {children}
    </button>
  );
}

export default function RichEditor({ value, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
    ],
    content: value || '',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        style: 'min-height: 180px; outline: none; padding: 1rem; color: var(--white); line-height: 1.7;',
      },
    },
  });

  if (!editor) return null;

  function setLink() {
    const prevUrl = editor.getAttributes('link').href;
    const url = window.prompt('Masukkan URL link:', prevUrl || 'https://');
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }

  return (
    <div style={{ border: '1px solid #333', background: '#1c1c1c' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', padding: '0.6rem', borderBottom: '1px solid #333' }}>
        <ToolbarButton title="Bold" active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()}>B</ToolbarButton>
        <ToolbarButton title="Italic" active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()}><i>I</i></ToolbarButton>
        <ToolbarButton title="Strikethrough" active={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()}>S</ToolbarButton>
        <ToolbarButton title="Heading" active={editor.isActive('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</ToolbarButton>
        <ToolbarButton title="Daftar poin" active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()}>• List</ToolbarButton>
        <ToolbarButton title="Daftar nomor" active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()}>1. List</ToolbarButton>
        <ToolbarButton title="Kutipan" active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()}>&ldquo;&rdquo;</ToolbarButton>
        <ToolbarButton title="Tambah link" active={editor.isActive('link')} onClick={setLink}>🔗</ToolbarButton>
        <ToolbarButton title="Hapus format" onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}>✕</ToolbarButton>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
