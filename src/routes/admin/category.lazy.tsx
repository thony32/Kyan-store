import { createLazyFileRoute } from '@tanstack/react-router'

const AdminCategory = () => {
    return <div>AdminCategory</div>
}

export default AdminCategory

export const Route = createLazyFileRoute('/admin/category')({
    component: AdminCategory
})
