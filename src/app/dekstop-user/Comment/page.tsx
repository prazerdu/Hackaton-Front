'use client'
import { useState } from 'react'
import CommentForm from './componentes comment/CommentForm'
import CommentList from './componentes comment/CommentList'

type CommentType = {
  name: string
  message: string
  timestamp: string
}
interface AppProps {
  cardId: number;
}

export default function App({ cardId }: AppProps) {
  const [comments, setComments] = useState<CommentType[]>([])

  const handleAddComment = (comment: CommentType) => {
    setComments([comment, ...comments])
  }

  return (

    <div className="p-6 shadow-md rounded-md mt-10">
      <h1 className="text-2xl font-bold mb-6 text-white">Comentários</h1>
      <CommentForm onAddComment={handleAddComment} />
      <CommentList comments={comments} />
    </div>
  )
}
