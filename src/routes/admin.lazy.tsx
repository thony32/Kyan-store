import Sidebar from '@/components/back-office/sidebar'
import Topbar from '@/components/back-office/topbar'
import { Outlet, createLazyFileRoute } from '@tanstack/react-router'

const Admin = () => {
    return (
        <div className="grid grid-cols-12">
            <Sidebar />
            <div className="col-span-10 px-4">
                <Topbar />
                <Outlet />
            </div>
        </div>
    )
}

export default Admin

export const Route = createLazyFileRoute('/admin')({
    component: Admin
})
