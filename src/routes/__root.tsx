import NotFound from '@/components/not-found'
import { Outlet, createRootRoute } from '@tanstack/react-router'

const App = () => {
    return (
        <div>
            <Outlet />
        </div>
    )
}

export const Route = createRootRoute({
    component: App,
    notFoundComponent: NotFound
})
