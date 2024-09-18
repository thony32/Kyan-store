import type React from 'react'
import { useState, useCallback } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Label } from '@/components/ui/label'
import { AutosizeTextarea } from '@/components/ui/autosize-textarea'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Star from '@/components/misc/star'

export default function RatingForm() {
    const [rating, setRating] = useState<number | null>(null)
    const [description, setDescription] = useState<string>('')

    const handleRatingChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setRating(Number.parseInt(event.target.value, 10))
    }, [])

    const handleDescriptionChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value)
    }, [])

    const handleSubmit = useCallback(
        (event: React.FormEvent) => {
            event.preventDefault()
            console.log('Rating:', rating)
            console.log('Description:', description)

            setRating(null)
            setDescription('')
        },
        [rating, description]
    )

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                    <Plus className="size-3 mr-2" /> Donner
                </Button>
            </PopoverTrigger>
            <PopoverContent align="end">
                <div className="grid gap-4">
                    <h4 className="font-medium leading-none">Donner un avis</h4>
                    <form className="grid gap-4" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="star">Note</Label>
                            <div className="flex flex-row-reverse col-span-2 justify-center rating-stars">
                                <input type="radio" id="rating-5" name="rating" value="5" />
                                <label htmlFor="rating-5">
                                    <Star className="size-5" />
                                </label>
                                <input type="radio" id="rating-4" name="rating" value="4" />
                                <label htmlFor="rating-4">
                                    <Star className="size-5" />
                                </label>
                                <input type="radio" id="rating-3" name="rating" value="3" />
                                <label htmlFor="rating-3">
                                    <Star className="size-5" />
                                </label>
                                <input type="radio" id="rating-2" name="rating" value="2" />
                                <label htmlFor="rating-2">
                                    <Star className="size-5" />
                                </label>
                                <input type="radio" id="rating-1" name="rating" value="1" />
                                <label htmlFor="rating-1">
                                    <Star className="size-5" />
                                </label>
                                <input type="radio" id="rating-0" name="rating" value="0" />
                                <label htmlFor="rating-0">0</label>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 items-start gap-4">
                            <Label htmlFor="description">Description</Label>
                            <AutosizeTextarea
                                name="description"
                                id="description"
                                value={description}
                                onChange={handleDescriptionChange}
                                className="col-span-2 bg-transparent"
                            />
                        </div>
                        <Button type="submit" variant="default">
                            Envoyer
                        </Button>
                    </form>
                </div>
            </PopoverContent>
        </Popover>
    )
}
