// import headphones from "@/components/assets/img/headphones.png";
import joystick from '@/components/assets/img/joystick.png'
import type { Category, Product } from '@/types/api'
import { BarChart, Box, Currency, Percent } from 'lucide-react'

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

export const products: Product[] = [
    {
        id: '10',
        name: 'Sony WH-1000XM3 Bluetooth Wireless Over Ear Headphones with Mic (Silver)',
        description:
            'Digital noise cancelling: Industry leading Active Noise Cancellation (ANC) lends a personalized, virtually soundproof experience at any situation. Hi-Res Audio: A built-in amplifier integrated in HD Noise Cancelling Processor QN1 realises the best-in-class signal-to-noise ratio and low distortion for portable devices. Driver Unit: Powerful 40-mm drivers with Liquid Crystal Polymer (LCP) diaphragms make the headphones perfect for handling heavy beats and can reproduce a full range of frequencies up to 40 kHz. Voice assistant: Alexa enabled (In-built) for voice access to music, information and more.',
        price: 773,
        stock: 30,
        brand: 'Sony',
        model: 'WH-1000XM3',
        category_id: '3',
        category_name: 'Audio',
        subcategory_id: '3-1',
        images: ['https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1692947383286-714WUJlhbLS._SL1500_.jpg'],
        subcategory_name: 'Wireless Headphones',
        discount: {
            id: '1',
            percentage: 1.1,
            valid_until: new Date()
        },
        ratings: [
            {
                id: '1',
                star: 4,
                comment: 'Test comment',
                user: {
                    id: '1',
                    email: 'g@gmail.com',
                    firstname: 'Jean',
                    lastname: 'Baptiste',
                    phone: '+261 34 42 509 07',
                    role: 'CLIENT'
                }
            }
        ]
    },
    {
        id: '12',
        name: 'Microsoft Xbox X/S Wireless Controller Robot White',
        description:
            'Experience the modernized design of the Xbox wireless controller in robot white, featuring sculpted surfaces and refined geometry for enhanced comfort and effortless control during gameplay. Stay on target with textured grip on the triggers, bumpers, and back case and with a new hybrid D-pad for accurate, yet familiar input. Make the controller your own by customizing button mapping with the Xbox accessories app.',
        price: 57,
        stock: 50,
        brand: 'Microsoft',
        model: 'Xbox X/S',
        category_id: '4',
        category_name: 'Jeu',
        subcategory_id: '4-1',
        images: ['https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1692255251854-xbox.jpg'],
        subcategory_name: 'Controllers',
        discount: {
            id: '2',
            percentage: 0.4,
            valid_until: new Date()
        },
        ratings: [
            {
                id: '1',
                star: 4,
                comment: 'Test comment',
                user: {
                    id: '1',
                    email: 'g@gmail.com',
                    firstname: 'Jean',
                    lastname: 'Baptiste',
                    phone: '+261 34 42 509 07',
                    role: 'CLIENT'
                }
            }
        ]
    },
    {
        id: '3',
        name: 'Logitech G733 Lightspeed Wireless Gaming Headset with Suspension Headband',
        description:
            'Total freedom with up to 20 m wireless range and LIGHTSPEED wireless audio transmission. Keep playing for up to 29 hours of battery life. Personalize your headset lighting across the full spectrum, 16.8M colors. Advanced mic filters that make your voice sound richer, cleaner, and more professional.',
        price: 384,
        stock: 40,
        brand: 'Logitech G',
        model: 'G733 LIGHTSPEED',
        category_id: '4',
        category_name: 'Jeu',
        subcategory_id: '4-2',
        images: ['https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1692257709689-logitech%20heaphone.jpg'],
        subcategory_name: 'Headsets',
        discount: {
            id: '3',
            percentage: 0.3,
            valid_until: new Date()
        },
        ratings: [
            {
                id: '1',
                star: 4,
                comment: 'Test comment',
                user: {
                    id: '1',
                    email: 'g@gmail.com',
                    firstname: 'Jean',
                    lastname: 'Baptiste',
                    phone: '+261 34 42 509 07',
                    role: 'CLIENT'
                }
            }
        ]
    },
    {
        id: '4',
        name: 'Sony WH-1000XM5 Wireless Industry Leading Active Noise Cancelling Headphones',
        description:
            'Industry-leading noise cancellation with two processors controlling 8 microphones. Industry-leading call quality with our Precise Voice Pickup Technology uses four beamforming microphones and an AI-based noise reduction algorithm. Magnificent sound, engineered to perfection with the new Integrated Processor V1.',
        price: 362,
        stock: 30,
        brand: 'Sony',
        model: 'WH1000XM5/SMIN',
        category_id: '3',
        category_name: 'Audio',
        subcategory_id: '3-1',
        images: ['https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1692941008275-headphone3.jpg'],
        subcategory_name: 'Wireless Headphones',
        discount: {
            id: '1',
            percentage: 1.1,
            valid_until: new Date()
        },
        ratings: [
            {
                id: '1',
                star: 4,
                comment: 'Test comment',
                user: {
                    id: '1',
                    email: 'g@gmail.com',
                    firstname: 'Jean',
                    lastname: 'Baptiste',
                    phone: '+261 34 42 509 07',
                    role: 'CLIENT'
                }
            }
        ]
    },
    {
        id: '5',
        name: 'Urbanista Los Angeles Sand Gold - World’s 1st Solar Powered Hybrid Active Noise Cancelling Headphones',
        description:
            'URBANISTA LOS ANGELES, the world’s first solar-charging premium wireless headphones powered by Powerfoyle solar cell material. Los Angeles converts all light, outdoor and indoor, into energy to deliver virtually infinite playtime.',
        price: 265,
        stock: 25,
        brand: 'Urbanista',
        model: 'Los Angeles',
        category_id: '3',
        category_name: 'Audio',
        subcategory_id: '3-2',
        images: ['https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1691056487173-headphon2.jpg'],
        subcategory_name: 'Solar Powered Headphones',
        discount: {
            id: '2',
            percentage: 1.9,
            valid_until: new Date()
        },
        ratings: [
            {
                id: '1',
                star: 4,
                comment: 'Test comment',
                user: {
                    id: '1',
                    email: 'g@gmail.com',
                    firstname: 'Jean',
                    lastname: 'Baptiste',
                    phone: '+261 34 42 509 07',
                    role: 'CLIENT'
                }
            }
        ]
    }
]

