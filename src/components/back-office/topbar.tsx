import { useLocation } from '@tanstack/react-router'
import { ChevronDown } from 'lucide-react'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { Button } from '../ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'

const Topbar = () => {
    const match = useLocation().pathname
    const currentPageName = match.split('/').pop()
    return (
        <div className="flex justify-between py-4">
            <h1 className="text-2xl font-bold capitalize">{currentPageName}</h1>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button className="flex gap-2 items-center" variant="ghost">
                        <Avatar>
                            <AvatarFallback>AD</AvatarFallback>
                        </Avatar>
                        <ChevronDown />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>Log out</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default Topbar
