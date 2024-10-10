import { Loader2 } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

export const BotResponse = ({ message }: { message: string }) => {
    return (
        <div className="flex justify-start pr-4">
            <div className="bubble-bot relative bg-gray-200 text-foreground rounded-lg px-3 py-2 max-w-xs">
                <ReactMarkdown>{message}</ReactMarkdown>
            </div>
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
