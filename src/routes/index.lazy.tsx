import { createLazyFileRoute } from '@tanstack/react-router'

const Landing = () => {
    return (
        <div className="p-2">
            <h3 className="animate-bounce direction-alternate">Hello CodeIps!</h3>
        </div>
    )
}

export const Route = createLazyFileRoute('/')({
    component: Landing
})
