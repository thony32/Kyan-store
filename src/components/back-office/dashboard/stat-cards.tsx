import { useAllOrders } from '@/api/order/get-all-orders'
import { useAllPendingOrders } from '@/api/order/get-pending-orders'
import { useProducts } from '@/api/products/get-products'
import { useAllUsers } from '@/api/users/get-all-customers'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency } from '@/utils/format-curreny'
import { useMemo } from 'react'

const StatCards = () => {
    const { data: orders } = useAllOrders()
    const { data: pendingOrders } = useAllPendingOrders()
    const { data: users } = useAllUsers()
    const { data: products } = useProducts({})

    const totalSum = useMemo(() => {
        return orders?.reduce((sum, order) => sum + order.total_amount, 0) || 0
    }, [orders])

    const cardData = useMemo(
        () => ({
            customers: users?.length || 0,
            products: products?.length || 0,
            approvedOrders: orders?.length || 0,
            pendingOrders: pendingOrders?.length || 0,
            totalIncome: formatCurrency(totalSum)
        }),
        [users, products, orders, pendingOrders, totalSum]
    )

    return (
        <>
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Total Customers</CardTitle>
                </CardHeader>
                <CardContent>
                    <h1 className="text-3xl font-bold">{cardData.customers}</h1>
                </CardContent>
            </Card>
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Products</CardTitle>
                </CardHeader>
                <CardContent>
                    <h1 className="text-3xl font-bold">{cardData.products}</h1>
                </CardContent>
            </Card>
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Approved Orders</CardTitle>
                </CardHeader>
                <CardContent>
                    <h1 className="text-3xl text-green-600 font-bold">{cardData.approvedOrders}</h1>
                </CardContent>
            </Card>
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Pending Orders</CardTitle>
                </CardHeader>
                <CardContent>
                    <h1 className="text-3xl text-yellow-600 font-bold">{cardData.pendingOrders}</h1>
                </CardContent>
            </Card>
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Total Income</CardTitle>
                </CardHeader>
                <CardContent>
                    <h1 className="text-3xl font-bold">${cardData.totalIncome}</h1>
                </CardContent>
            </Card>
        </>
    )
}

export default StatCards
