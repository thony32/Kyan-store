import type { Product } from '@/types/api'
import { LoaderPinwheel, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/store/auth-store'
import { useOrderStore } from '@/store/order-store'
import { useCreateUpdateOrder } from '@/api/order/create-update-order'

export default function AddToCartButton({ product }: { product: Product }) {
    const user = useAuthStore((state) => state.user)
    const order = useOrderStore((state) => state.order)
    if (!user) return null

    const createUpdateMutation = useCreateUpdateOrder({ userId: user.id })

    const handleAddToCart = () => {
        createUpdateMutation.mutate({
            values: {
                userId: user.id,
                orderItems: [
                    {
                        productId: product.id,
                        quantity: 1,
                        orderId: order?.id
                    }
                ]
            }
        })
    }

    return (
        <Button type="button" onClick={handleAddToCart} disabled={createUpdateMutation.isPending}>
            {createUpdateMutation.isPending && <LoaderPinwheel className="size-4 animate-spin mr-2" />}
            Ajouter au panier <ShoppingBag className="size-4 ml-2" />
        </Button>
    )
}
