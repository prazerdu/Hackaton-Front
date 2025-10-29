import { Info } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function AlertInfo() {
  return (
    <Alert className="border-blue-500 bg-blue-50 text-blue-900 dark:bg-blue-950 dark:text-blue-100">
      <Info className="h-4 w-4" />
      <AlertDescription>Você já votou nesta ideia.</AlertDescription>
    </Alert>
  )
}
