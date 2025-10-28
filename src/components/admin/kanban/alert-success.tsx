import { CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function AlertSuccess() {
  return (
    <Alert className="border-green-500 bg-green-50 text-green-900 dark:bg-green-950 dark:text-green-100">
      <CheckCircle2 className="h-4 w-4" />
      <AlertDescription>Operação realizada com sucesso!</AlertDescription>
    </Alert>
  )
}
