'use client'
import dynamic from 'next/dynamic'
import 'react-quill-new/dist/quill.snow.css'

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false })

const TOOLBAR = [
  [{ header: [1, 2, 3, false] }],
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['link'],
  ['clean'],
]

// Quill's built-in link tooltip silently no-ops if no text is selected when
// the toolbar button is clicked — a common source of "the link button
// doesn't do anything" reports. Replace it with a plain prompt() that works
// whether or not text is selected.
function linkHandler(this: { quill: import('quill').default }, value: boolean) {
  const quill = this.quill
  if (!value) {
    const range = quill.getSelection()
    if (range) quill.format('link', false)
    return
  }

  const range = quill.getSelection(true)
  const url = window.prompt('Enter a URL:')
  if (!url) return

  if (range && range.length > 0) {
    quill.formatText(range.index, range.length, 'link', url, 'user')
  } else {
    const index = range ? range.index : quill.getLength()
    quill.insertText(index, url, 'link', url, 'user')
    quill.setSelection(index + url.length, 0, 'user')
  }
}

const MODULES = {
  toolbar: {
    container: TOOLBAR,
    handlers: { link: linkHandler },
  },
}

interface QuillEditorProps {
  value: string
  onChange: (html: string) => void
  placeholder?: string
}

export default function QuillEditor({ value, onChange, placeholder }: QuillEditorProps) {
  return (
    <div className="admin-quill">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={MODULES}
        placeholder={placeholder}
      />
    </div>
  )
}
