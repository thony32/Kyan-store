import { useProducts } from '@/api/products/get-products'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useFilterStore } from '@/store/filter-store'
import { useViewItemStore } from '@/store/view-item-store'
import type { Product } from '@/types/api'
import getDiscountAmount from '@/utils/get-discount-amount'
import RatingsCount from './ratings-count'

const ProductCard = ({ product }: { product: Product }) => {
    const setOpenProduct = useViewItemStore((state) => state.setOpen)

    return (
        <button type="button" onClick={() => setOpenProduct(product)} className="border rounded-lg p-2">
            {product.image_url ? (
                <img src={product.image_url} alt={product.name} className="w-full h-40 object-contain mb-2" />
            ) : (
                <div className="w-full rounded h-40 bg-gray-100 mb-2" />
            )}
            <div className="px-2">
                <p className="text-sm text-left font-bold truncate w-full">{product.name}</p>
                <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm line-through text-gray-500">{product.price}</span>
                    <span className="font-semibold text-lg">
                        <span className="text-green-400">$</span>
                        {product.price - getDiscountAmount(product)}
                    </span>
                    {product.discount_percentage && (
                        <Badge className="bg-destructive h-fit px-1 rounded-sm shadow-none pointer-events-none">
                            -{product.discount_percentage * 10}%
                        </Badge>
                    )}
                </div>
                <RatingsCount ratings={product.ratings} />
            </div>
        </button>
    )
}

const ProductSkeleton = () => {
    return (
        <div className="border rounded-lg px-4 py-2">
            <Skeleton className="w-full h-40 bg-gray-200 mb-2" />
            <Skeleton className="h-4 bg-gray-200 w-3/4 mb-2" />
            <Skeleton className="h-4 bg-gray-200 w-1/2 mb-2" />
            <Skeleton className="h-4 bg-gray-200 w-1/4 mb-2" />
        </div>
    )
}

const Products: React.FC = () => {
    const { data, status, error } = useProducts({})
    const categorySelected = useFilterStore((state) => state.selected)
    const subFilter = useFilterStore((state) => state.subcategory)
    const setSubFilter = useFilterStore((state) => state.setSubcategory)

    return (
        <div className=" mx-auto">
            <div className="flex gap-4 mb-4">
                <h2 className="text-lg">Produits récents:</h2>
                {categorySelected && (
                    <div className="space-x-2">
                        {categorySelected.subcategories.map((subcategory) => (
                            <Button
                                key={subcategory.id}
                                type="button"
                                className="rounded-lg opacity-70"
                                onClick={() => setSubFilter(!subFilter ? subcategory : subFilter === subcategory ? null : subcategory)}
                                variant={subcategory !== subFilter ? 'secondary' : undefined}
                            >
                                {subcategory.name}
                            </Button>
                        ))}
                    </div>
                )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {status === 'pending' ? (
                    Array.from({ length: 5 }).map((_, idx) => (
                        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                        <ProductSkeleton key={idx} />
                    ))
                ) : status === 'error' ? (
                    <p className="text-destructive col-span-5">Error: {error.message}</p>
                ) : (
                    data
                        .filter((product) => (categorySelected ? product.category_name === categorySelected?.name : true))
                        .filter((product) => (subFilter ? product.subcategory_name === subFilter.name : true))
                        .map((product) => <ProductCard key={product.id} product={product} />)
                )}
            </div>
        </div>
    )
}

export default Products
