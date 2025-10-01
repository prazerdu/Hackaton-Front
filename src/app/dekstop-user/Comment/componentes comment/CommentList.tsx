import Comment from './Comment'

type CommentType = {
  name: string
  message: string
  timestamp: string
}

type CommentListProps = {
  comments: CommentType[]
}

export default function CommentList({ comments }: CommentListProps) {
  return (
    <div className="space-y-4">
      {comments.length === 0 ? (
        <p className="text-gray-500 italic">Nenhum comentário ainda.</p>
      ) : (
        comments.map((comment, index) => (
          <Comment
            key={index}
            name={comment.name}
            message={comment.message}
            timestamp={comment.timestamp}
          />
        ))
      )}
    </div>
  )
}
