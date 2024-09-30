import type { Rating } from '@/types/api'
import Star from '@/components/misc/star'
import { useRatings } from '@/api/products/get-ratings'
import { Loader2, XCircle } from 'lucide-react'

function getRatingAverage(ratings: Rating[]): number {
    if (ratings.length === 0) return 0

    const total = ratings.reduce((acc, rating) => acc + rating.star, 0)
    return Math.round((total / ratings.length) * 10) / 10
}

export default function RatingsCount({
    ratings,
    productId
}: {
    ratings?: Rating[]
    productId?: string
}) {
    if (ratings) {
        return (
            <div className="flex items-center gap-2">
                <Star className="text-yellow-400" />
                <span className="font-medium -ml-1">{getRatingAverage(ratings)}</span>
                <span className="text-gray-500">• {ratings.length} votes</span>
            </div>
        )
    }

    if (!productId) return null

    const { data: fetchedRatings, status } = useRatings({ productId })

    if (status === 'pending') {
        return <Loader2 className="size-4 animate-spin" />
    }

    if (status === 'error') {
        return <XCircle className="text-red-500 size-4" />
    }

    if (!fetchedRatings) return null

    return (
        <div className="flex items-center gap-2">
            <Star className="text-yellow-400" />
            <span className="font-medium -ml-1">{getRatingAverage(fetchedRatings)}</span>
            <span className="text-gray-500">• {fetchedRatings.length} votes</span>
        </div>
    )
}
