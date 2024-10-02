import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

type ChatMessage = { text: string; isBot: boolean }

interface ChatState {
    chat: ChatMessage[]
    setChat: (chatMessage: ChatMessage) => void
}

export const useChatStore = create<ChatState>()(
    immer((set) => ({
        chat: [],
        setChat: (chatMessage: ChatMessage) => {
            set((state) => {
                state.chat.push(chatMessage)
            })
        }
    }))
)
