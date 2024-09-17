import Navbar from '@/components/front-office/navbar'
import { Outlet, createFileRoute } from '@tanstack/react-router'

const PublicLayout = () => {
    return (
        <>
            <Navbar />
            <div>
                <Outlet />
            </div>
        </>
    )
}

export default PublicLayout
export const Route = createFileRoute('/_public')({
    component: PublicLayout
})
