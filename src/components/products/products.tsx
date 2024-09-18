import { products } from '@/constants'
import { Badge } from '../ui/badge'
import type { Product } from '@/types/api'
import getDiscountAmount from '@/utils/get-discount-amount'
import RatingsCount from './ratings-count'
import { useViewItemStore } from '@/store/view-item-store'

const ProductCard = ({ product }: { product: Product }) => {
    const setOpenProduct = useViewItemStore((state) => state.setOpen)

    return (
        <div className="border rounded-lg px-4 py-2">
            <img src={product.images[0]} alt={product.name} className="w-full h-40 object-contain mb-2" />
            <button type="button" onClick={() => setOpenProduct(product)} className="text-sm font-bold truncate w-full">
                {product.name}
            </button>
            <div className="flex items-center space-x-2 mb-2">
                <span className="text-sm line-through text-gray-500">{product.price}</span>
                <span className="font-semibold text-lg">
                    <span className="text-green-400">$</span>
                    {product.price - getDiscountAmount(product)}
                </span>
                <Badge className="bg-destructive h-fit px-1 rounded-sm shadow-none pointer-events-none">-{product.discount.percentage * 10}%</Badge>
            </div>
            <RatingsCount ratings={product.ratings} />
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
                {/* Mandrapaha de averina tena produit */}
                {Array.from({ length: 10 }).map((_, index) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                    <ProductCard key={index} product={products[0]} />
                ))}
            </div>
        </div>
    )
}

export default Products
