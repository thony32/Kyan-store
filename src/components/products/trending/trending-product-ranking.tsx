import { Badge } from '@/components/ui/badge'

const TrendingProductRanking = ({ ranking, brand, percentage }: { ranking: number; brand: string; percentage: number }) => {
    return (
        <div className="flex gap-2 items-center">
            <h1 className="text-5xl">{ranking}</h1>
            <div>
                <h1>{brand}</h1>
                <Badge className="bg-background text-foreground">{percentage}%</Badge>
            </div>
        </div>
    )
}

export default TrendingProductRanking
