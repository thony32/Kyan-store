import { products } from '@/constants'
import { Badge } from '../ui/badge'

const ProductCard = ({
    name,
    price,
    oldPrice,
    discount,
    rating,
    votes,
    imageSrc
}: { name: string; price: number; oldPrice: number; discount: number; rating: number; votes: number; imageSrc: string }) => {
    return (
        <div className="border rounded-lg px-4 py-2">
            <img src={imageSrc} alt={name} className="w-full h-40 object-contain mb-2" />
            <button type="button" className="text-sm font-bold line-clamp-1 overflow-hidden text-ellipsis">
                {name}
            </button>
            <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">{oldPrice}</span>
                <span className="font-bold text-lg">
                    <span className="text-green-400">$</span>
                    {price}
                </span>
                <Badge className="text-sm bg-destructive">-{discount}%</Badge>
            </div>
            <div className="flex items-center mt-2 space-x-1">
                <span className="text-yellow-400">★</span>
                <span className="text-sm font-bold">{rating}</span>
                <span className="text-sm text-gray-500">• {votes} votes</span>
            </div>
        </div>
    )
}

const Products: React.FC = () => {
    return (
        <div className=" mx-auto">
            <div className="flex gap-4">
                <h2 className="text-lg mb-4">Produits récents:</h2>
                <div className="mb-4">
                    <button type="button" className="bg-purple-600 text-white py-1 px-3 rounded-lg mr-2">
                        Casque
                    </button>
                    <button type="button" className="bg-gray-200 text-gray-700 py-1 px-3 rounded-lg">
                        Écouteur
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {products.map((product) => (
                    <ProductCard key={product.id} {...product} />
                ))}
            </div>
        </div>
    )
}

export default Products
