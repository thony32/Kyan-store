import { createLazyFileRoute } from '@tanstack/react-router'
import { usePayments } from '@/api/payment/get-payments'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { AlertCircleIcon, CheckCircleIcon, ChevronLeft, ChevronRight, File, ListFilter } from 'lucide-react'
import { useCallback, useState } from 'react'
import { usePagination } from 'react-use-pagination'

const AdminPayment = () => {
    const { data, status, error } = usePayments({})
    const [filter, setFilter] = useState<boolean | null>(null)
    const getFilteredPayments = useCallback(() => {
        if (status !== 'success' && !data) return []

        return data.filter((payment) => (filter === null ? true : payment.is_confirmed === filter))
    }, [data, filter, status])

    const { currentPage, totalPages, setNextPage, setPreviousPage, nextEnabled, previousEnabled, startIndex, endIndex } = usePagination({
        totalItems: getFilteredPayments().length ? getFilteredPayments().length + 1 : 0,
        initialPageSize: 10
    })

    return (
        <div className="grid gap-4">
            <div className="flex justify-end items-center gap-2">
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
                            Effectué
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem checked={filter === false} onClick={() => setFilter(false)}>
                            En attente
                        </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Button size="sm" variant="outline" className="h-7 gap-1">
                    <File className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Exporter</span>
                </Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Liste paiements</CardTitle>
                    <CardDescription>Gérer vos catégories et leurs informations</CardDescription>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[70vh]">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Montant</TableHead>
                                    <TableHead>Confirmation</TableHead>
                                    <TableHead className="hidden sm:table-cell">Date commande</TableHead>
                                    <TableHead className="hidden md:table-cell text-right">Produits</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {status === 'error' ? null : status === 'pending' ? (
                                    <>
                                        <PaymentRowSkeleton />
                                        <PaymentRowSkeleton />
                                        <PaymentRowSkeleton />
                                        <PaymentRowSkeleton />
                                        <PaymentRowSkeleton />
                                        <PaymentRowSkeleton />
                                        <PaymentRowSkeleton />
                                        <PaymentRowSkeleton />
                                        <PaymentRowSkeleton />
                                        <PaymentRowSkeleton />
                                    </>
                                ) : (
                                    <>
                                        {getFilteredPayments()
                                            .slice(startIndex, endIndex)
                                            .map((payment) => (
                                                <TableRow key={payment.payment_id}>
                                                    <TableCell>{payment.order.total_amount}USD</TableCell>
                                                    <TableCell>
                                                        {payment.is_confirmed ? (
                                                            <span className="text-green-500 flex gap-2 items-center">
                                                                <CheckCircleIcon className="size-4" /> Effectué
                                                            </span>
                                                        ) : (
                                                            <span className="text-red-500 flex gap-2 items-center">
                                                                <AlertCircleIcon className="size-4" /> En attente
                                                            </span>
                                                        )}
                                                    </TableCell>
                                                    <TableCell className="hidden sm:table-cell">
                                                        {Intl.DateTimeFormat('fr-FR', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric'
                                                        }).format(new Date(payment.order.order_date))}
                                                    </TableCell>
                                                    <TableCell className="hidden md:table-cell text-end">
                                                        {payment.order.order_items.length}
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
        </div>
    )
}

const PaymentRowSkeleton = () => (
    <TableRow>
        <TableCell>
            <Skeleton className="w-24 h-4" />
        </TableCell>
        <TableCell>
            <Skeleton className="w-20 h-4" />
        </TableCell>
        <TableCell className="hidden sm:table-cell">
            <Skeleton className="w-24 h-4" />
        </TableCell>
        <TableCell className="hidden md:table-cell">
            <Skeleton className="w-24 h-4 ml-auto" />
        </TableCell>
    </TableRow>
)

export const Route = createLazyFileRoute('/admin/payment')({
    component: AdminPayment
})
