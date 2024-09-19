import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle } from '@/components/ui/dialog'
import { useViewItemStore } from '@/store/view-item-store'
import ThumbnailSlider from './thumbnail-slider'
import getDiscountAmount from '@/utils/get-discount-amount'
import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import { ShoppingBag } from 'lucide-react'
import { Link, useMatch } from '@tanstack/react-router'
import { cn } from '@/utils/cn'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import Star from '../misc/star'
import RatingsCount from './ratings-count'
import RatingForm from './rating-form'
import { useCartStore } from '@/store/cart-store'

export default function ViewItemDialog() {
    const openItem = useViewItemStore((state) => state.open)
    const itemToView = useViewItemStore((state) => state.item)
    const setOpenItem = useViewItemStore((state) => state.setOpen)
    const cartItems = useCartStore((state) => state.items)
    const addToCart = useCartStore((state) => state.addItem)
    const match = useMatch({ from: '/_public/cart', shouldThrow: false })

    return (
        <Dialog open={openItem} onOpenChange={setOpenItem}>
            <DialogContent
                className="sm:rounded-3xl w-[calc(100vw-1rem)] max-w-screen-xl"
                overlayClassName="bg-black/20 backdrop-blur-sm"
                closeClassName="bg-accent opacity-100 p-1 rounded-full"
            >
                <DialogTitle className="sr-only" />
                <DialogDescription className="sr-only" />
                {itemToView ? (
                    <div className="flex gap-6 items-center">
                        <ThumbnailSlider images={itemToView.images} />
                        <div className="flex flex-col gap-5 p-5 w-full" style={{ opacity: 1, transform: 'none' }}>
                            <h2 className="text-xl font-semibold line-clamp-3">{itemToView.name}</h2>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <div>
                                        <span className="text-lg line-through pr-2 text-zinc-400">{itemToView.price}</span>
                                        <span className="text-3xl font-medium">
                                            <span className="text-green-500">$</span>
                                            {itemToView.price - getDiscountAmount(itemToView)}
                                        </span>
                                    </div>
                                    <Badge className="bg-destructive h-fit px-1 rounded-sm shadow-none pointer-events-none">
                                        -{itemToView.discount.percentage * 10}%
                                    </Badge>
                                </div>
                                <RatingsCount ratings={itemToView.ratings} />
                            </div>
                            <div className="text-sm">
                                <div className="flex gap-5">
                                    <div>
                                        <h3 className="font-semibold">Brand:</h3>
                                        <h3 className="font-semibold">Model:</h3>
                                    </div>
                                    <div className="flex flex-col uppercase">
                                        <span>{itemToView.brand}</span>
                                        <span>{itemToView.model}</span>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1">About this product:</h3>
                                    <details className="group">
                                        <summary className="inline outline-none">
                                            <div className="max-h-[16ch] overflow-y-auto">
                                                <p className="line-clamp-5 group-open:line-clamp-none">{itemToView.description}</p>
                                            </div>
                                            <span className="cursor-pointer text-blue-500 underline underline-offset-2">
                                                Lire <span className="group-open:hidden">plus</span>
                                                <span className="hidden group-open:inline">moins</span>
                                            </span>
                                        </summary>
                                    </details>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between items-center">
                                    <h4 className="font-semibold">Avis</h4>
                                    <RatingForm />
                                </div>
                                <hr />
                                <div className="grid gap-y-1 max-h-[15ch] overflow-y-auto">
                                    {itemToView.ratings.map((rating) => (
                                        <div key={rating.id} className="flex items-start gap-2">
                                            <Avatar className="size-6">
                                                <AvatarFallback className="bg-violet-950 text-sm text-primary-foreground">
                                                    {rating.user.lastname[0]}
                                                    {rating.user.firstname[0]}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="flex gap-6 items-center">
                                                    <p className="font-medium text-xs">
                                                        {rating.user.lastname} {rating.user.firstname}
                                                    </p>
                                                    <div className="flex items-center gap-1">
                                                        <Star className="text-yellow-400" />
                                                        <span className="text-xs font-light">{rating.star}</span>
                                                    </div>
                                                </div>
                                                <p className="text-xs font-light">{rating.comment}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Fermer
                        </Button>
                    </DialogClose>
                    {!cartItems.find((item) => item.id === itemToView?.id) ? (
                        <Button type="button" onClick={() => addToCart(itemToView!)}>
                            Ajouter au panier <ShoppingBag className="size-4 ml-2" />
                        </Button>
                    ) : match ? null : (
                        <Link to="/cart" className={cn(buttonVariants({ variant: 'outline' }))} onClick={() => setOpenItem(false)}>
                            Voir le panier <ShoppingBag className="size-4 ml-2" />
                        </Link>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
