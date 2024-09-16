import { type FC, lazy } from 'react'
const Carousel = lazy(() => import('./trending/carousel'))

const TrendingProducts: FC = () => {
    return (
        <div className="grid grid-cols-9">
            <div className="col-span-4">
                <Carousel />
            </div>
            <div className="col-span-4 px-6 py-2 border-r border-gray-400">Test</div>
            <div className="col-span-1 px-6 py-2">Test2</div>
        </div>
    )
}

export default TrendingProducts
