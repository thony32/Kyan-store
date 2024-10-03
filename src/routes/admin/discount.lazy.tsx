import { useDeleteDiscount } from '@/api/discount/delete-discount'
import { useDiscounts } from '@/api/discount/get-discounts'
import DiscountDialogForm from '@/components/back-office/discount/discount-form'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
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
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { DualRangeSlider } from '@/components/ui/dual-range-slider'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useItemStore } from '@/store/edit-item-store'
import type { Discount } from '@/types/api'
import { createLazyFileRoute } from '@tanstack/react-router'
import { AlertCircleIcon, ChevronLeft, ChevronRight, File, ListFilter, MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import { useCallback, useState } from 'react'
import { usePagination } from 'react-use-pagination'

const AdminDiscount = () => {
    const { data, status, error } = useDiscounts({})
    const [filter, setFilter] = useState<number[]>([0, 10])
    const setDiscountItem = useItemStore((state) => state.setItem)

    const getFilteredDiscounts = useCallback(() => {
        if (status !== 'success' && !data) return []

        return data.filter((discount) => discount.percentage >= filter[0] && discount.percentage <= filter[1])
    }, [data, filter, status])

    const { currentPage, totalPages, setNextPage, setPreviousPage, nextEnabled, previousEnabled, startIndex, endIndex } = usePagination({
        totalItems: getFilteredDiscounts().length ? getFilteredDiscounts().length + 1 : 0,
        initialPageSize: 10
    })
    const [itemToDelete, setItemToDelete] = useState<Discount | null>(null)
    const deleteMutation = useDeleteDiscount({})

    return (
        <div className="grid gap-4">
            <div className="flex justify-end items-center gap-2">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" size="sm" className="h-7 gap-1">
                            <ListFilter className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Filtre</span>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <h4 className="font-medium text-sm leading-none mb-8">Pourcentage</h4>
                        <DualRangeSlider
                            label={(value) => (value ? value * 10 : 0)}
                            value={filter}
                            onValueChange={setFilter}
                            min={0}
                            max={10}
                            step={0.1}
                        />
                    </PopoverContent>
                </Popover>

                <Button size="sm" variant="outline" className="h-7 gap-1">
                    <File className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Exporter</span>
                </Button>
                <DiscountDialogForm />
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
                                    <TableHead>Pourcentage</TableHead>
                                    <TableHead>Valide jusqu'à</TableHead>
                                    <TableHead>
                                        <span className="sr-only">Actions</span>
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {status === 'error' ? null : status === 'pending' ? (
                                    <>
                                        <DiscountRowSkeleton />
                                        <DiscountRowSkeleton />
                                        <DiscountRowSkeleton />
                                        <DiscountRowSkeleton />
                                        <DiscountRowSkeleton />
                                        <DiscountRowSkeleton />
                                        <DiscountRowSkeleton />
                                        <DiscountRowSkeleton />
                                        <DiscountRowSkeleton />
                                        <DiscountRowSkeleton />
                                    </>
                                ) : (
                                    <>
                                        {getFilteredDiscounts()
                                            .slice(startIndex, endIndex)
                                            .map((discount) => (
                                                <TableRow key={discount.id}>
                                                    <TableCell className="font-medium max-w-xs truncate">{discount.percentage * 10}%</TableCell>
                                                    <TableCell className="font-medium max-w-xs truncate">
                                                        {Intl.DateTimeFormat('fr-FR', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric'
                                                        }).format(new Date(discount.valid_until))}
                                                    </TableCell>
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
                                                                <DropdownMenuItem onClick={() => setDiscountItem(discount)}>
                                                                    <Pencil className="size-4 mr-3" /> Modifier
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem onClick={() => setItemToDelete(discount)}>
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
                                                        de <strong>{data.length}</strong> promotions
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
                            Cette action ne peut pas être annulée. Cela supprimera définitivement cette promotion.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => deleteMutation.mutate({ discountId: itemToDelete!.id })}
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

const DiscountRowSkeleton = () => (
    <TableRow>
        <TableCell>
            <Skeleton className="w-24 h-4" />
        </TableCell>
        <TableCell>
            <Skeleton className="w-24 h-4" />
        </TableCell>
        <TableCell>
            <Skeleton className="w-4 h-4" />
        </TableCell>
    </TableRow>
)

export const Route = createLazyFileRoute('/admin/discount')({
    component: AdminDiscount
})
