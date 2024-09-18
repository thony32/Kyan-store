export type BaseEntity = {
    id: string
    createdAt?: number
}

export type Entity<T> = {
    [K in keyof T]: T[K]
} & BaseEntity

export type User = Entity<{
    email: string
    firstname: string
    lastname: string
    phone: string
    role: 'ADMIN' | 'CLIENT'
}>

export type Discount = Entity<{
    percentage: number
    valid_until: Date
}>

export type Rating = Entity<{
    id: string
    star: number
    description: string
    user: User
}>

export type Product = Entity<{
    name: string
    description: string
    price: number
    stock: number
    brand: string
    model: string
    category_id: string
    category_name: string
    subcategory_id: string
    subcategory_name: string
    images: string[]
    discount: Discount
    ratings: Rating[]
}>
