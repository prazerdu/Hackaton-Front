import { ModeToggle } from "@/components/theme-toggle";
import Usuario from "../app/dekstop-user/dekstop/components/Usuario";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TextAlignJustify } from "lucide-react";

export default function NavDropDown() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    size="icon"
                    variant="ghost"
                    className="rounded-full text-foreground shadow-none"
                    aria-label="Open menu"
                >
                    <TextAlignJustify aria-hidden="true" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                collisionPadding={12}
                className="w-auto min-w-0 max-w-[140px] p-1"
            >
                <div className="py-1">
                    <Usuario />
                </div>
                <div className="py-1">
                    <ModeToggle />
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
