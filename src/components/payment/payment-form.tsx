import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

const PaymentForm = () => {
    return (
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
                            <Input type="text" className="border p-2 rounded-none rounded-tr-lg rounded-tl-lg" placeholder="1234 1234 1234 1234" />
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
    )
}

export default PaymentForm
