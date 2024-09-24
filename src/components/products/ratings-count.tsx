import type { Rating } from '@/types/api'
import Star from '@/components/misc/star'

function getRatingAverage(ratings: Rating[]) {
    if (ratings.length > 0) {
        const average = ratings.reduce((acc, rating) => acc + rating.star, 0) / ratings.length
        return Math.round(average * 10) / 10
    }
    return 0
}

export default function RatingsCount({ ratings }: { ratings: Rating[] }) {
    return (
        <div className="flex items-center gap-2">
            <Star className="text-yellow-400" />
            <span className="font-medium -ml-1">{getRatingAverage(ratings)}</span>
            <span className="text-gray-500">• {ratings.length} votes</span>
        </div>
    )
}
