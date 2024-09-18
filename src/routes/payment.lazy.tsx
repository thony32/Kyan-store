import headphones from '@/components/assets/img/headphones.png'
import joystick from '@/components/assets/img/joystick.png'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Link, createLazyFileRoute } from '@tanstack/react-router'

const PaymentPage = () => {
    return (
        <div className="min-h-screen flex px-[10%] py-[5%]">
            {/* NOTE: Left Section: Order Summary */}
            <div className="w-full lg:w-1/2 p-8 bg-gray-50 space-y-8">
                <Link to="/">
                    <Button>Retour</Button>
                </Link>
                <h2 className="text-2xl font-bold mb-4">Payer</h2>
                <div className="text-4xl font-bold mb-6">
                    2 763,00 <span className="text-sm"> $US</span>
                </div>

                {/* NOTE: Order Items */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <img src={headphones} alt="Product 1" className="w-20 h-20 object-contain" />
                            <div>
                                <p className="text-sm font-semibold">Sony WH-1000XM5 Wireless Headphones</p>
                                <p className="text-xs text-gray-500">Qté 2</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-bold">$644,00</p>
                            <p className="text-xs text-gray-500">$322,00 $US chacun</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <img src={headphones} alt="Product 2" className="w-20 h-20 object-contain" />
                            <div>
                                <p className="text-sm font-semibold">Sony WH-1000XM3 Bluetooth Headphones (Silver)</p>
                                <p className="text-xs text-gray-500">Qté 3</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-bold">$2 064,00</p>
                            <p className="text-xs text-gray-500">$688,00 $US chacun</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <img src={joystick} alt="Product 3" className="w-20 h-20 object-contain" />
                            <div>
                                <p className="text-sm font-semibold">Microsoft Xbox X/S Wireless Controller</p>
                                <p className="text-xs text-gray-500">Qté 1</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-bold">$55,00</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* NOTE: Right Section: Payment Form */}
            <div className="w-full lg:w-1/2 p-8">
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
                        <div className="flex space-x-2">
                            <Input type="text" className="w-8/12 border  p-2" placeholder="1234 1234 1234 1234" />
                            <Input type="text" className="w-4/12 border  p-2" placeholder="MM / AA" />
                            <Input type="text" className="w-4/12 border  p-2" placeholder="CVC" />
                        </div>
                    </div>

                    {/* NOTE: Name on Card */}
                    <div className="mb-4">
                        <label className="block text-sm mb-2">Nom du titulaire de la carte</label>
                        <Input type="text" className="w-full border  p-2" placeholder="Nom complet" />
                    </div>

                    {/* NOTE: Billing Address */}
                    <div className="mb-4">
                        <label className="block text-sm mb-2">Adresse de facturation</label>
                        <Select>
                            <SelectTrigger className="w-full border  p-2 mb-2">
                                <SelectValue placeholder="Region" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Madagascar">Madagascar</SelectItem>
                                <SelectItem value="USA">USA</SelectItem>
                            </SelectContent>
                        </Select>
                        <Input type="text" className="w-full border  p-2 mb-2" placeholder="Ligne d'adresse n°1" />
                        <Input type="text" className="w-full border  p-2 mb-2" placeholder="Ligne d'adresse n°2" />
                        <div className="flex space-x-2">
                            <Input type="text" className="w-1/2 border  p-2" placeholder="Code postal" />
                            <Input type="text" className="w-1/2 border  p-2" placeholder="Ville" />
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
