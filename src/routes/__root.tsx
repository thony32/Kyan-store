import joystick from '@/components/assets/img/joystick.png'
import IALogo from '@/components/misc/ia-logo'
import NotFound from '@/components/not-found'
import { Button } from '@/components/ui/button'
import { ChatDropdownMenu, ChatDropdownMenuContent, ChatDropdownMenuItem, ChatDropdownMenuTrigger } from '@/components/ui/chat-dropdown'
import { Input } from '@/components/ui/input'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { Send, X } from 'lucide-react'

const App = () => {
    return (
        <div>
            <Outlet />
            <ChatDropdownMenu>
                <ChatDropdownMenuTrigger asChild>
                    <Button size="icon" className="fixed bottom-5 right-5 bg-gradient-to-br scale-150 rounded-full from-[#E093B2] to-[#272962]">
                        <svg width={20} height={22} viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M19.738 15.13C19.7431 15.3486 19.6763 15.5629 19.548 15.74C19.4213 15.9205 19.2385 16.0541 19.028 16.12L17.318 16.69C16.7913 16.8649 16.3121 17.1592 15.918 17.55C15.5243 17.9418 15.2295 18.4217 15.058 18.95L14.458 20.65C14.3955 20.8541 14.2693 21.0328 14.098 21.16C13.9151 21.2842 13.6991 21.3504 13.478 21.35C13.2561 21.3595 13.0374 21.2948 12.8564 21.1663C12.6753 21.0377 12.5422 20.8526 12.478 20.64L11.908 18.93C11.7365 18.4017 11.4417 17.9218 11.048 17.53C10.6506 17.1411 10.1727 16.8441 9.64799 16.66L7.93799 16.1C7.73555 16.029 7.55828 15.9004 7.42799 15.73C7.2967 15.5494 7.22345 15.3332 7.21799 15.11C7.20851 14.8881 7.27314 14.6694 7.4017 14.4884C7.53025 14.3073 7.71542 14.1742 7.92799 14.11L9.64799 13.54C10.1814 13.3676 10.6663 13.071 11.0627 12.6747C11.459 12.2783 11.7556 11.7934 11.928 11.26L12.498 9.56999C12.5563 9.36205 12.6803 9.17856 12.8516 9.04698C13.0228 8.91539 13.2321 8.84278 13.448 8.83999C13.663 8.83999 13.874 8.89899 14.058 9.00999C14.24 9.13499 14.38 9.31299 14.458 9.51999L15.038 11.26C15.2104 11.7934 15.5069 12.2783 15.9033 12.6747C16.2997 13.071 16.7846 13.3676 17.318 13.54L19.018 14.14C19.2248 14.2078 19.4039 14.3412 19.528 14.52C19.6635 14.6945 19.7373 14.909 19.738 15.13ZM9.73899 8.76999C9.73746 8.96603 9.67835 9.15729 9.56899 9.31999C9.45079 9.48098 9.2871 9.60288 9.09899 9.66999L7.83899 10.09C7.48599 10.212 7.16599 10.41 6.89899 10.67C6.63799 10.9362 6.43983 11.2573 6.31899 11.61L5.88899 12.85C5.82803 13.0413 5.70482 13.2068 5.53899 13.32C5.37459 13.4348 5.17948 13.4975 4.97899 13.5C4.77401 13.4966 4.57502 13.4303 4.40899 13.31C4.25171 13.1904 4.1334 13.0268 4.06899 12.84L3.65899 11.59C3.53869 11.24 3.34035 10.922 3.07899 10.66C2.82289 10.3913 2.50296 10.1918 2.14899 10.08L0.898993 9.65999C0.705032 9.59894 0.536427 9.476 0.418993 9.30999C0.339394 9.18533 0.288442 9.04455 0.269808 8.89782C0.251174 8.75109 0.265323 8.60205 0.311235 8.46144C0.357148 8.32084 0.433679 8.19216 0.535316 8.0847C0.636952 7.97724 0.761161 7.89366 0.898993 7.83999L2.14899 7.42999C2.50269 7.3065 2.82396 7.10478 3.08887 6.83987C3.35378 6.57496 3.55549 6.25369 3.67899 5.89999L4.08899 4.66999C4.14793 4.48566 4.25909 4.3224 4.40899 4.19999C4.56828 4.07997 4.75982 4.01032 4.95899 3.99999C5.16079 3.99457 5.3595 4.05035 5.52899 4.15999C5.69581 4.2726 5.82476 4.43292 5.89899 4.61999L6.31899 5.89999C6.44249 6.25369 6.64421 6.57496 6.90912 6.83987C7.17403 7.10478 7.4953 7.3065 7.84899 7.42999L9.09899 7.85999C9.28595 7.92421 9.44724 8.04694 9.55899 8.20999C9.67736 8.3726 9.74045 8.56888 9.73899 8.76999ZM15.528 3.40999C15.5189 3.59232 15.4601 3.7687 15.358 3.91999C15.2539 4.0626 15.1066 4.16781 14.938 4.21999L14.318 4.42999C14.1976 4.47156 14.0882 4.53998 13.9981 4.63007C13.908 4.72016 13.8396 4.82956 13.798 4.94999L13.578 5.57999C13.5176 5.7334 13.4175 5.868 13.288 5.96999C13.1406 6.0881 12.9569 6.15168 12.768 6.14999C12.5951 6.13927 12.4272 6.08787 12.278 5.99999C12.1285 5.88985 12.0167 5.73616 11.958 5.55999L11.748 4.93999C11.7119 4.81703 11.6427 4.70634 11.548 4.61999C11.4598 4.52748 11.3498 4.4587 11.228 4.41999L10.608 4.21999C10.443 4.15567 10.2981 4.04869 10.188 3.90999C10.0842 3.76012 10.0285 3.58227 10.028 3.39999C10.0338 3.21707 10.0929 3.03982 10.198 2.88999C10.3057 2.75113 10.4517 2.64684 10.618 2.58999L11.228 2.38999C11.3512 2.34797 11.4637 2.27974 11.558 2.18999C11.6477 2.09575 11.716 1.98316 11.758 1.85999L11.968 1.23999C12.028 1.08499 12.123 0.947994 12.248 0.839994C12.3915 0.734106 12.5606 0.668507 12.738 0.649994C12.9267 0.648913 13.1114 0.704665 13.268 0.809994C13.409 0.916045 13.5194 1.0575 13.588 1.21999L13.798 1.85999C13.84 1.98316 13.9083 2.09575 13.998 2.18999C14.091 2.27636 14.1996 2.34424 14.318 2.38999L14.948 2.59999C15.1082 2.66303 15.2494 2.76637 15.358 2.89999C15.4671 3.04778 15.5266 3.22631 15.528 3.40999Z"
                                fill="white"
                            />
                        </svg>
                    </Button>
                </ChatDropdownMenuTrigger>
                <ChatDropdownMenuContent align="end" className="w-full max-w-sm bg-white shadow-lg p-0">
                    <div className="w-full max-w-sm mx-auto rounded-lg overflow-hidden">
                        {/* Header */}
                        <div className="bg-gradient-to-l from-purple-500 to-primary text-white flex items-center justify-between p-4">
                            <div className="flex items-center space-x-2">
                                <IALogo className="size-8 invert saturate-0 brightness-0" />
                                <h1 className="font-bold">KyanAI</h1>
                            </div>
                            <ChatDropdownMenuItem asChild>
                                <Button size="icon" type="button" className="rounded-full size-8">
                                    <X className="size-4" strokeWidth={4} />
                                </Button>
                            </ChatDropdownMenuItem>
                        </div>

                        {/* Chat Body */}
                        <div className="p-4 space-y-4">
                            {/* User Message */}
                            <div className="flex justify-end">
                                <div className="bubble-user relative bg-purple-600 text-white rounded-lg px-3 py-2 max-w-xs">
                                    Aides moi à trouver le produit idéal s'il te plaît!
                                </div>
                            </div>

                            {/* Bot Response */}
                            <div className="flex justify-start">
                                <div className="bubble-bot relative bg-gray-200 text-foreground rounded-lg px-3 py-2 max-w-xs">
                                    Voici une liste de produits populaire
                                </div>
                            </div>

                            {/* Product List */}
                            <div className="grid grid-cols-2 gap-2">
                                <div className="flex flex-col items-start">
                                    <img src={joystick} alt="Product 1" className="w-20 h-20 object-contain mb-2" />
                                    <p className="text-xs">Sony WH-1000XM3 Bluetooth...</p>
                                    <div className="text-sm">
                                        <span className="line-through text-gray-500">$773</span> <span className="text-green-500">$688</span>{' '}
                                        <span className="text-red-500">-11%</span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-start">
                                    <img src={joystick} alt="Product 2" className="w-20 h-20 object-contain mb-2" />
                                    <p className="text-xs">Sony WH-1000XM3 Bluetooth...</p>
                                    <div className="text-sm">
                                        <span className="line-through text-gray-500">$773</span> <span className="text-green-500">$688</span>{' '}
                                        <span className="text-red-500">-11%</span>
                                    </div>
                                </div>
                            </div>

                            {/* User Message */}
                            <div className="flex justify-end">
                                <div className="bubble-user relative bg-purple-600 text-white rounded-lg px-3 py-2 max-w-xs">Merci !</div>
                            </div>
                        </div>

                        {/* Chat Input */}
                        <div className="p-3 border-t flex items-center">
                            <Input
                                type="text"
                                placeholder="Écrire ici votre message..."
                                className="flex-1 border rounded-lg px-3 py-5 text-gray-700 focus:outline-none focus:ring focus:border-purple-300"
                            />
                            <Button size="icon" type="button" variant="link" className="ml-2 rounded-full">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                                    <g id="SVGRepo_iconCarrier">
                                        <path
                                            d="M18.0693 8.50867L9.50929 4.22867C3.75929 1.34867 1.39929 3.70867 4.27929 9.45867L5.14929 11.1987C5.39929 11.7087 5.39929 12.2987 5.14929 12.8087L4.27929 14.5387C1.39929 20.2887 3.74929 22.6487 9.50929 19.7687L18.0693 15.4887C21.9093 13.5687 21.9093 10.4287 18.0693 8.50867ZM14.8393 12.7487H9.43929C9.02929 12.7487 8.68929 12.4087 8.68929 11.9987C8.68929 11.5887 9.02929 11.2487 9.43929 11.2487H14.8393C15.2493 11.2487 15.5893 11.5887 15.5893 11.9987C15.5893 12.4087 15.2493 12.7487 14.8393 12.7487Z"
                                            fill="currentColor"
                                        />
                                    </g>
                                </svg>
                            </Button>
                        </div>
                    </div>
                </ChatDropdownMenuContent>
            </ChatDropdownMenu>
        </div>
    )
}

export const Route = createRootRoute({
    component: App,
    notFoundComponent: NotFound
})
