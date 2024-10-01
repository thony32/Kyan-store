import type { Product } from '@/types/api'
import { LoaderPinwheel, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/store/auth-store'
import { useCreateOrder } from '@/api/order/create-order'
import { useUpdateOrder } from '@/api/order/update-order'
import { useCreateOrderItem } from '@/api/order/create-orderitem'
import { useOrderStore } from '@/store/order-store'

export default function AddToCartButton({ product }: { product: Product }) {
    const user = useAuthStore((state) => state.user)
    const order = useOrderStore((state) => state.order)
    if (!user) return null

    const createOrderMutation = useCreateOrder({})
    const updateOrderMutation = useUpdateOrder({})
    const createOrderItemMutation = useCreateOrderItem({ userId: user.id })
    const handleAddToCart = () => {
        if (order) {
            // const values = {
            //   userId: user.id,
            //   orderItems: [{ orderId: order.id, productId: product.id, quantity: 1 }],
            // };
            // updateOrderMutation.mutate({
            //   values,
            //   orderId: order.id,
            // });
            createOrderItemMutation.mutate({
                values: { orderId: order.id, productId: product.id, quantity: 1 }
            })
        } else {
            createOrderMutation.mutate(
                { userId: user.id },
                {
                    onSuccess: (data) => {
                        createOrderItemMutation.mutate({
                            values: { orderId: data.id, productId: product.id, quantity: 1 }
                        })
                    }
                }
            )
        }
    }

    return (
        <Button
            type="button"
            onClick={handleAddToCart}
            disabled={createOrderMutation.isPending || createOrderItemMutation.isPending || updateOrderMutation.isPending}
        >
            {(createOrderMutation.isPending || createOrderItemMutation.isPending || updateOrderMutation.isPending) && (
                <LoaderPinwheel className="size-4 animate-spin mr-2" />
            )}
            Ajouter au panier <ShoppingBag className="size-4 ml-2" />
        </Button>
    )
}
