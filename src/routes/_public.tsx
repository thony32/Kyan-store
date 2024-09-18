import Navbar from '@/components/front-office/navbar'
import ViewItemDialog from '@/components/products/view-item-dialog'
import { Outlet, createFileRoute } from '@tanstack/react-router'

const PublicLayout = () => {
    return (
        <>
            <Navbar />
            <div>
                <Outlet />
            </div>
            <ViewItemDialog />
        </>
    )
}

export default PublicLayout
export const Route = createFileRoute('/_public')({
    component: PublicLayout
})
