import type { Category, Subcategory } from '@/types/api'

export type FormatedCategory = {
    id: string
    name: string
    is_main_category: boolean
    category_id?: string
    subcategories?: Subcategory[]
    parent_name?: string
}

export default function formatAdminCategories(categories: Category[]): FormatedCategory[] {
    const formatedCategories: FormatedCategory[] = []

    categories.forEach((category) => {
        const formatedCategory: FormatedCategory = {
            id: category.id,
            name: category.name,
            is_main_category: category.is_main_category,
            subcategories: category.subcategories
        }

        formatedCategories.push(formatedCategory)

        category.subcategories?.forEach((subcategory) => {
            const formatedSubcategory: FormatedCategory = {
                id: subcategory.id,
                name: subcategory.name,
                is_main_category: false,
                category_id: category.id,
                parent_name: category.name
            }
            formatedCategories.push(formatedSubcategory)
        })
    })

    return formatedCategories
}
