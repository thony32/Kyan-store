import { useEffect, useState } from 'react'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'

import { Button } from '@/components/ui/button'
import { LoaderPinwheel, PlusCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { defaultValues, useCreateProduct, type CreateProductInput } from '@/api/products/create-product'
import { useCategories } from '@/api/categories/get-categories'
import { useUpdateProduct } from '@/api/products/update-product'
import type { Product } from '@/types/api'
import { useItemStore } from '@/store/edit-item-store'
import { useQueryClient } from '@tanstack/react-query'
import { getProductsQueryOptions } from '@/api/products/get-products'
import { Label } from '@/components/ui/label'

export default function ProductForm() {
    const [open, setOpen] = useState(false)
    const productItem = useItemStore((state) => state.item)
    const setProductItem = useItemStore((state) => state.setItem)
    const queryClient = useQueryClient()

    const [productEdit, setProductEdit] = useState<CreateProductInput>(defaultValues)

    const { data: categoriesData, status: categoriesStatus } = useCategories({})
    const createMutation = useCreateProduct({})
    const updateMutation = useUpdateProduct({})

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (productItem)
            updateMutation.mutate({
                productId: productItem.id,
                values: productEdit
            })
        else createMutation.mutate({ values: productEdit })
    }

    useEffect(() => {
        if (createMutation.isSuccess || updateMutation.isSuccess) {
            setOpen(false)
        }
    }, [createMutation.isSuccess, updateMutation.isSuccess])

    useEffect(() => {
        if (productItem) {
            setOpen(true)
            const productFound = queryClient
                .getQueryData<Product[]>(getProductsQueryOptions().queryKey)!
                .find((product) => product.id === productItem.id)!

            setProductEdit({
                name: productFound.name,
                description: productFound.description,
                imageUrl: productFound.image_url || '',
                stockQuantity: productFound.quantity,
                price: productFound.price,
                brand: productFound.brand,
                model: productFound.model,
                categoryId: productFound.category_id,
                subCategoryId: productFound.subcategory_id || '',
                discountId: productFound.discount_id || '',
                isAvailable: productFound.is_available
            })
        }
    }, [productItem])

    return (
        <Drawer
            open={open}
            onOpenChange={(o) => {
                setOpen(o)
                if (!o) {
                    setProductItem(null)
                    setProductEdit(defaultValues)
                }
            }}
        >
            <DrawerTrigger asChild>
                <Button size="sm" className="h-7 gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Ajouter Produit</span>
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto max-w-screen-lg w-full max-h-[calc(100vh_-_2rem)] overflow-y-auto">
                    <DrawerHeader className="sticky h-fit top-0 bg-background p-4 z-20">
                        <DrawerTitle className="text-2xl font-heading font-bold text-center">
                            {productItem?.id ? 'Modifier le produit' : 'Ajouter un produit'}
                        </DrawerTitle>
                        <DrawerDescription className="text-center">Les informations ci-dessous sont nécessaires.</DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 pb-0">
                        <form onSubmit={onSubmit} className="grid md:grid-cols-2 gap-8 pb-4">
                            <div className="space-y-4">
                                <div className="grid gap-2">
                                    <Label>Nom</Label>
                                    <Input
                                        placeholder="Nom du produit"
                                        required
                                        value={productEdit.name}
                                        onChange={(e) =>
                                            setProductEdit((prev) => ({
                                                ...prev,
                                                name: e.target.value
                                            }))
                                        }
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label>Description</Label>
                                    <Textarea
                                        placeholder="Description du produit"
                                        className="resize-none"
                                        value={productEdit.description}
                                        onChange={(e) =>
                                            setProductEdit((prev) => ({
                                                ...prev,
                                                description: e.target.value
                                            }))
                                        }
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label>Lien image</Label>
                                    <Input
                                        placeholder="https://example.com/produit.png"
                                        required
                                        value={productEdit.imageUrl}
                                        onChange={(e) =>
                                            setProductEdit((prev) => ({
                                                ...prev,
                                                imageUrl: e.target.value
                                            }))
                                        }
                                    />
                                </div>

                                <div className="flex items-baseline gap-6">
                                    <div className="grid gap-2">
                                        <Label>En stock</Label>
                                        <Input
                                            placeholder="Nbr de produit en stock"
                                            required
                                            value={productEdit.stockQuantity}
                                            type="number"
                                            onChange={(e) =>
                                                setProductEdit((prev) => ({
                                                    ...prev,
                                                    stockQuantity: Number.parseInt(e.target.value)
                                                }))
                                            }
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Prix unitaire</Label>
                                        <Input
                                            placeholder="prix en dollar"
                                            required
                                            value={productEdit.price}
                                            type="number"
                                            onChange={(e) =>
                                                setProductEdit((prev) => ({
                                                    ...prev,
                                                    price: Number.parseInt(e.target.value)
                                                }))
                                            }
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid space-y-4">
                                <div className="flex items-baseline gap-6">
                                    <div className="grid gap-2">
                                        <Label>Marque</Label>
                                        <Input
                                            placeholder="Marque du produit"
                                            required
                                            value={productEdit.brand}
                                            onChange={(e) =>
                                                setProductEdit((prev) => ({
                                                    ...prev,
                                                    brand: e.target.value
                                                }))
                                            }
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label>Modèle</Label>
                                        <Input
                                            placeholder="Modèle du produit"
                                            required
                                            value={productEdit.model}
                                            onChange={(e) =>
                                                setProductEdit((prev) => ({
                                                    ...prev,
                                                    model: e.target.value
                                                }))
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="grid gap-2">
                                    <Label>Catégorie</Label>
                                    <Select
                                        onValueChange={(value) => {
                                            setProductEdit((prev) => ({
                                                ...prev,
                                                categoryId: value
                                            }))
                                        }}
                                        value={productEdit.categoryId}
                                    >
                                        <SelectTrigger className="text-muted-foreground" disabled={categoriesStatus !== 'success'}>
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

                                <div className="grid gap-2">
                                    <Label>Sous catégorie</Label>
                                    <Select
                                        onValueChange={(value) => {
                                            setProductEdit((prev) => ({
                                                ...prev,
                                                subCategoryId: value
                                            }))
                                        }}
                                        value={productEdit.subCategoryId}
                                    >
                                        <SelectTrigger
                                            className="text-muted-foreground"
                                            disabled={categoriesStatus !== 'success' || !productEdit.categoryId}
                                        >
                                            <SelectValue placeholder="Sélectionner son parent" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categoriesStatus === 'success' &&
                                                categoriesData
                                                    .find((category) => category.id === productEdit.categoryId)
                                                    ?.subcategories.map((subcategory) => (
                                                        <SelectItem className="capitalize" key={subcategory.id} value={subcategory.id}>
                                                            {subcategory.name}
                                                        </SelectItem>
                                                    ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="grid gap-2">
                                    <Label>Promotion</Label>
                                    <Select
                                        onValueChange={(value) => {
                                            setProductEdit((prev) => ({
                                                ...prev,
                                                discountId: value
                                            }))
                                        }}
                                        value={productEdit.discountId}
                                    >
                                        <SelectTrigger
                                            className="text-muted-foreground"
                                            // disabled={discountsStatus !== "success"}
                                        >
                                            <SelectValue placeholder="Sélectionner son parent" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem className="capitalize" value="Tsisy lty a">
                                                Tsisy lty a
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2 pb-2">
                                    <Button type="submit" size={'lg'} className="w-full font-bold">
                                        {(createMutation.isPending || updateMutation.isPending) && (
                                            <LoaderPinwheel className="animate-spin mr-2 size-4" />
                                        )}
                                        Enregristrer
                                    </Button>
                                    <DrawerClose asChild>
                                        <Button variant="outline" size={'lg'} className="w-full font-bold">
                                            Annuler
                                        </Button>
                                    </DrawerClose>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    )
}
