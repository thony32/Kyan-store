import type { FC } from 'react'

const ProductsFilter: FC = () => {
    return (
        <div className="flex flex-col gap-8 items-start min-h-[100dvh]">
            <h1 className="font-extrabold text-lg">Catégories</h1>
            <button type="button" className="text-orange-500">
                Tout
            </button>
            <button type="button" className="hover:text-orange-500 duration-200">
                TV
            </button>
            <button type="button" className="hover:text-orange-500 duration-200">
                Audio
            </button>
            <button type="button" className="hover:text-orange-500 duration-200">
                Ordinateur
            </button>
            <button type="button" className="hover:text-orange-500 duration-200">
                Téléphone
            </button>
            <button type="button" className="hover:text-orange-500 duration-200">
                Jeu
            </button>
            <button type="button" className="hover:text-orange-500 duration-200">
                Electroménagers
            </button>
        </div>
    )
}

export default ProductsFilter
