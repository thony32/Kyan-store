import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useEffect, useState } from 'react'

import { defaultValues, useCreateDiscount, type CreateDiscountInput } from '@/api/discount/create-discount'
import { getDiscountsQueryOptions, useDiscounts } from '@/api/discount/get-discounts'
import { useUpdateDiscount } from '@/api/discount/update-discount'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { useItemStore } from '@/store/edit-item-store'
import type { Discount } from '@/types/api'
import { useQueryClient } from '@tanstack/react-query'
import { LoaderPinwheel, PlusCircle } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'

export default function DiscountDialogForm() {
    const [open, setOpen] = useState(false)
    const discountItem = useItemStore((state) => state.item)
    const setDiscountItem = useItemStore((state) => state.setItem)
    const queryClient = useQueryClient()

    const [discountEdit, setDiscountEdit] = useState<CreateDiscountInput>(defaultValues)

    const createMutation = useCreateDiscount({})
    const updateMutation = useUpdateDiscount({})

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (discountItem)
            updateMutation.mutate({
                discountId: discountItem.id,
                values: discountEdit
            })
        else createMutation.mutate({ values: discountEdit })
    }

    useEffect(() => {
        if (createMutation.isSuccess || updateMutation.isSuccess) {
            setOpen(false)
        }
    }, [createMutation.isSuccess, updateMutation.isSuccess])

    useEffect(() => {
        if (discountItem) {
            setOpen(true)
            const discountFound = queryClient
                .getQueryData<Discount[]>(getDiscountsQueryOptions().queryKey)!
                .find((discount) => discount.id === discountItem.id)!

            setDiscountEdit({
                percentage: discountFound.percentage,
                validUntil: discountFound.valid_until
            })
        }
    }, [discountItem])

    return (
        <Dialog
            open={open}
            onOpenChange={(o) => {
                setOpen(o)
                if (!o) {
                    setDiscountItem(null)
                    setDiscountEdit(defaultValues)
                }
            }}
        >
            <DialogTrigger asChild>
                <Button size="sm" className="h-7 gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Ajouter Promotion</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className="p-4">
                    <DialogTitle className="text-2xl font-heading font-bold text-center">
                        {discountItem?.id ? 'Modifier la catégorie' : 'Ajouter une catégorie'}
                    </DialogTitle>
                    <DialogDescription className="text-center">Les informations ci-dessous sont nécessaires.</DialogDescription>
                </DialogHeader>
                <div className="p-4 pb-0">
                    <form onSubmit={onSubmit} className="grid gap-6 pb-4">
                        <div className="grid gap-2">
                            <Label>Pourcentage</Label>
                            <Input
                                value={discountEdit.percentage}
                                type="number"
                                required
                                step={0.1}
                                onChange={(e) =>
                                    setDiscountEdit((prev) => ({
                                        ...prev,
                                        percentage: Number.parseFloat(e.target.value)
                                    }))
                                }
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label>Parent</Label>
                            <div className="flex justify-center">
                                <Calendar
                                    mode="single"
                                    selected={new Date(discountEdit.validUntil)}
                                    onSelect={(day) => {
                                        setDiscountEdit((prev) => ({
                                            ...prev,
                                            validUntil: day ? day.toISOString() : new Date('2025-01-01').toISOString()
                                        }))
                                    }}
                                    className="rounded-md border shadow"
                                />
                            </div>
                        </div>
                        <div className="flex gap-2 pb-2">
                            <DialogClose asChild>
                                <Button variant="outline" size={'lg'} className="w-full font-bold">
                                    Annuler
                                </Button>
                            </DialogClose>
                            <Button type="submit" size={'lg'} className="w-full font-bold">
                                {(createMutation.isPending || updateMutation.isPending) && <LoaderPinwheel className="animate-spin mr-2 size-4" />}
                                Enregristrer
                            </Button>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}
