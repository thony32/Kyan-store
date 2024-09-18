import headphones from '@/components/assets/img/headphones.png'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
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
            <div className="w-full lg:w-1/2 px-24 py-8">
                <h2 className="text-xl font-bold mb-6">Payer par carte</h2>

                <form>
                    {/* NOTE: Email Field */}
                    <div className="mb-4">
                        <label className="block text-sm mb-2">E-mail</label>
                        <Input type="email" className="w-full border  p-2" placeholder="you@example.com" />
                    </div>

                    {/* NOTE: Card Information */}
                    <div className="mb-4">
                        <label className="block text-sm mb-2">Informations de la carte</label>
                        <div className="flex flex-col gap-0">
                            <div>
                                <Input
                                    type="text"
                                    className="border p-2 rounded-none rounded-tr-lg rounded-tl-lg"
                                    placeholder="1234 1234 1234 1234"
                                />
                            </div>
                            <div className="flex gap-0">
                                <Input type="text" className="border p-2 rounded-none rounded-bl-lg" placeholder="MM / AA" />
                                <Input type="text" className="border p-2 rounded-none rounded-br-lg" placeholder="CVC" />
                            </div>
                        </div>
                    </div>

                    {/* NOTE: Name on Card */}
                    <div className="mb-4">
                        <label className="block text-sm mb-2">Nom du titulaire de la carte</label>
                        <Input type="text" className="w-full border  p-2" placeholder="Nom complet" />
                    </div>

                    {/* NOTE: Billing Address */}
                    <div className="mb-4">
                        <label className="block text-sm">Adresse de facturation</label>
                        <Select>
                            <SelectTrigger className="w-full border rounded-none rounded-tr-lg rounded-tl-lg p-2">
                                <SelectValue placeholder="Region" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Madagascar">Madagascar</SelectItem>
                                <SelectItem value="USA">USA</SelectItem>
                            </SelectContent>
                        </Select>
                        <Input type="text" className="w-full border p-2 rounded-none" placeholder="Ligne d'adresse n°1" />
                        <Input type="text" className="w-full border p-2 rounded-none" placeholder="Ligne d'adresse n°2" />
                        <div className="flex">
                            <Input type="text" className="w-1/2 border p-2 rounded-none rounded-bl-lg" placeholder="Code postal" />
                            <Input type="text" className="w-1/2 border p-2 rounded-none rounded-br-lg" placeholder="Ville" />
                        </div>
                    </div>

                    {/* NOTE: Payment Button */}
                    <Button type="button" className="w-full bg-blue-500 text-white py-2">
                        Payer
                    </Button>

                    <div className="text-sm text-gray-500 text-center mt-4">
                        Propulsé par <span className="font-bold">Stripe</span> • <button type="button">Conditions d'utilisation</button> •{' '}
                        <button type="button">Confidentialité</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PaymentPage

export const Route = createLazyFileRoute('/payment')({
    component: PaymentPage
})
