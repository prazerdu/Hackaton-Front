import { useState } from 'react'

type CommentFormProps = {
  onAddComment: (comment: {
    name: string
    message: string
    timestamp: string
  }) => void
}

export default function CommentForm({ onAddComment }: CommentFormProps) {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !message.trim()) return

    const newComment = {
      name,
      message,
      timestamp: new Date().toLocaleString(),
    }

    onAddComment(newComment)
    setName('')
    setMessage('')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <div>
        <label className="block font-semibold mb-1">Nome:</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">Mensagem:</label>
        <textarea
          className="w-full border border-gray-300 rounded px-3 py-2 resize-y h-24 focus:outline-none focus:ring-2 focus:ring-gray-500"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
      >
        Enviar
      </button>
    </form>
  )
}
