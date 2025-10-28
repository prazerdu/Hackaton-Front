"use client"

import { ChevronDownIcon } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

type FilterProps = {
  areas: string[]
  selectedArea: string
  setSelectedArea: (area: string) => void
}

const Filter = ({ areas, selectedArea, setSelectedArea }: FilterProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <ChevronDownIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuItem onClick={() => setSelectedArea("")}>
          <span className="font-medium">Todas as áreas</span>
        </DropdownMenuItem>
        {areas.map((area) => (
          <DropdownMenuItem
            key={area}
            onClick={() => setSelectedArea(area)}
            className={selectedArea === area ? "bg-accent" : ""}
          >
            <span>{area}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Filter
