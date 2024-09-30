import { useEffect, useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'
import { LoaderPinwheel, PlusCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { defaultValues, useCreateCategory, type CreateCategoryInput } from '@/api/categories/create-category'
import { getCategoriesQueryOptions, useCategories } from '@/api/categories/get-categories'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useItemStore } from '@/store/edit-item-store'
import { useQueryClient } from '@tanstack/react-query'
import formatAdminCategories from '@/utils/format-admin-categories'
import { useUpdateCategory } from '@/api/categories/update.category'

export default function CategoryDialogForm() {
    const [open, setOpen] = useState(false)
    const categoryItem = useItemStore((state) => state.item)
    const setCategoryItem = useItemStore((state) => state.setItem)
    const queryClient = useQueryClient()

    const [categoryEdit, setCategoryEdit] = useState<CreateCategoryInput>(defaultValues)

    const { data: categoriesData, status: categoriesStatus } = useCategories({})
    const createMutation = useCreateCategory({})
    const updateMutation = useUpdateCategory({})

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (categoryItem)
            updateMutation.mutate({
                categoryId: categoryItem.id,
                values: categoryEdit
            })
        else createMutation.mutate({ values: categoryEdit })
    }

    useEffect(() => {
        if (createMutation.isSuccess || updateMutation.isSuccess) {
            setOpen(false)
        }
    }, [createMutation.isSuccess, updateMutation.isSuccess])

    useEffect(() => {
        if (categoryItem) {
            setOpen(true)
            const categoryFound = formatAdminCategories(queryClient.getQueryData(getCategoriesQueryOptions().queryKey)!).find(
                (category) => category.id === categoryItem.id
            )!

            setCategoryEdit({
                name: categoryFound.name,
                isMainCategory: categoryFound.is_main_category,
                categoryId: categoryFound.category_id
            })
        }
    }, [categoryItem])

    return (
        <Dialog
            open={open}
            onOpenChange={(o) => {
                setOpen(o)
                if (!o) {
                    setCategoryItem(null)
                    setCategoryEdit(defaultValues)
                }
            }}
        >
            <DialogTrigger asChild>
                <Button size="sm" className="h-7 gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Ajouter Catégorie</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className="p-4">
                    <DialogTitle className="text-2xl font-heading font-bold text-center">
                        {categoryItem?.id ? 'Modifier la catégorie' : 'Ajouter une catégorie'}
                    </DialogTitle>
                    <DialogDescription className="text-center">Les informations ci-dessous sont nécessaires.</DialogDescription>
                </DialogHeader>
                <div className="p-4 pb-0">
                    <form onSubmit={onSubmit} className="grid gap-6 pb-4">
                        <div className="grid gap-2">
                            <Label>Nom</Label>
                            <Input
                                value={categoryEdit.name}
                                placeholder="Nom de la catégorie"
                                required
                                onChange={(e) =>
                                    setCategoryEdit((prev) => ({
                                        ...prev,
                                        name: e.target.value
                                    }))
                                }
                            />
                        </div>

                        <div className="flex items-center space-x-2">
                            <Switch
                                id="isMainCategory"
                                checked={!categoryEdit.isMainCategory}
                                onCheckedChange={(checked) => {
                                    setCategoryEdit((prev) => ({
                                        ...prev,
                                        isMainCategory: !checked
                                    }))
                                }}
                            />

                            <Label htmlFor="isMainCategory">Est une sous-catégorie</Label>
                        </div>

                        <div className="grid gap-2">
                            <Label>Parent</Label>
                            <Select
                                onValueChange={(value) => {
                                    setCategoryEdit((prev) => ({
                                        ...prev,
                                        categoryId: value
                                    }))
                                }}
                                value={categoryEdit.categoryId}
                            >
                                <SelectTrigger
                                    className="text-muted-foreground"
                                    disabled={categoriesStatus !== 'success' || categoryEdit.isMainCategory}
                                >
                                    <SelectValue placeholder="Sélectionner son parent" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categoriesStatus === 'success' &&
                                        categoriesData.map((category) => (
                                            <SelectItem className="capitalize" key={category.id} value={category.id}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                </SelectContent>
                            </Select>
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
