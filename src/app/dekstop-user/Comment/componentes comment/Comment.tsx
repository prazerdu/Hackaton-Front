type CommentProps = {
  name: string
  message: string
  timestamp: string
}

export default function Comment({ name, message, timestamp }: CommentProps) {
  return (
    <div className="bg-gray-50 border-l-4 border-blue-500 p-4 rounded shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold text-gray-800">{name}</span>
        <span className="text-sm text-gray-500">{timestamp}</span>
      </div>
      <p className="text-black ">{message}</p>
    </div>
  )
}
