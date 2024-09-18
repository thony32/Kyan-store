import headphones from '@/components/assets/img/headphones.png'
import joystick from '@/components/assets/img/joystick.png'
import type { Product } from '@/types/api'

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
        id: '4',
        name: 'Sony WH-1000XM3 Bluetooth Wireless Over Ear Headphones with Mic (Silver)',
        description:
            'Digital noise cancelling : Industry leading Active Noise Cancellation (ANC) lends a personalized, virtually soundproof experience at any situation \n Hi-Res Audio : A built-in amplifier integrated in HD Noise Cancelling Processor QN1 realises the best-in-class signal-to-noise ratio and low distortion for portable devices.',
        images: [headphones],
        price: 688,
        stock: 30,
        brand: 'Sony',
        model: 'WH-1000XM3',
        category_id: '2',
        category_name: 'Audio',
        subcategory_id: '3',
        subcategory_name: 'Casque',
        discount: {
            id: '1',
            percentage: 3.5,
            valid_until: new Date('2024-09-30')
        },
        ratings: [
            {
                id: '1',
                star: 4,
                description: 'Midoboka be a',
                user: {
                    id: '1',
                    email: 'g@gmail.com',
                    firstname: 'Jean',
                    lastname: 'Baptiste',
                    phone: '+261 34 42 509 07',
                    role: 'CLIENT'
                }
            },
            {
                id: '2',
                star: 5,
                description: 'Milay eeeeeeeeeeeeeeeeee',
                user: {
                    id: '2',
                    email: 'g@gmail.com',
                    firstname: 'Mendrika',
                    lastname: 'Andrianjazalahatra',
                    phone: '+261 34 20 992 40',
                    role: 'CLIENT'
                }
            }
        ]
    }
]
