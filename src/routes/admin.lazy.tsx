import Sidebar from '@/components/back-office/sidebar'
import Topbar from '@/components/back-office/topbar'
import { useAuthDialogStore } from '@/store/auth-dialog-store'
import { useAuthStore } from '@/store/auth-store'
import { Outlet, createLazyFileRoute, useNavigate } from '@tanstack/react-router'

const Admin = () => {
    const user = useAuthStore((state) => state.user)
    const setShouldOpen = useAuthDialogStore((state) => state.setShouldOpen)
    const navigate = useNavigate()

    if (!user) {
        setShouldOpen(true)
        navigate({ to: '/' })
        return null
    }

    if (user.role !== 'ADMIN') {
        navigate({ to: '/' })
        return null
    }

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
