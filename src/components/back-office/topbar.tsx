import { useLogoutMutation } from '@/api/auth'
import { useLocation } from '@tanstack/react-router'
import { LogOutIcon } from 'lucide-react'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { Button } from '../ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'

const Topbar = () => {
    const match = useLocation().pathname
    const currentPageName = match.split('/').pop()
    const logoutMutation = useLogoutMutation()
    return (
        <div className="flex justify-between px-8 py-4">
            <h1 className="text-2xl font-bold capitalize">{currentPageName}</h1>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button variant="ghost" size="icon" className="flex gap-2 items-center rounded-full">
                        <Avatar>
                            <AvatarFallback>AD</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => logoutMutation.mutate()} disabled={logoutMutation.isPending}>
                        <LogOutIcon className="size-5 mr-4" />
                        Log out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default Topbar
