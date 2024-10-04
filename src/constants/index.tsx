// import headphones from "@/components/assets/img/headphones.png";
import joystick from '@/components/assets/img/joystick.png'
import { BarChart, Box, CreditCard, Currency, Percent } from 'lucide-react'

export const trendingProduct = [
    {
        imgSrc: joystick,
        productName: 'Ant Esports GP310',
        productDescription: 'Wireless Gamepad, Compatible for PC & Laptop (Windows 10/8 /7, Steam) / PS3 / Android',
        price: 16
    },
    {
        imgSrc: joystick,
        productName: 'Ant Esports GP310',
        productDescription: 'Wireless Gamepad, Compatible for PC & Laptop (Windows 10/8 /7, Steam) / PS3 / Android',
        price: 16
    },
    {
        imgSrc: joystick,
        productName: 'Ant Esports GP310',
        productDescription: 'Wireless Gamepad, Compatible for PC & Laptop (Windows 10/8 /7, Steam) / PS3 / Android',
        price: 16
    },
    {
        imgSrc: joystick,
        productName: 'Ant Esports GP310',
        productDescription: 'Wireless Gamepad, Compatible for PC & Laptop (Windows 10/8 /7, Steam) / PS3 / Android',
        price: 16
    }
]

export const trendingRanking = [
    {
        ranking: 1,
        brand: 'Apple',
        percentage: 98
    },
    {
        ranking: 2,
        brand: 'Samsung',
        percentage: 95
    },
    {
        ranking: 3,
        brand: 'Xiaomi',
        percentage: 90
    }
]

type Links = {
    name: string
    href: string
    icon: JSX.Element
}

export const adminLinks = [
    {
        name: 'Dashboard',
        href: '/admin/dashboard',
        icon: <BarChart />
    },
    {
        name: 'Products',
        href: '/admin/product',
        icon: <Box />
    },
    {
        name: 'Categories',
        href: '/admin/category',
        icon: <Currency />
    },
    {
        name: 'Discount',
        href: '/admin/discount',
        icon: <Percent />
    },
    {
        name: 'Payments',
        href: '/admin/payment',
        icon: <CreditCard />
    }
] as Links[]
