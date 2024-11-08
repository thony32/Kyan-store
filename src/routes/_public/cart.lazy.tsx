import { useDeleteOrderItem } from '@/api/order/delete-orderItem'
import { useOrder } from '@/api/order/get-order'
import { useUpdateOrderItem } from '@/api/order/update-orderitem'
import { usePayOrder } from '@/api/payment/pay-order'
import { getProductsQueryOptions } from '@/api/products/get-products'
import { Button, buttonVariants } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { useAuthDialogStore } from '@/store/auth-dialog-store'
import { useAuthStore } from '@/store/auth-store'
import { useOrderStore } from '@/store/order-store'
import { usePaymentIdStore } from '@/store/payment-store'
import { useViewItemStore } from '@/store/view-item-store'
import type { Product } from '@/types/api'
import { cn } from '@/utils/cn'
import { useOrderUtils } from '@/utils/order-utils'
import { useQueryClient } from '@tanstack/react-query'
import { Link, createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { ArrowLeft, Minus, Plus, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'

export const Route = createLazyFileRoute('/_public/cart')({
    component: CartPage
})

function CartPage() {
    const user = useAuthStore((state) => state.user)
    const navigate = useNavigate({ from: '/cart' })
    const setShouldOpen = useAuthDialogStore((state) => state.setShouldOpen)

    if (!user || user.role === 'ADMIN') {
        setShouldOpen(true)
        navigate({ to: '/' })
        return null
    }

    const { data: order } = useOrder({ userId: user.id })

    return (
        <main className="max-w-screen-lg mx-auto grid gap-y-6">
            <section className="sticky top-20 bg-white py-4 flex items-end justify-between">
                <h1 className="text-4xl font-bold">
                    Mon panier{' '}
                    <small className="font-medium text-lg">
                        ({!order?.[0]?.order_items.length ? 0 : order[0].order_items.reduce((sum, item) => sum + item.quantity, 0)} articles)
                    </small>
                </h1>
                <Link to="/" className={cn(buttonVariants({ variant: 'outline' }), 'gap-2')}>
                    <ArrowLeft className="size-4" /> Continuer mes achats
                </Link>
            </section>
            <OrderList />
        </main>
    )
}

function OrderList() {
    const order = useOrderStore((state) => state.order)
    const [products, setProducts] = useState<Product[] | undefined>(undefined)
    const queryClient = useQueryClient()
    const updateItemMutation = useUpdateOrderItem({ userId: order?.user_id })
    const deleteItemMutation = useDeleteOrderItem({ userId: order?.user_id })
    const payOrderMutation = usePayOrder({ userId: order?.user_id })
    const paymentId = usePaymentIdStore((state) => state.paymentId)
    const navigate = useNavigate({ from: '/cart' })

    const { getTotal, getTotalDiscount, getSubtotal } = useOrderUtils(order?.order_items, products)
    const setOpenItem = useViewItemStore((state) => state.setOpen)

    const handlePay = (orderId: string) => {
        if (!paymentId) payOrderMutation.mutate(orderId)
        navigate({ to: '/payment' })
    }

    useEffect(() => {
        if (order) {
            const fetchProducts = async () => {
                const data = await queryClient.ensureQueryData(getProductsQueryOptions())
                setProducts(data)
            }

            fetchProducts()
        }
    }, [order])

    return order?.order_items.length && products ? (
        <section className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-4">
                {order.order_items.map((item) => {
                    const product = products.find((p) => p.id === item.product_id)!

                    return (
                        <article key={item.id} className="flex shadow-md rounded-md p-4 gap-6 items-center">
                            {product.image_url ? (
                                <img src={product.image_url} alt={product.name} className="w-full max-w-52 aspect-square object-contain shrink-0" />
                            ) : (
                                <div className="size-52 shrink-0 bg-gray-50 rounded-md" />
                            )}

                            <div className="flex flex-col gap-2">
                                <button type="button" className="line-clamp-2 text-left cursor-pointer" onClick={() => setOpenItem(product)}>
                                    {item.product_name}
                                </button>
                                <div className="text-muted-foreground text-sm">
                                    <p>Modèle: {product.model}</p>
                                    <p>Prix: ${item.price}</p>
                                    <p className="text-green-600">{product.is_available && 'En stock'}</p>
                                </div>
                                <div className="flex gap-10">
                                    <div className="flex border-2 w-fit rounded">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                updateItemMutation.mutate({
                                                    values: {
                                                        id: item.id,
                                                        orderId: item.order_id,
                                                        productId: item.product_id,
                                                        quantity: item.quantity - 1
                                                    }
                                                })
                                            }
                                            disabled={item.quantity === 1}
                                            className="grid place-items-center px-2"
                                        >
                                            <Minus className="size-4" />
                                        </button>
                                        <span className="h-8 min-w-8 px-2 grid place-items-center border-x-2">{item.quantity}</span>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                updateItemMutation.mutate({
                                                    values: {
                                                        id: item.id,
                                                        orderId: item.order_id,
                                                        productId: item.product_id,
                                                        quantity: item.quantity + 1
                                                    }
                                                })
                                            }
                                            disabled={product.quantity === item.quantity}
                                            className="grid place-items-center px-2"
                                        >
                                            <Plus className="size-4" />
                                        </button>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        disabled={deleteItemMutation.isPending}
                                        onClick={() => deleteItemMutation.mutate(item.id)}
                                    >
                                        <Trash2 className="size-4 mr-2" /> Supprimer
                                    </Button>
                                </div>
                                <div className="flex justify-end">
                                    <Checkbox
                                        id={item.id}
                                        defaultChecked
                                        disabled
                                        // onCheckedChange={() => includeItem(item)}
                                        className="rounded-[4px]"
                                    />
                                </div>
                            </div>
                        </article>
                    )
                })}
            </div>
            <aside className="sticky top-40 h-fit">
                <div className="bg-muted/20 rounded-2xl shadow-md p-4 flex flex-col gap-2">
                    <h3 className="font-medium text-lg text-center">Résumé de la commande</h3>
                    <hr />
                    <ul className="grid grid-cols-2">
                        <li className="text-sm">Prix:</li>
                        <li className="text-sm">${getTotal}</li>
                        <li className="text-sm">Livraison:</li>
                        <li className="text-sm text-green-500">Gratuit</li>
                        <li className="text-sm">Remise: </li>
                        <li className="text-sm text-destructive">
                            -$
                            {getTotalDiscount}
                        </li>
                    </ul>
                    <hr />
                    <ul className="grid grid-cols-2">
                        <li className="font-medium text-lg">Total:</li>
                        <li className="font-medium text-lg">${getSubtotal}</li>
                    </ul>
                    <Button onClick={() => handlePay(order.id)} disabled={payOrderMutation.isPending} className="w-full mt-2">
                        Procéder au paiement
                    </Button>
                </div>
            </aside>
        </section>
    ) : (
        <EmptyOrder />
    )
}

