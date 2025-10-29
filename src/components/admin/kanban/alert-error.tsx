import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function AlertError() {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>Ocorreu um erro. Tente novamente.</AlertDescription>
    </Alert>
  )
}
