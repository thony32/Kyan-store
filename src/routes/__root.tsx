import Navbar from '@/components/front-office/navbar'
import NotFound from '@/components/not-found'
import { Outlet, createRootRoute } from '@tanstack/react-router'

const App = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    )
}

export const Route = createRootRoute({
    component: App,
    notFoundComponent: NotFound
})
