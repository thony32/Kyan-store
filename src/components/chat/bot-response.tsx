import joystick from '@/components/assets/img/joystick.png'
import { Loader2 } from 'lucide-react'

export const BotResponse = ({ message }: { message: string }) => {
    return (
        <div className="flex justify-start pr-4">
            <p className="bubble-bot relative bg-gray-200 text-foreground rounded-lg px-3 py-2 max-w-xs">{message}</p>
        </div>
    )
}

export const BotLoader = () => {
    return (
        <div className="flex justify-start">
            <p className="bubble-bot relative bg-gray-200 text-foreground rounded-lg px-3 py-2 max-w-xs">
                <Loader2 className="size-4 animate-spin" strokeWidth={4} />
            </p>
        </div>
    )
}

export const BotResponseProduct = () => {
    return (
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
    )
}