function EmptyOrder() {
    return (
        <section className="flex flex-col items-center justify-center">
            <svg className="size-64" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_4755_703)">
                    <path
                        d="M127.696 225.393C181.653 225.393 225.393 181.653 225.393 127.696C225.393 73.7402 181.653 30 127.696 30C73.7402 30 30 73.7402 30 127.696C30 181.653 73.7402 225.393 127.696 225.393Z"
                        fill="#E0E9F9"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M178.04 144.809L184.68 147.843L169.923 193.053L163.282 190.018L178.04 144.809Z"
                        fill="#3594DC"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M180.004 136.573C180.004 136.573 197.265 90.3867 203.121 74.698C204.224 71.7265 206.942 70.2511 209.515 71.1964L221.142 75.4675C221.754 75.6926 222.253 76.237 222.524 76.9505C222.795 77.664 222.795 78.4764 222.539 79.1771C222.149 80.2256 221.699 81.4145 221.345 82.3677C220.916 83.5282 219.848 84.111 218.84 83.7409C215.695 82.5856 209.419 80.2799 209.419 80.2799L187.365 139.296L180 136.59L180.004 136.573Z"
                        fill="#3594DC"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M93.3391 179.4L175.255 188.839L172.898 193.05L90.9823 183.611L93.3391 179.4Z"
                        fill="#3594DC"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M204.071 93.671L70.4136 75.8339C70.4136 75.8339 71.0445 123.994 71.3226 144.017C71.3935 148.979 75.3315 153.129 80.666 153.841C100.796 156.527 148.372 162.877 168.502 165.563C173.836 166.275 178.994 163.339 180.679 158.611C187.559 139.544 204.071 93.671 204.071 93.671Z"
                        fill="#4FB4F3"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M109.054 101.336L108.855 137.215C108.846 139.685 109.865 140.774 111.673 140.966C113.482 141.158 115.386 140.393 115.408 137.928L115.605 102.067C115.614 99.5971 114.063 98.0936 112.257 97.8844C110.451 97.6751 109.076 98.8713 109.054 101.336Z"
                        fill="#1D77C7"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M150.983 106.229L141.757 140.902C141.126 143.289 141.838 144.6 143.54 145.241C145.242 145.882 147.277 145.621 147.92 143.241L157.138 108.585C157.769 106.197 156.647 104.352 154.951 103.694C153.256 103.037 151.625 103.849 150.983 106.229Z"
                        fill="#1D77C7"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M109.046 104.994L108.84 137.445C108.829 139.907 109.945 141.32 111.745 141.497C113.545 141.675 115.34 140.563 115.363 138.106L115.569 105.655C115.58 103.193 114.038 101.683 112.24 101.488C110.44 101.31 109.07 102.537 109.046 104.994Z"
                        fill="#3594DC"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M150.054 109.767L141.685 141.121C141.054 143.5 141.779 145.149 143.476 145.774C145.174 146.399 147.19 145.775 147.832 143.403L156.2 112.049C156.831 109.669 155.719 107.819 154.028 107.178C152.331 106.552 150.696 107.395 150.054 109.767Z"
                        fill="#3594DC"
                    />
                    <path
                        d="M179.849 193.171C182.209 186.284 178.373 178.622 171.281 176.057C164.189 173.493 156.526 176.997 154.167 183.885C151.807 190.772 155.643 198.434 162.735 200.999C169.827 203.563 177.489 200.059 179.849 193.171Z"
                        fill="#4FB4F3"
                    />
                    <path
                        d="M171.041 189.991C171.781 187.829 170.577 185.424 168.351 184.619C166.125 183.814 163.719 184.914 162.979 187.076C162.238 189.238 163.442 191.643 165.668 192.448C167.895 193.253 170.3 192.153 171.041 189.991Z"
                        fill="white"
                    />
                    <path
                        d="M102.198 190.645C106.268 185.157 105.204 177.495 99.8212 173.531C94.4389 169.566 86.7767 170.801 82.7072 176.288C78.6376 181.775 79.7018 189.438 85.0841 193.402C90.4664 197.367 98.1287 196.132 102.198 190.645Z"
                        fill="#4FB4F3"
                    />
                    <path
                        d="M95.5136 185.725C96.7911 184.003 96.457 181.598 94.7675 180.353C93.078 179.109 90.6727 179.496 89.3953 181.219C88.1179 182.941 88.4519 185.346 90.1415 186.591C91.831 187.835 94.2362 187.448 95.5136 185.725Z"
                        fill="white"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M101.433 80.0539C99.8617 96.9216 86.9806 110.031 70.9799 112.57L68.3635 76.9731L101.433 80.0539Z"
                        fill="#3594DC"
                    />
                    <path
                        d="M63.3354 105.254C79.4532 105.254 92.5192 92.1882 92.5192 76.0704C92.5192 59.9526 79.4532 46.8866 63.3354 46.8866C47.2177 46.8866 34.1516 59.9526 34.1516 76.0704C34.1516 92.1882 47.2177 105.254 63.3354 105.254Z"
                        fill="#AA99EC"
                    />
                    <path
                        d="M70.5185 78.3753C70.5185 75.2986 70.0503 72.9577 69.1808 71.2856C68.3114 69.6135 67.0406 68.744 65.3685 68.744C63.7633 68.744 62.4926 69.5466 61.6232 71.2856C60.7537 72.9577 60.3523 75.2986 60.3523 78.3753C60.3523 81.4519 60.7537 83.7928 61.6232 85.5317C62.4926 87.2038 63.6964 88.0733 65.3685 88.0733C66.9737 88.0733 68.2445 87.2038 69.1808 85.5317C70.0503 83.7928 70.5185 81.4519 70.5185 78.3753ZM79.414 78.3753C79.414 81.0506 79.0797 83.4584 78.344 85.5317C77.6751 87.6051 76.6719 89.344 75.468 90.8154C74.1972 92.22 72.7257 93.2902 71.0536 94.0259C69.3146 94.7616 67.442 95.0961 65.4355 95.0961C63.3621 95.0961 61.4894 94.7616 59.7504 94.0259C58.0114 93.2902 56.5399 92.22 55.336 90.8154C54.1321 89.4109 53.1289 87.672 52.46 85.5317C51.7912 83.4584 51.4568 81.0506 51.4568 78.3753C51.4568 75.6999 51.7912 73.2922 52.46 71.2188C53.1289 69.1454 54.1321 67.4064 55.336 66.0019C56.6068 64.5973 58.0783 63.5272 59.7504 62.7914C61.4894 62.0557 63.3621 61.7213 65.4355 61.7213C67.442 61.7213 69.3146 62.1226 71.0536 62.7914C72.7926 63.5272 74.2641 64.5973 75.468 66.0019C76.6719 67.4064 77.6751 69.1454 78.344 71.2188C79.0797 73.2922 79.414 75.6999 79.414 78.3753Z"
                        fill="#6E56CF"
                    />
                    <path
                        d="M68.768 75.3256C68.768 72.249 68.2998 69.908 67.4303 68.236C66.5609 66.5639 65.2901 65.6944 63.618 65.6944C62.0128 65.6944 60.7422 66.497 59.8727 68.236C59.0032 69.908 58.6018 72.249 58.6018 75.3256C58.6018 78.4023 59.0032 80.7432 59.8727 82.4821C60.7422 84.1542 61.946 85.0237 63.618 85.0237C65.2232 85.0237 66.494 84.1542 67.4303 82.4821C68.2998 80.7432 68.768 78.4023 68.768 75.3256ZM77.6635 75.3256C77.6635 78.001 77.3292 80.4087 76.5935 82.4821C75.9246 84.5555 74.9214 86.2944 73.7175 87.7658C72.4467 89.1704 70.9752 90.2405 69.3031 90.9763C67.5641 91.712 65.6915 92.0464 63.685 92.0464C61.6116 92.0464 59.7389 91.712 57.9999 90.9763C56.261 90.2405 54.7895 89.1704 53.5856 87.7658C52.3817 86.3613 51.3784 84.6224 50.7095 82.4821C50.0407 80.4087 49.7063 78.001 49.7063 75.3256C49.7063 72.6503 50.0407 70.2426 50.7095 68.1692C51.3784 66.0958 52.3817 64.3568 53.5856 62.9523C54.8563 61.5477 56.3278 60.4775 57.9999 59.7418C59.7389 59.0061 61.6116 58.6716 63.685 58.6716C65.6915 58.6716 67.5641 59.073 69.3031 59.7418C71.0421 60.4775 72.5136 61.5477 73.7175 62.9523C74.9214 64.3568 75.9246 66.0958 76.5935 68.1692C77.3292 70.2426 77.6635 72.6503 77.6635 75.3256Z"
                        fill="white"
                    />
                    <path
                        d="M23.2203 60.2987C23.1336 60.2987 23.0295 60.2814 22.9428 60.2641L5.99914 56.1539C5.35747 55.9978 4.95857 55.3561 5.11466 54.7145C5.27074 54.0728 5.91242 53.6739 6.55409 53.83L23.4977 57.9402C24.1394 58.0962 24.5383 58.7379 24.3822 59.3796C24.2435 59.9346 23.7579 60.2987 23.2203 60.2987Z"
                        fill="#AA99EC"
                    />
                    <path
                        d="M42.1253 40.8861C41.6397 40.8861 41.1888 40.5913 41.0154 40.123L35.8646 26.6826C35.6218 26.0583 35.934 25.3819 36.5583 25.1391C37.1827 24.8963 37.859 25.2085 38.1018 25.8328L43.2525 39.2733C43.4953 39.8976 43.1832 40.5739 42.5588 40.8167C42.4201 40.8514 42.264 40.8861 42.1253 40.8861Z"
                        fill="#AA99EC"
                    />
                    <path
                        d="M29.0038 48.9215C28.6916 48.9215 28.3968 48.8001 28.154 48.5746L12.0775 32.4981C11.6093 32.0299 11.6093 31.2668 12.0775 30.8159C12.5458 30.3477 13.3088 30.3477 13.7597 30.8159L29.8363 46.8924C30.3045 47.3607 30.3045 48.1237 29.8363 48.5746C29.6108 48.8001 29.316 48.9215 29.0038 48.9215Z"
                        fill="#AA99EC"
                    />
                </g>
                <defs>
                    <clipPath id="clip0_4755_703">
                        <rect width={256} height={256} fill="white" />
                    </clipPath>
                </defs>
            </svg>
            <h2 className="text-lg">Votre panier est vide</h2>
        </section>
    )
}
