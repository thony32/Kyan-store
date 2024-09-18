import SearchIllustration from '@/components/misc/search-illustration'
import { Button, buttonVariants } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { cn } from '@/utils/cn'
import { LayoutGrid, LogInIcon, LogOutIcon, SearchIcon, X } from 'lucide-react'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Link } from '@tanstack/react-router'
import { useCartStore } from '@/store/cart-store'
import AuthDialog from './auth-dialog'
import { useAuthDialogStore } from '@/store/auth-dialog-store'

const useAuth = () => ({
    isAuthenticated: false,
    // role: "ADMIN",
    role: 'USER'
})
export default function Navbar() {
    const { isAuthenticated, role } = useAuth()
    const items = useCartStore((state) => state.items)
    const shouldAuth = useAuthDialogStore((state) => state.shouldOpen)
    const setShouldAuth = useAuthDialogStore((state) => state.setShouldOpen)

    const [search, setSearch] = useState('')
    // const debounced = useDebounceCallback(setSearch, 500); //Appel de fonction

    return (
        <header className="grid grid-cols-3 px-[5%] items-center shadow-md bg-background z-20 sticky top-0 h-fit">
            <div>
                <Link to="/">
                    <svg className="w-20 h-20" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M27.472 40H12.928C12.9238 36.6294 11.5829 33.398 9.19953 31.0146C6.81611 28.6312 3.58471 27.2902 0.21405 27.286V12.742C15.244 12.742 27.472 24.97 27.472 40Z"
                            fill="url(#paint0_linear_4735_575)"
                        />
                        <path
                            d="M40.1862 12.742V27.286C36.8154 27.2902 33.584 28.6312 31.2006 31.0146C28.8172 33.398 27.4764 36.6294 27.4722 40H12.9281C12.9281 24.97 25.1562 12.742 40.1862 12.742Z"
                            fill="url(#paint1_linear_4735_575)"
                        />
                        <path
                            d="M20.2 14.4C24.1764 14.4 27.4 11.1765 27.4 7.2C27.4 3.22354 24.1764 0 20.2 0C16.2235 0 13 3.22354 13 7.2C13 11.1765 16.2235 14.4 20.2 14.4Z"
                            fill="url(#paint2_linear_4735_575)"
                        />
                        <path
                            d="M118.873 28.5744L119.361 30.8336L119.239 31.0474C118.812 31.3526 118.17 31.5664 117.316 31.5664C115.209 31.5664 114.14 30.223 114.14 28.147V22.2852C114.14 19.965 112.767 18.4385 110.477 18.4385C108.187 18.4385 106.63 19.965 106.63 22.2852V31.2H103.272V19.8123C103.272 18.988 103.15 18.469 102.57 18.469C102.356 18.469 102.203 18.5606 102.081 18.6522L101.867 18.5606L101.379 16.3014L101.501 16.0877C101.928 15.7824 102.57 15.5687 103.363 15.5687C104.737 15.5687 105.745 16.2708 106.142 17.492C107.332 16.3014 109.072 15.5687 111.118 15.5687C114.995 15.5687 117.468 18.1942 117.468 22.0104V27.3226C117.468 28.147 117.621 28.666 118.17 28.666C118.384 28.666 118.537 28.5744 118.659 28.4828L118.873 28.5744Z"
                            fill="black"
                        />
                        <path
                            d="M100.477 28.5744L100.965 30.8336L100.843 31.0474C100.416 31.3222 99.7746 31.5664 99.0112 31.5664C97.5152 31.5664 96.5078 30.742 96.172 29.3376C94.8286 30.681 92.9664 31.5664 90.7376 31.5664C86.2498 31.5664 83.0746 28.0248 83.0746 23.5676C83.0746 19.0796 86.2498 15.5687 90.7376 15.5687C92.9664 15.5687 94.7982 16.454 96.1414 17.7668V15.935H99.0724V27.3226C99.0724 28.1776 99.2556 28.666 99.7746 28.666C100.049 28.666 100.202 28.5438 100.263 28.4828L100.477 28.5744ZM91.2566 28.666C93.9128 28.666 96.0498 26.8342 96.0498 23.5676C96.0498 20.2702 93.9128 18.469 91.2872 18.469C88.3258 18.469 86.4634 20.7588 86.4634 23.5676C86.4634 26.4068 88.3562 28.666 91.2566 28.666Z"
                            fill="black"
                        />
                        <path
                            d="M77.5868 15.935H80.884V28.5438C80.884 33.4286 77.3426 35.8406 73.16 35.8406C70.1986 35.8406 67.8784 34.5888 66.3824 32.7266V32.5128L67.9088 30.681H68.153C69.2216 32.0854 70.9924 33.215 73.1906 33.215C75.6634 33.215 77.648 31.7496 77.648 28.9408V28.147C76.5488 29.246 75.0224 29.9178 73.1294 29.9178C69.7406 29.9178 67.054 27.9028 67.054 23.8728V19.8123C67.054 18.988 66.9014 18.469 66.3518 18.469C66.138 18.469 65.9854 18.5606 65.8634 18.6522L65.6496 18.5606L65.1612 16.3014L65.2832 16.0877C65.7106 15.7824 66.3212 15.5687 67.1762 15.5687C69.2216 15.5687 70.3208 16.7899 70.3208 18.8964V23.6286C70.3208 25.7962 71.664 27.0784 73.7706 27.0784C75.9382 27.0784 77.5868 25.5214 77.5868 23.2316V15.935Z"
                            fill="black"
                        />
                        <path
                            d="M65.4182 28.4218L66.0594 30.7726L65.9678 30.9862C65.4488 31.3526 64.8076 31.5664 63.9222 31.5664C62.06 31.5664 60.503 30.4368 59.129 28.7576L54.1832 22.7738L52.504 24.6056V31.2H49.1152V15.5992C49.1152 14.5917 48.9932 14.0116 48.3214 14.0116C48.0772 14.0116 47.8634 14.1032 47.772 14.2253L47.5276 14.1337L46.9782 11.7524L47.1308 11.5081C47.4972 11.2639 48.2298 10.9891 49.2068 10.9891C51.3744 10.9891 52.504 12.4851 52.504 14.5917V20.5144L60.9608 11.3555H64.8076L64.9298 11.5387L56.6256 20.606L61.8462 26.8342C62.9758 28.147 63.617 28.5438 64.3192 28.5438C64.655 28.5438 64.9602 28.4522 65.174 28.3302L65.4182 28.4218Z"
                            fill="black"
                        />
                        <defs>
                            <linearGradient id="paint0_linear_4735_575" x1="16.66" y1="30.77" x2="2.89205" y2="18.094" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#B03B83" />
                                <stop offset={1} stopColor="#E72E6C" />
                            </linearGradient>
                            <linearGradient
                                id="paint1_linear_4735_575"
                                x1="25.2982"
                                y1="36.264"
                                x2="30.1682"
                                y2="18.874"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#B03B83" />
                                <stop offset={1} stopColor="#6F4A9E" />
                            </linearGradient>
                            <linearGradient id="paint2_linear_4735_575" x1="14.392" y1="1.392" x2="25.302" y2="12.302" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#B03B83" />
                                <stop offset={1} stopColor="#6F4A9E" />
                            </linearGradient>
                        </defs>
                    </svg>
                </Link>
            </div>
            <Dialog>
                <DialogTrigger
                    className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'w-full justify-start gap-2 pl-4 py-6 text-muted-foreground')}
                >
                    <SearchIcon /> Rechercher un produit
                </DialogTrigger>
                <DialogContent
                    className="min-h-96 sm:rounded-3xl"
                    overlayClassName="bg-black/10"
                    closeClassName="absolute -top-4 -right-4 bg-card opacity-100 p-1 rounded-full"
                >
                    <DialogTitle className="sr-only" />
                    <DialogDescription className="sr-only" />
                    <label
                        htmlFor="search"
                        className={cn(
                            'border-2 flex items-center h-fit gap-3 pl-4 pr-2 rounded-xl w-full',
                            'has-[input:focus]:border-primary',
                            search && 'border-primary'
                        )}
                    >
                        <SearchIcon className={cn('flex-shrink-0', 'has-[+_input:focus]:text-primary', search && 'text-primary')} />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Rechercher un produit..."
                            className="bg-transparent py-4 w-full h-full text-secondary-foreground focus:outline-none"
                            // biome-ignore lint/a11y/noAutofocus: <explanation>
                            autoFocus
                        />
                        {search && (
                            <Button variant="ghost" size="icon" className="rounded-full flex-shrink-0" onClick={() => setSearch('')}>
                                <X className="size-4" />
                            </Button>
                        )}
                    </label>
                    <SearchIllustration className="opacity-75" />
                </DialogContent>
            </Dialog>

            <div className="flex items-center justify-end gap-5">
                <Link to="/cart" className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'rounded-full relative')}>
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_4784_35)">
                            <path
                                d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6M10 21C10 21.5523 9.55228 22 9 22C8.44772 22 8 21.5523 8 21C8 20.4477 8.44772 20 9 20C9.55228 20 10 20.4477 10 21ZM21 21C21 21.5523 20.5523 22 20 22C19.4477 22 19 21.5523 19 21C19 20.4477 19.4477 20 20 20C20.5523 20 21 20.4477 21 21Z"
                                stroke="#1E1E1E"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0_4784_35">
                                <rect width={24} height={24} fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                    {items.length > 0 && (
                        <Badge className="absolute -top-2 -right-2 shadow-none rounded-full text-base scale-75" variant="destructive">
                            {items.reduce((sum, item) => sum + item.quantity, 0)}
                        </Badge>
                    )}
                </Link>
                <DropdownMenu>
                    <DropdownMenuTrigger className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'rounded-full')}>
                        <svg className="w-6 h-6" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M18 20V18C18 16.9391 17.5786 15.9217 16.8284 15.1716C16.0783 14.4214 15.0609 14 14 14H6C4.93913 14 3.92172 14.4214 3.17157 15.1716C2.42143 15.9217 2 16.9391 2 18V20M14 6C14 8.20914 12.2091 10 10 10C7.79086 10 6 8.20914 6 6C6 3.79086 7.79086 2 10 2C12.2091 2 14 3.79086 14 6Z"
                                stroke="#1E1E1E"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {isAuthenticated ? (
                            <>
                                {role === 'ADMIN' && (
                                    <DropdownMenuItem>
                                        <LayoutGrid className="size-5 mr-4" /> Backoffice
                                    </DropdownMenuItem>
                                )}
                                <DropdownMenuItem>
                                    <LogOutIcon className="size-5 mr-4" /> Se déconnecter
                                </DropdownMenuItem>
                            </>
                        ) : (
                            <DropdownMenuItem onClick={() => setShouldAuth(true)}>
                                <LogInIcon className="size-5 mr-4" /> Se connecter
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>

                <Dialog open={shouldAuth} onOpenChange={setShouldAuth}>
                    <DialogContent
                        className="sm:rounded-3xl max-w-sm"
                        overlayClassName="bg-black/20"
                        closeClassName="absolute -top-4 -right-4 bg-card opacity-100 p-1 rounded-full"
                    >
                        <DialogTitle className="sr-only" />
                        <DialogDescription className="sr-only" />
                        <AuthDialog />
                    </DialogContent>
                </Dialog>
            </div>
        </header>
    )
}
