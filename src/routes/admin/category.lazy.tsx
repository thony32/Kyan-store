import { useCategories } from '@/api/categories/get-categories'
import CategoryDialogForm from '@/components/back-office/category/category-form'
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
import { useItemStore } from '@/store/edit-item-store'
import formatAdminCategories, { type FormatedCategory } from '@/utils/format-admin-categories'
import { createLazyFileRoute } from '@tanstack/react-router'
import { AlertCircleIcon, ChevronLeft, ChevronRight, File, ListFilter, MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import { useCallback, useState } from 'react'
import { usePagination } from 'react-use-pagination'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { useDeleteCategory } from '@/api/categories/delete-category'

const AdminCategory = () => {
    const { data, status, error } = useCategories({})
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState<boolean | null>(null)
    const setCategoryItem = useItemStore((state) => state.setItem)

    const getFilteredCategories = useCallback(() => {
        if (status !== 'success' && !data) return []

        return formatAdminCategories(data)
            .filter((category) =>
                search
                    ? category.name.toLowerCase().includes(search.toLowerCase()) || category.parent_name?.toLowerCase().includes(search.toLowerCase())
                    : true
            )
            .filter((category) => (filter === null ? true : category.is_main_category === filter))
    }, [data, search, filter, status])

    const { currentPage, totalPages, setNextPage, setPreviousPage, nextEnabled, previousEnabled, startIndex, endIndex } = usePagination({
        totalItems: getFilteredCategories().length ? getFilteredCategories().length + 1 : 0,
        initialPageSize: 10
    })
    const [itemToDelete, setItemToDelete] = useState<FormatedCategory | null>(null)
    const deleteMutation = useDeleteCategory({})

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
                            Toutes
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem checked={!!filter} onClick={() => setFilter(true)}>
                            Principales
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem checked={filter === false} onClick={() => setFilter(false)}>
                            Sous-catégories
                        </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Button size="sm" variant="outline" className="h-7 gap-1">
                    <File className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Exporter</span>
                </Button>
                <CategoryDialogForm />
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Liste catégories</CardTitle>
                    <CardDescription>Gérer vos catégories et leurs informations</CardDescription>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[70vh]">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-56">Nom</TableHead>
                                    <TableHead className="hidden md:table-cell">Est principale</TableHead>
                                    <TableHead className="hidden md:table-cell">Nbr sous-catégorie</TableHead>
                                    <TableHead>Parent</TableHead>
                                    <TableHead>
                                        <span className="sr-only">Actions</span>
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {status === 'error' ? null : status === 'pending' ? (
                                    <>
                                        <CategoryRowSkeleton />
                                        <CategoryRowSkeleton />
                                        <CategoryRowSkeleton />
                                        <CategoryRowSkeleton />
                                        <CategoryRowSkeleton />
                                        <CategoryRowSkeleton />
                                        <CategoryRowSkeleton />
                                        <CategoryRowSkeleton />
                                        <CategoryRowSkeleton />
                                        <CategoryRowSkeleton />
                                    </>
                                ) : (
                                    <>
                                        {getFilteredCategories()
                                            .slice(startIndex, endIndex)
                                            .map((category) => (
                                                <TableRow key={category.id}>
                                                    <TableCell className="font-medium max-w-xs truncate">{category.name}</TableCell>
                                                    <TableCell className="hidden: md:table-cell">
                                                        <Badge variant="outline">{category.is_main_category ? 'Oui' : 'Non'}</Badge>
                                                    </TableCell>
                                                    <TableCell className="hidden md:table-cell">{category.subcategories?.length}</TableCell>
                                                    <TableCell className="font-medium max-w-xs truncate">{category.parent_name}</TableCell>
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
                                                                <DropdownMenuItem onClick={() => setCategoryItem(category)}>
                                                                    <Pencil className="size-4 mr-3" /> Modifier
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem onClick={() => setItemToDelete(category)}>
                                                                    <Trash2 className="size-4 mr-3" /> Supprimer
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
                                                        de <strong>{formatAdminCategories(data)?.length}</strong> catégories
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
            <AlertDialog
                open={!!itemToDelete}
                onOpenChange={(open) => {
                    if (!open) setItemToDelete(null)
                }}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Êtes-vous certain?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Cette action ne peut pas être annulée. Cela supprimera définitivement cette{' '}
                            {itemToDelete?.is_main_category ? 'catégorie' : 'sous-catégorie'}.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() =>
                                deleteMutation.mutate({
                                    categoryId: itemToDelete!.id,
                                    isMainCategory: itemToDelete!.is_main_category
                                })
                            }
                            disabled={deleteMutation.isPending}
                        >
                            Continuer
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

const CategoryRowSkeleton = () => (
    <TableRow>
        <TableCell>
            <Skeleton className="w-24 h-4" />
        </TableCell>
        <TableCell className="hidden md:table-cell">
            <Skeleton className="w-10 h-4" />
        </TableCell>
        <TableCell className="hidden md:table-cell">
            <Skeleton className="w-10 h-4" />
        </TableCell>
        <TableCell>
            <Skeleton className="w-24 h-4" />
        </TableCell>
        <TableCell>
            <Skeleton className="w-4 h-4" />
        </TableCell>
    </TableRow>
)

export const Route = createLazyFileRoute('/admin/category')({
    component: AdminCategory
})
