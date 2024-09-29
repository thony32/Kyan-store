import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Progress } from '@/components/ui/progress'
import { createLazyFileRoute } from '@tanstack/react-router'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

const chartData = [
    { month: 'January', desktop: 186, mobile: 80 },
    { month: 'February', desktop: 305, mobile: 200 },
    { month: 'March', desktop: 237, mobile: 120 },
    { month: 'April', desktop: 73, mobile: 190 },
    { month: 'May', desktop: 209, mobile: 130 },
    { month: 'June', desktop: 214, mobile: 140 }
]

const chartConfig = {
    desktop: {
        label: 'Desktop',
        color: '#2563eb'
    },
    mobile: {
        label: 'Mobile',
        color: '#60a5fa'
    }
} satisfies ChartConfig

const Dashboard = () => {
    return (
        <div className="p-16 space-y-8">
            <div className="flex gap-4">
                {' '}
                {Array(3)
                    .fill(0)
                    .map((_: any, index: number) => (
                        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                        <Card key={index} className="w-[350px]">
                            <CardHeader>
                                <CardTitle>Produits</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <h1 className="text-3xl font-bold">24k</h1>
                            </CardContent>
                        </Card>
                    ))}
                <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle>Produits</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <h1 className="text-3xl font-bold">24k</h1>
                        <Progress value={13} />
                    </CardContent>
                </Card>
            </div>
            <div className="w-3/4">
                <ChartContainer config={chartConfig} className="w-full">
                    <h1 className="text-2xl">Sales</h1>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value.slice(0, 3)} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
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
