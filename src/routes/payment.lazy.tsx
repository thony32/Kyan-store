import headphones from '@/components/assets/img/headphones.png'
import PaymentForm from '@/components/payment/payment-form'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/store/cart-store'
import { Link, createLazyFileRoute } from '@tanstack/react-router'

const PaymentPage = () => {
    const items = useCartStore((state) => state.items)
    const getSubtotal = useCartStore((state) => state.getSubtotal)

    return (
        <div className="min-h-screen flex px-[15%] py-[5%]">
            {/* NOTE: Left Section: Order Summary */}
            <div className="w-full lg:w-1/2 p-8 bg-gray-50 space-y-4">
                <Link to="/cart">
                    <Button className="bg-foreground">Retour au panier</Button>
                </Link>
                <h2 className="text-2xl font-bold">Payer</h2>
                <div className="text-4xl font-bold">
                    {getSubtotal()} <span className="text-sm"> $US</span>
                </div>

                {/* NOTE: Order Items */}
                {items.map((item) => (
                    <div key={item.id} className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <img src={headphones} alt="Product 1" className="w-16 h-16 object-contain" />
                                <div>
                                    <p className="text-sm font-semibold line-clamp-1 overflow-hidden text-ellipsis">{item.name}</p>
                                    <p className="text-xs text-gray-500">Qté {item.quantity}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold">${item.price * item.quantity}</p>
                                <p className="text-xs text-gray-500">${item.price} chacun</p>
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
