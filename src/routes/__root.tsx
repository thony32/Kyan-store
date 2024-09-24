import React from 'react'
const ChatDropdown = React.lazy(() => import('@/components/chat/chat-dropdown'))
import NotFound from '@/components/not-found'
import { Outlet, createRootRoute } from '@tanstack/react-router'

const App = () => {
    return (
        <div>
            <Outlet />
            <ChatDropdown />
        </div>
    )
}

export const Route = createRootRoute({
    component: App,
    notFoundComponent: NotFound
})
