import { createLazyFileRoute } from '@tanstack/react-router'

const AdminDiscount = () => {
    return <div>AdminDiscount</div>
}

export default AdminDiscount
export const Route = createLazyFileRoute('/admin/discount')({
    component: AdminDiscount
})
