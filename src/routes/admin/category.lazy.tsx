import { useCategories } from '@/api/categories/get-categories'
import { createLazyFileRoute } from '@tanstack/react-router'

const AdminCategory = () => {
    const { data, status, error } = useCategories({})
    return <div>AdminCategory</div>
}

export default AdminCategory

export const Route = createLazyFileRoute('/admin/category')({
    component: AdminCategory
})
