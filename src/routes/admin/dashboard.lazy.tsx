import { useCategories } from '@/api/categories/get-categories'
import { useProducts } from '@/api/products/get-products'
import StatCards from '@/components/back-office/dashboard/stat-cards'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import type { Category } from '@/types/api'
import { createLazyFileRoute } from '@tanstack/react-router'
import { useCallback, useMemo } from 'react'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

type CategoryColor = {
    [key: string]: string
}

const categoryColors = {
    Audio: 'red',
    Ordinateur: 'blue',
    TV: 'yellow',
    Jeu: 'green',
    Electroménager: 'purple',
    Smartphone: 'orange'
} as CategoryColor

const Dashboard = () => {
    const { data: categories } = useCategories({})
    const { data: products } = useProducts({})

    const chartConfig = useMemo(() => {
        return categories?.reduce((config: any, category: Category) => {
            const key = category.name.toLowerCase()
            config[key] = {
                label: category.name,
                color: categoryColors[category.name] || 'black'
            }
            return config
        }, {}) as any
    }, [categories])

    const getCategoryProductCount = useCallback(
        (categoryName: string) => {
            return products?.filter((product) => product.category_name.toLowerCase() === categoryName.toLowerCase()).length || 0
        },
        [products]
    )

    const chartData = useMemo(
        () => [
            {
                category: '',
                audio: getCategoryProductCount('Audio'),
                ordinateur: getCategoryProductCount('Ordinateur'),
                tv: getCategoryProductCount('TV'),
                jeu: getCategoryProductCount('Jeu'),
                electroménager: getCategoryProductCount('Electroménager'),
                smartphone: getCategoryProductCount('Smartphone')
            }
        ],
        [getCategoryProductCount]
    )

    return (
        <div className="p-16 space-y-8">
            <div className="flex gap-4">
                {' '}
                <StatCards />
            </div>
            <div className="w-3/4">
                <ChartContainer config={chartConfig}>
                    <h1 className="text-xl uppercase font-bold">Nombre de produits par catégorie</h1>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="category" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value.slice(0, 3)} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        {categories?.map((category) => (
                            <Bar key={category.id} dataKey={category.name.toLowerCase()} fill={categoryColors[category.name] || 'black'} radius={4} />
                        ))}
                    </BarChart>
                </ChartContainer>
            </div>
        </div>
    )
}

export default Dashboard

export const Route = createLazyFileRoute('/admin/dashboard')({
    component: Dashboard
})
