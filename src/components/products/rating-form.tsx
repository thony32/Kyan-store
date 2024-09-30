import type React from 'react'
import { useState, useCallback } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Label } from '@/components/ui/label'
import { AutosizeTextarea } from '@/components/ui/autosize-textarea'
import { Button } from '@/components/ui/button'
import { LoaderPinwheel, Plus } from 'lucide-react'
import Star from '@/components/misc/star'
import { useAuthStore } from '@/store/auth-store'
import { useViewItemStore } from '@/store/view-item-store'
import { useRateProduct } from '@/api/products/rate-product'

export default function RatingForm() {
    const user = useAuthStore((state) => state.user)
    if (!user) return null
    const { id: productId } = useViewItemStore((state) => state.item!)
    const [star, setStar] = useState<number | null>(null)
    const [comment, setComment] = useState<string>('')
    const rateMutation = useRateProduct({ productId })

    const handleStarChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setStar(Number.parseInt(event.target.value, 10))
    }, [])

    const handleCommentChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(event.target.value)
    }, [])

    const handleSubmit = useCallback(
        (event: React.FormEvent) => {
            event.preventDefault()
            rateMutation.mutate({
                values: {
                    star: star || 0,
                    comment,
                    userId: user.id,
                    productId: productId
                }
            })
            setStar(null)
            setComment('')
        },
        [star, comment]
    )

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                    <Plus className="size-3 mr-2" /> Donner
                </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="min-w-80">
                <div className="grid gap-4">
                    <h4 className="font-medium leading-none">Donner un avis</h4>
                    <form className="grid gap-4" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="star">Note</Label>
                            <div className="flex flex-row-reverse col-span-2 justify-center rating-stars">
                                <input type="radio" id="rating-5" name="rating" value="5" onChange={handleStarChange} checked={star === 5} />
                                <label htmlFor="rating-5">
                                    <Star className="size-5" />
                                </label>
                                <input type="radio" id="rating-4" name="rating" value="4" onChange={handleStarChange} checked={star === 4} />
                                <label htmlFor="rating-4">
                                    <Star className="size-5" />
                                </label>
                                <input type="radio" id="rating-3" name="rating" value="3" onChange={handleStarChange} checked={star === 3} />
                                <label htmlFor="rating-3">
                                    <Star className="size-5" />
                                </label>
                                <input type="radio" id="rating-2" name="rating" value="2" onChange={handleStarChange} checked={star === 2} />
                                <label htmlFor="rating-2">
                                    <Star className="size-5" />
                                </label>
                                <input type="radio" id="rating-1" name="rating" value="1" onChange={handleStarChange} checked={star === 1} />
                                <label htmlFor="rating-1">
                                    <Star className="size-5" />
                                </label>
                                <input
                                    type="radio"
                                    id="rating-0"
                                    name="rating"
                                    value="0"
                                    onChange={handleStarChange}
                                    checked={star === 0 || star === null}
                                />
                                <label htmlFor="rating-0">0</label>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 items-start gap-4">
                            <Label htmlFor="comment">Commentaire</Label>
                            <AutosizeTextarea
                                name="comment"
                                id="comment"
                                value={comment}
                                onChange={handleCommentChange}
                                className="col-span-2 bg-transparent"
                            />
                        </div>
                        <Button type="submit" variant="default" disabled={rateMutation.isPending}>
                            {rateMutation.isPending && <LoaderPinwheel className="size-4 animate-spin mr-2" />}
                            Envoyer
                        </Button>
                    </form>
                </div>
            </PopoverContent>
        </Popover>
    )
}
