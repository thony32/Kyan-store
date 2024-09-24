import { createLazyFileRoute } from '@tanstack/react-router'

const Dashboard = () => {
    return <div>Dashboard</div>
}

export default Dashboard

export const Route = createLazyFileRoute('/admin/dashboard')({
    component: Dashboard
})
