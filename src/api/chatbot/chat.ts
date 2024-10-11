import type { MutationConfig } from '@/libs/react-query'
import { useChatStore } from '@/store/chat-store'
import type { Chat } from '@/types/api'
import { useMutation } from '@tanstack/react-query'

export const sendMessage = async ({
    message
}: {
    message: string
}): Promise<Chat[]> => {
    try {
        const response = await fetch('http://192.168.89.9:5005/webhooks/rest/webhook', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sender: 'user', message })
        })

        // Check if the response status is successful
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`)
        }

        const data: Chat[] = await response.json()

        // Check if data is empty or invalid
        if (!data || !data.length) {
            throw new Error('Erreur, aucune réponse reçue. Veuillez réessayer.')
        }

        return data
    } catch (error) {
        console.error('Failed to send message:', error)
        throw new Error("Erreur lors de l'envoi du message. Veuillez réessayer.")
    }
}

type UseChatOptions = {
    mutationConfig?: MutationConfig<typeof sendMessage>
}

export const useChat = ({ mutationConfig }: UseChatOptions) => {
    const { onSuccess, ...restConfig } = mutationConfig || {}
    const setChat = useChatStore.getState().setChat

    return useMutation({
        onSuccess: (...args) => {
            const [data] = args
            data.forEach((chatResponse) => setChat({ text: chatResponse.text, isBot: true }))

            onSuccess?.(...args)
        },
        onError: (error) => {
            console.error(error)
        },
        ...restConfig,
        mutationFn: sendMessage
    })
}
