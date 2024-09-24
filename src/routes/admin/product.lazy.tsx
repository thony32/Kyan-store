import { createLazyFileRoute } from '@tanstack/react-router'

const AdminProduct = () => {
    return <div>AdminProduct</div>
}

export default AdminProduct
export const Route = createLazyFileRoute('/admin/product')({
    component: AdminProduct
})
