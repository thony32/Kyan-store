import { useCategories } from '@/api/categories/get-categories'
import { Skeleton } from '@/components/ui/skeleton'
import { useFilterStore } from '@/store/filter-store'
import type { Category } from '@/types/api'
import { cn } from '@/utils/cn'
import type { FC } from 'react'

const ProductsFilter: FC = () => {
    const { data, status, error } = useCategories({})

    const selected = useFilterStore((state) => state.selected)
    const setSelected = useFilterStore((state) => state.setSelected)

    const handleSelect = (category: Category | null) => {
        setSelected(category)
    }

    return (
        <div className="fixed flex flex-col gap-8 items-start min-h-[100dvh]">
            <h1 className="font-extrabold text-lg">Catégories</h1>
            {status === 'pending' ? (
                Array.from({ length: 5 }).map((_, idx) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                    <Skeleton key={idx} className="h-6 w-36" />
                ))
            ) : status === 'error' ? (
                `Error : ${error.message}`
            ) : (
                <>
                    <button
                        type="button"
                        className={cn('hover:text-orange-500 duration-200', selected === null && 'text-orange-500')}
                        onClick={() => handleSelect(null)}
                    >
                        Tout
                    </button>
                    {data.map((category) => (
                        <button
                            key={category.id}
                            type="button"
                            className={cn('hover:text-orange-500 duration-200', selected?.id === category.id && 'text-orange-500')}
                            onClick={() => handleSelect(category)}
                        >
                            {category.name}
                        </button>
                    ))}
                </>
            )}
        </div>
    )
}

export default ProductsFilter
