export type BaseEntity = {
    id: string
    createdAt?: number
}

export type Entity<T> = {
    [K in keyof T]: T[K]
} & BaseEntity

export type User = Entity<{
    email: string
    first_name: string
    last_name: string
    role: 'ADMIN' | 'CUSTOMER'
}>

export type AuthResponse = {
    access_token: string
    refresh_token: string
} & Omit<User, 'id'>

export type Subcategory = Entity<{
    name: string
    category_id: string
}>

export type Category = Entity<{
    name: string
    is_main_category: boolean
    subcategories: Subcategory[]
}>

export type Rating = Entity<{
    star: number
    comment: string
    user_id: string
    username: string
    product_id: string
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
    subcategory_id: string | null
    subcategory_name: string | null
    image_id: string | null
    image_url: string | null
    discount_id: null
    discount_percentage: null
    discount_validity: null
    ratings: Rating[]
    is_available: boolean
}>

export type OrderItem = Entity<{
    order_id: string
    product_id: string
    product_name: string
    price: number
    quantity: number
}>

export type Order = Entity<{
    status: 'PENDING' | 'APPROVED'
    total_amount: number
    order_date: string
    user_id: string
    order_items: OrderItem[]
}>

export type Chat = {
    recipient_id: string
    text: string
}

export type Payment = {
    payment_id: string
    payment_method: string
    is_confirmed: boolean
    order: Order
}
