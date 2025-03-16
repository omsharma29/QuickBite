import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@repo/ui/dropdown"
import { ShoppingCart } from "lucide-react"

export default function CartBtn() {
    return (
        <DropdownMenu className="">
            <DropdownMenuTrigger className="border-transparent flex flex-row gap-3 pt-1.5">
                <ShoppingCart className="border-transparent "/> Add to Cart
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white border-transparent  h-[400px] w-[300px] ">
                <DropdownMenuLabel>Added to Cart</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}
