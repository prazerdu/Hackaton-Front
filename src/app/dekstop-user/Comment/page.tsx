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

    <div className="p-6 shadow-md h-[600px] rounded-md">
      <h1 className="text-2xl font-bold mb-6 text-white">Comentários</h1>
      <CommentForm onAddComment={handleAddComment} />
      <CommentList comments={comments} />
    </div>
  )
}
