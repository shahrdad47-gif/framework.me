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
        modules={{ toolbar: TOOLBAR }}
        placeholder={placeholder}
      />
    </div>
  )
}
