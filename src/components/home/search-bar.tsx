"use client"

import { SearchIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import Filter from "./filter"

type SearchBarProps = {
  search: string
  setSearch: (search: string) => void
  areas: string[]
  selectedArea: string
  setSelectedArea: (area: string) => void
}

const SearchBar = ({ search, setSearch, areas, selectedArea, setSelectedArea }: SearchBarProps) => {
  return (
    <div className="relative p-1 flex-1 min-w-[190px] sm:min-w-[400px] md:min-w-[500px] lg:min-w-[600px]">
      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
      <Input
        placeholder="Buscar desafios..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="pl-10 w-full text-foreground rounded-xl pr-12"
      />
      <div className="absolute right-2 top-1/2 -translate-y-1/2">
        <Filter areas={areas} selectedArea={selectedArea} setSelectedArea={setSelectedArea} />
      </div>
    </div>
  )
}

export default SearchBar
