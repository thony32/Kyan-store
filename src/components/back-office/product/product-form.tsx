import { type Dispatch, useEffect, useState } from 'react'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'

import { Button } from '@/components/ui/button'
import { LoaderPinwheel, PlusCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { createProductInputSchema, useCreateProduct, type CreateProductInput } from '@/api/products/create-product'
import { useCategories } from '@/api/categories/get-categories'
import { toast } from 'sonner'
import { useUpdateProduct } from '@/api/products/update-product'
import type { Product } from '@/types/api'

export default function ProductForm({
    productEdit,
    setProductEdit
}: {
    productEdit?: Product
    setProductEdit: Dispatch<React.SetStateAction<Product | undefined>>
}) {
    const [open, setOpen] = useState(false)

    // STRUGGLE WITH THE DEFAULT VALUES PART

    const form = useForm<CreateProductInput>({
        resolver: zodResolver(createProductInputSchema),
        defaultValues: {
            name: productEdit?.name,
            description: productEdit?.description || '',
            imageUrl: '',
            stockQuantity: 0,
            price: 0,
            brand: '',
            model: '',
            categoryId: '',
            isAvailable: true,
            subCategoryId: '',
            discountId: ''
        }
    })
    const { data: categoriesData, status: categoriesStatus } = useCategories({})
    const createMutation = useCreateProduct({})
    const updateMutation = useUpdateProduct({})

    function onSubmit(values: CreateProductInput) {
        if (productEdit) updateMutation.mutate({ productId: productEdit.id, values })
        createMutation.mutate({ values })
    }

    useEffect(() => {
        if (productEdit) {
            setOpen(true)
        }
    }, [productEdit])

    useEffect(() => {
        if (!open) {
            form.reset()
        }
    }, [open, form])

    useEffect(() => {
        if (createMutation.isSuccess) {
            setOpen(false)
            toast.success('Produit ajouté avec succès')
        }
    }, [createMutation.isSuccess])

    return (
        <Drawer
            open={open}
            onOpenChange={(o) => {
                setOpen(o)
                if (!o) setProductEdit(undefined)
            }}
        >
            <DrawerTrigger asChild>
                <Button size="sm" className="h-7 gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Ajouter Produit</span>
                </Button>
            </DrawerTrigger>
            <DrawerContent className="w-screen max-w-screen-lg">
                <div className="mx-auto max-w-screen-lg w-full max-h-[calc(100vh_-_2rem)] overflow-y-auto">
                    <DrawerHeader className="sticky h-fit top-0 bg-background p-4 z-20">
                        <DrawerTitle className="text-2xl font-heading font-bold text-center">
                            {productEdit?.id ? 'Modifier le produit' : 'Ajouter un produit'}
                        </DrawerTitle>
                        <DrawerDescription className="text-center">Les informations ci-dessous sont nécessaires.</DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 pb-0">
                        <Form {...form}>
                            <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-8 pb-4">
                                <div className="space-y-5">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Nom</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Nom du produit" required {...field} />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Description</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder="Description du produit" className="resize-none" {...field} />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="imageUrl"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Lien image</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="https://example.com/produit.png" required {...field} />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="flex items-baseline gap-6">
                                        <FormField
                                            control={form.control}
                                            name="stockQuantity"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>En stock</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Nbr de produit en stock" required type="number" {...field} />
                                                    </FormControl>

                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="price"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Prix unitaire</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="prix en dollar" required type="number" {...field} />
                                                    </FormControl>

                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>

                                <div className="grid space-y-4">
                                    <div className="flex items-baseline gap-6">
                                        <FormField
                                            control={form.control}
                                            name="brand"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Marque</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Marque du produit" required {...field} />
                                                    </FormControl>

                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="model"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Modèle</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Modèle du produit" required {...field} />
                                                    </FormControl>

                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <FormField
                                        control={form.control}
                                        name="categoryId"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Categorie</FormLabel>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                    disabled={categoriesStatus !== 'success'}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className="text-muted-foreground">
                                                            <SelectValue placeholder="Sélectionner une catégorie" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {categoriesStatus === 'success' &&
                                                            categoriesData.map((category) => (
                                                                <SelectItem className="capitalize" key={category.id} value={category.id}>
                                                                    {category.name}
                                                                </SelectItem>
                                                            ))}
                                                    </SelectContent>
                                                </Select>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="subCategoryId"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Sous-catégorie (optionel)</FormLabel>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                    disabled={categoriesStatus !== 'success' && !form.getValues('categoryId')}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className="text-muted-foreground">
                                                            <SelectValue placeholder="Sélectionner une sous-catégorie" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {categoriesStatus === 'success' &&
                                                            categoriesData
                                                                .filter((category) => category.id === form.getValues('categoryId'))[0]
                                                                ?.subcategories.map((subcategory) => (
                                                                    <SelectItem className="capitalize" key={subcategory.id} value={subcategory.id}>
                                                                        {subcategory.name}
                                                                    </SelectItem>
                                                                ))}
                                                    </SelectContent>
                                                </Select>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="discountId"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Promotion (optionel)</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="text-muted-foreground">
                                                            <SelectValue placeholder="Sélectionner une promotion" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="m@example.com">m@example.com</SelectItem>
                                                        <SelectItem value="m@google.com">m@google.com</SelectItem>
                                                        <SelectItem value="m@support.com">m@support.com</SelectItem>
                                                    </SelectContent>
                                                </Select>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="grid gap-2 pb-2">
                                        <Button type="submit" size={'lg'} className="w-full font-bold">
                                            {createMutation.isPending && <LoaderPinwheel className="animate-spin mr-2 size-4" />}
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
                        </Form>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    )
}
