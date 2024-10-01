import headphones from '@/components/assets/img/headphones.png'
import PaymentForm from '@/components/payment/payment-form'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/store/cart-store'
import { Link, createLazyFileRoute } from '@tanstack/react-router'

const PaymentPage = () => {
    const items = useCartStore((state) => state.items)
    const getTotal = useCartStore((state) => state.getTotal)

    return (
        <div className="min-h-screen flex px-[15%] py-[5%]">
            {/* NOTE: Left Section: Order Summary */}
            <div className="w-full lg:w-1/2 p-8 bg-gray-50 space-y-4">
                <Link to="/cart">
                    <Button className="bg-foreground">Retour au panier</Button>
                </Link>
                <h2 className="text-2xl font-bold">Payer</h2>
                <div className="text-4xl font-bold">
                    {getTotal()} <span className="text-sm"> $US</span>
                </div>

                {/* NOTE: Order Items */}
                {items.map((item) => (
                    <div key={item.id} className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                {item.image_url ? (
                                    <img src={item.image_url} alt={item.name} className="w-16 h-16 object-contain" />
                                ) : (
                                    <div className="rounded size-16 aspect-square bg-gray-100" />
                                )}
                                <div>
                                    <p className="text-sm font-semibold line-clamp-1 overflow-hidden text-ellipsis">{item.name}</p>
                                    <p className="text-xs text-gray-500">Qté {item.orderQuantity}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold">${item.price * item.orderQuantity}</p>
                                <p className="text-xs text-gray-500 whitespace-nowrap">${item.price} chacun</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* NOTE: Right Section: Payment Form */}
            <PaymentForm />
        </div>
    )
}

export default PaymentPage

export const Route = createLazyFileRoute('/payment')({
    component: PaymentPage
})