export const categories: Category[] = [
    {
        id: 'gdjhgdzdga',
        name: 'TV',
        is_main_category: true,
        subcategories: []
    },
    {
        id: 'gdgs5dgs',
        name: 'Audio',
        is_main_category: true,
        subcategories: [
            {
                id: 'gfggzdsg',
                name: 'Wireless Headphones',
                category_id: 'gdgs5dgs'
            },
            {
                id: 'dkjfzHFIDF',
                name: 'Solar Powered Headphones',
                category_id: 'gdgs5dgs'
            },
            {
                id: 'dgzdg50gz',
                name: 'Headsets',
                category_id: 'gdgs5dgs'
            }
        ]
    },
    {
        id: 'gdshdg',
        name: 'Smartphone',
        is_main_category: true,
        subcategories: []
    },
    {
        id: 'agldjftouir',
        name: 'Laptop',
        is_main_category: true,
        subcategories: []
    },
    {
        id: 'izgyfdhsqb',
        name: 'Jeu',
        is_main_category: true,
        subcategories: [
            {
                id: 'gzdgjefg',
                name: 'Controllers',
                category_id: 'izgyfdhsqb'
            },
            {
                id: 'aorjojg',
                name: 'Headsets',
                category_id: 'izgyfdhsqb'
            }
        ]
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
    }
] as Links[]
