import ProductsFilter from '@/components/products/products-filter'
import TrendingProducts from '@/components/products/trending-products'
import { createLazyFileRoute } from '@tanstack/react-router'

const Landing = () => {
    return (
        <div className="grid grid-cols-12">
            <div className="px-12 py-6 col-span-2 bg-gradient-to-br from-[#FFCED6] via-[#EDF2FE] to-[#C1D0FF] ">
                <ProductsFilter />
            </div>
            <div className="px-12 py-6 col-span-10">
                <TrendingProducts />
            </div>
        </div>
    )
}

export const Route = createLazyFileRoute('/_public/')({
    component: Landing
})
