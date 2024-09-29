import { useCategories } from '@/api/categories/get-categories'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'
import { createLazyFileRoute } from '@tanstack/react-router'

const AdminProduct = () => {
    const { data: categories } = useCategories({})

    return (
        <div className="p-8 space-y-8">
            {/* Formulaire d'ajout de produit */}
            <div>
                <h2 className="text-xl font-bold mb-4">Add Product</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="name" className="text-sm font-medium">
                            Name
                        </Label>
                        <Input type="text" name="name" id="name" className="border border-gray-300 p-2 rounded-md" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="brand" className="text-sm font-medium">
                            Brand
                        </Label>
                        <Input type="text" name="brand" id="brand" className="border border-gray-300 p-2 rounded-md" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="model" className="text-sm font-medium">
                            Model
                        </Label>
                        <Input type="text" name="model" id="model" className="border border-gray-300 p-2 rounded-md" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="price" className="text-sm font-medium">
                            Price
                        </Label>
                        <Input type="number" name="price" id="price" className="border border-gray-300 p-2 rounded-md" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="stockQuantity" className="text-sm font-medium">
                            Stock Quantity
                        </Label>
                        <Input type="number" name="stockQuantity" id="stockQuantity" className="border border-gray-300 p-2 rounded-md" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="brand" className="text-sm font-medium">
                            Image URL
                        </Label>
                        <Input type="text" name="image_url" id="image_url" className="border border-gray-300 p-2 rounded-md" />
                    </div>
                    <div className="flex flex-col col-span-2">
                        <Label htmlFor="description" className="text-sm font-medium">
                            Description
                        </Label>
                        <Textarea name="description" id="description" className="border border-gray-300 p-2 rounded-md" rows={4} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="categoryId" className="text-sm font-medium">
                            Category
                        </Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {categories?.map((category) => (
                                        <SelectItem key={category.id} value={category.id}>
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="subCategoryId" className="text-sm font-medium">
                            Sub-Category
                        </Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select SubCategory" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="1">SubCategory 1</SelectItem>
                                    <SelectItem value="2">SubCategory 2</SelectItem>
                                    <SelectItem value="3">SubCategory 3</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="discountId" className="text-sm font-medium">
                            Discount
                        </Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Discount" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="1">Discount 1</SelectItem>
                                    <SelectItem value="2">Discount 2</SelectItem>
                                    <SelectItem value="3">Discount 3</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <Button className="mt-4">Add Product</Button>
            </div>

            {/* Tableau d'affichage des produits */}
            <div>
                <Table>
                    <TableCaption>Product List</TableCaption>
                    <TableHeader>
                        <TableRow className="bg-gray-100">
                            <TableHead className="py-2 px-4 border-b">Name</TableHead>
                            <TableHead className="py-2 px-4 border-b">Price</TableHead>
                            <TableHead className="py-2 px-4 border-b">Stock</TableHead>
                            <TableHead className="py-2 px-4 border-b">Brand</TableHead>
                            <TableHead className="py-2 px-4 border-b">Model</TableHead>
                            <TableHead className="py-2 px-4 border-b">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="py-2 px-4 border-b">Test</TableCell>
                            <TableCell className="py-2 px-4 border-b">10000</TableCell>
                            <TableCell className="py-2 px-4 border-b">4</TableCell>
                            <TableCell className="py-2 px-4 border-b">Test</TableCell>
                            <TableCell className="py-2 px-4 border-b">Test</TableCell>
                            <TableCell className="py-2 px-4 border-b space-x-4">
                                <Button className="text-blue-500 hover:underline">Edit</Button>
                                <Button className="text-red-500 hover:underline">Delete</Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default AdminProduct
export const Route = createLazyFileRoute('/admin/product')({
    component: AdminProduct
})
