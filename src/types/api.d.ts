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

export type Subcategory = Entity<{
    name: string
    category_id: string
}>

export type Category = Entity<{
    name: string
    is_main_category: boolean
    subcategories: Subcategory[]
}>

export type Discount = Entity<{
    percentage: number
    valid_until: Date
}>

export type Rating = Entity<{
    id: string
    star: number
    comment: string
    user: User
}>

export type Product = Entity<{
    name: string
    description: string
    price: number
    quantity: number
    brand: string
    model: string
    category_id: string
    category_name: string
    subcategory_id: string
    subcategory_name: string
    image_id: string | null
    image_url: string | null
    discount: Discount
    ratings: Rating[]
}>
