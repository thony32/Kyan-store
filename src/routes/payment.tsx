import { useOrder } from '@/api/order/get-order'
import { useProducts } from '@/api/products/get-products'
import StripeLogo from '@/components/assets/img/stripe.svg'
import PaymentForm from '@/components/payment/payment-form'
import { Button } from '@/components/ui/button'
import { useAuthDialogStore } from '@/store/auth-dialog-store'
import { useAuthStore } from '@/store/auth-store'
import { usePaymentIdStore } from '@/store/payment-store'
import getDiscountAmount from '@/utils/get-discount-amount'
import { useOrderUtils } from '@/utils/order-utils'
import { Link, createFileRoute } from '@tanstack/react-router'
import { redirect } from '@tanstack/react-router'

const PaymentPage = () => {
    const user = useAuthStore((state) => state.user!)
    const paymentId = usePaymentIdStore((state) => state.paymentId)

    const { data: order, status: statusOrder } = useOrder({ userId: user?.id })
    const { data: products, status: statusProducts } = useProducts({})
    const { getSubtotal } = useOrderUtils(order?.[0].order_items, products)

    if (statusOrder === 'pending' || statusProducts === 'pending') {
        return (
            <div className="w-screen h-screen grid place-items-center">
                <img src={StripeLogo} alt="stripe logo" className="size-48" />
            </div>
        )
    }

    return (
        <div className="min-h-screen flex px-[15%] py-[5%]">
            {order?.[0]?.order_items.length && products ? (
                <>
                    <div className="w-full lg:w-1/2 p-8 bg-gray-50 space-y-4">
                        <Link to="/cart">
                            <Button className="bg-foreground">Retour au panier</Button>
                        </Link>
                        <h2 className="text-2xl font-bold">Payer</h2>
                        <div className="text-4xl font-bold">
                            {getSubtotal} <span className="text-sm"> $US</span>
                        </div>

                        {/* Order Items */}
                        {order[0].order_items.map((item) => {
                            const product = products.find((p) => p.id === item.product_id)!

                            return (
                                <div key={item.id} className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            {product.image_url ? (
                                                <img src={product.image_url} alt={product.name} className="w-16 h-16 object-contain" />
                                            ) : (
                                                <div className="rounded size-16 aspect-square bg-gray-100" />
                                            )}
                                            <div>
                                                <p className="text-sm font-semibold line-clamp-1 overflow-hidden text-ellipsis">{product.name}</p>
                                                <p className="text-xs text-gray-500">Qté {item.quantity}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold">${product.discount_id ? item.price - getDiscountAmount(product) : item.price}</p>
                                            <p className="text-xs text-gray-500 whitespace-nowrap">${item.price} chacun</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* NOTE: Right Section: Payment Form */}
                    <PaymentForm user={user} paymentId={paymentId} orderId={order[0].id} amount={getSubtotal} />
                </>
            ) : null}
        </div>
    )
}

export const Route = createFileRoute('/payment')({
    loader: () => {
        const user = useAuthStore.getState().user
        const setShouldOpen = useAuthDialogStore.getState().setShouldOpen

        if (!user) {
            setShouldOpen(true)
            throw redirect({
                to: '/'
            })
        }
    },
    component: PaymentPage
})
