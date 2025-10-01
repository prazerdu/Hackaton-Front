'use client'
import { useState } from 'react'
import CommentForm from './componentes comment/CommentForm'
import CommentList from './componentes comment/CommentList'

type CommentType = {
  name: string
  message: string
  timestamp: string
}

export default function App() {
  const [comments, setComments] = useState<CommentType[]>([])

  const handleAddComment = (comment: CommentType) => {
    setComments([comment, ...comments])
  }

  return (
    <div className="flex justify-center items-center min-w-screen min-h-screen bg-neutral-100">
    <div className="min-w-[30rem] p-6 bg-white shadow-md rounded-md mt-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Comentários</h1>
      <CommentForm onAddComment={handleAddComment} />
      <CommentList comments={comments} />
    </div>
    </div>
  )
}
