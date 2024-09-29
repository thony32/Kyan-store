import { createLazyFileRoute } from '@tanstack/react-router'
import { AlertCircleIcon, ChevronLeft, ChevronRight, File, ListFilter, LoaderPinwheel, MoreHorizontal, Pencil, Trash2 } from 'lucide-react'

import { useDeleteProduct } from '@/api/products/delete-product'
import { useProducts } from '@/api/products/get-products'
import ProductForm from '@/components/back-office/product/product-form'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import type { Product } from '@/types/api'
import getDiscountAmount from '@/utils/get-discount-amount'
import { useState } from 'react'
import { usePagination } from 'react-use-pagination'

const AdminProduct = () => {
    const { data, status, error } = useProducts({})
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState<boolean | null>(null)
    const [productEdit, setProductEdit] = useState<Product | undefined>(undefined)
    const { currentPage, totalPages, setNextPage, setPreviousPage, nextEnabled, previousEnabled, startIndex, endIndex } = usePagination({
        totalItems: status !== 'success' && !data ? 0 : data.length + 1,
        initialPageSize: 10
    })
    const deleteMutation = useDeleteProduct({})

    return (
        <div className="grid gap-4">
            <div className="flex items-center gap-2">
                <div className="w-full">
                    <Input
                        type="search"
                        value={search}
                        className="max-w-xs"
                        placeholder="Rechercher un produit..."
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="h-7 gap-1">
                            <ListFilter className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Filtre</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Filtrer par</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem checked={filter === null} onClick={() => setFilter(null)}>
                            Tous
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem checked={!!filter} onClick={() => setFilter(true)}>
                            Disponible
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem checked={filter === false} onClick={() => setFilter(false)}>
                            Indisponible
                        </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Button size="sm" variant="outline" className="h-7 gap-1">
                    <File className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Exporter</span>
                </Button>
                <ProductForm productEdit={productEdit} setProductEdit={setProductEdit} />
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Liste produits</CardTitle>
                    <CardDescription>Gérer vos produits et leurs informations</CardDescription>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[70vh]">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="hidden w-[100px] sm:table-cell">
                                        <span className="sr-only">Image</span>
                                    </TableHead>
                                    <TableHead>Nom</TableHead>
                                    <TableHead>Statut</TableHead>
                                    <TableHead>Prix</TableHead>
                                    <TableHead className="hidden md:table-cell">Stock</TableHead>
                                    <TableHead className="hidden md:table-cell">Promotion</TableHead>
                                    <TableHead>
                                        <span className="sr-only">Actions</span>
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {status === 'error' ? null : status === 'pending' ? (
                                    <>
                                        <ProductRowSkeleton />
                                        <ProductRowSkeleton />
                                        <ProductRowSkeleton />
                                        <ProductRowSkeleton />
                                        <ProductRowSkeleton />
                                    </>
                                ) : (
                                    <>
                                        {data
                                            .filter((product) =>
                                                search
                                                    ? product.name.toLowerCase().includes(search.toLowerCase()) ||
                                                      product.description.toLowerCase().includes(search.toLowerCase()) ||
                                                      product.brand.toLowerCase().includes(search.toLowerCase())
                                                    : true
                                            )
                                            .filter((product) => (filter === null ? true : product.is_available === filter))
                                            .slice(startIndex, endIndex)
                                            .map((product) => (
                                                <TableRow key={product.id}>
                                                    <TableCell className="hidden sm:table-cell">
                                                        {product.image_url ? (
                                                            <img
                                                                alt={product.name}
                                                                className="aspect-square rounded-md object-cover"
                                                                height="64"
                                                                src={product.image_url}
                                                                width="64"
                                                            />
                                                        ) : (
                                                            <div className="aspect-square bg-gray-50 rounded-md size-16" />
                                                        )}
                                                    </TableCell>
                                                    <TableCell className="font-medium max-w-xs truncate">{product.name}</TableCell>
                                                    <TableCell>
                                                        <Badge variant="outline">{product.is_available ? 'Disponible' : 'Indisponible'}</Badge>
                                                    </TableCell>
                                                    <TableCell>${product.price}</TableCell>
                                                    <TableCell className="hidden md:table-cell">{product.quantity}</TableCell>
                                                    <TableCell className="hidden md:table-cell">-{getDiscountAmount(product)}%</TableCell>
                                                    <TableCell>
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                                                    <MoreHorizontal className="h-4 w-4" />
                                                                    <span className="sr-only">Toggle menu</span>
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                                <DropdownMenuItem onClick={() => setProductEdit(product)}>
                                                                    <Pencil className="size-4 mr-3" /> Modifier
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem
                                                                    onClick={() =>
                                                                        deleteMutation.mutate({
                                                                            productId: product.id
                                                                        })
                                                                    }
                                                                    disabled={deleteMutation.isPending}
                                                                >
                                                                    {deleteMutation.isPending ? (
                                                                        <LoaderPinwheel className="animate-spin size-4 mr-3" />
                                                                    ) : (
                                                                        <Trash2 className="size-4 mr-3" />
                                                                    )}{' '}
                                                                    Supprimer
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        <TableRow>
                                            <TableCell colSpan={7}>
                                                <div className="flex justify-between items-center">
                                                    <div className="text-xs text-muted-foreground">
                                                        Page{' '}
                                                        <strong>
                                                            {currentPage + 1}-{totalPages}
                                                        </strong>{' '}
                                                        de <strong>{data?.length}</strong> produits
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <Button
                                                            size="icon"
                                                            variant="outline"
                                                            onClick={() => setPreviousPage()}
                                                            disabled={!previousEnabled}
                                                        >
                                                            <ChevronLeft />
                                                        </Button>
                                                        <Button size="icon" variant="outline" onClick={() => setNextPage()} disabled={!nextEnabled}>
                                                            <ChevronRight />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    </>
                                )}
                            </TableBody>
                        </Table>
                    </ScrollArea>
                    {status === 'error' && (
                        <Alert variant="destructive">
                            <AlertCircleIcon className="h-4 w-4" />
                            <AlertTitle>Erreur</AlertTitle>
                            <AlertDescription>{error.message}</AlertDescription>
                        </Alert>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

const ProductRowSkeleton = () => (
    <TableRow>
        <TableCell className="hidden sm:table-cell">
            <Skeleton className="aspect-square rounded-md size-16" />
        </TableCell>
        <TableCell className="font-medium">
            <Skeleton className="w-56 h-4" />
        </TableCell>
        <TableCell>
            <Skeleton className="w-20 h-4" />
        </TableCell>
        <TableCell>
            <Skeleton className="w-16 h-4" />
        </TableCell>
        <TableCell className="hidden md:table-cell">
            <Skeleton className="w-10 h-4" />
        </TableCell>
        <TableCell className="hidden md:table-cell">
            <Skeleton className="w-10 h-4" />
        </TableCell>
        <TableCell>
            <Skeleton className="w-4 h-4" />
        </TableCell>
    </TableRow>
)

export const Route = createLazyFileRoute('/admin/product')({
    component: AdminProduct
})
