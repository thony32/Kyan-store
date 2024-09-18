import { trendingProduct, trendingRanking } from '@/constants'
import { type FC, lazy } from 'react'
import TrendingProductCard from './trending/trending-product-card'
import TrendingProductRanking from './trending/trending-product-ranking'
const Carousel = lazy(() => import('./trending/carousel'))

const TrendingProducts: FC = () => {
    return (
        <div className="grid grid-cols-9">
            <div className="col-span-4">
                <Carousel />
            </div>
            <div className="col-span-4 flex-wrap flex px-4 py-2 border-r border-gray-400">
                {trendingProduct.map((trending) => (
                    <TrendingProductCard
                        key={trending.imgSrc}
                        imgSrc={trending.imgSrc}
                        productName={trending.productName}
                        productDescription={trending.productDescription}
                        price={trending.price}
                    />
                ))}
            </div>
            <div className="col-span-1 px-6 py-2 space-y-6">
                <h1 className="text-sm text-gray-400">Meilleures ventes</h1>
                {trendingRanking.map((ranking) => (
                    <TrendingProductRanking key={ranking.ranking} ranking={ranking.ranking} brand={ranking.brand} percentage={ranking.percentage} />
                ))}
            </div>
        </div>
    )
}

export default TrendingProducts
