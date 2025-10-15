'use client'

import { ReactNode } from 'react'
import { FilterIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface Category {
    name: string
    icon: ReactNode
}

interface DropProps {
    categories: Category[]
    selectedCategory: string
    setSelectedCategory: (cat: string) => void
}
export default function DropResponsive({ categories, selectedCategory, setSelectedCategory }: DropProps) {
    return (
        <div className="relative">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="flex items-center justify-center w-10 h-10 p-2 rounded-md text-foreground hover:bg-accent hover:text-accent-foreground"
                    >
                        <FilterIcon className="w-5 h-5" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                    side="bottom" 
                    align="start" 
                    className="w-56 bg-background border border-border shadow-lg rounded-md p-1"
                >
                    <DropdownMenuItem
                        onClick={() => setSelectedCategory('')}
                        className={`cursor-pointer select-none rounded-sm px-2 py-1 text-sm hover:bg-accent hover:text-accent-foreground ${selectedCategory === '' ? 'bg-accent text-accent-foreground font-medium' : ''
                            }`}
                    >
                        Todas as Categorias
                    </DropdownMenuItem>

                    {categories.map((cat) => (
                        <DropdownMenuItem
                            key={cat.name}
                            onClick={() => setSelectedCategory(cat.name)}
                            className={`cursor-pointer select-none rounded-sm px-2 py-1 text-sm hover:bg-accent hover:text-accent-foreground ${selectedCategory === cat.name ? 'bg-accent text-accent-foreground font-medium' : ''
                                }`}
                        >
                            <span className="mr-2 inline-flex items-center">{cat.icon}</span>
                            {cat.name}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
