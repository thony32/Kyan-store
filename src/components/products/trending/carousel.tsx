import type React from 'react'
import { useState } from 'react'

interface Slide {
    image: string
    altText: string
}

const Carousel: React.FC = () => {
    const slides: Slide[] = [
        {
            image: 'https://img.freepik.com/free-photo/big-sale-discounts-products_23-2150336669.jpg',
            altText: 'Mega Sale'
        },
        {
            image: 'https://img.freepik.com/free-psd/black-friday-super-sale-web-banner-template_120329-2158.jpg',
            altText: 'Black Friday'
        },
        {
            image: 'https://img.freepik.com/premium-psd/smart-phone-sale-promotion-black-friday-sale-web-banner-template_179771-192.jpg',
            altText: 'Black Friday Sale'
        },
        {
            image: 'https://img.freepik.com/premium-psd/gaming-laptop-sale-promotion-banner_252779-743.jpg',
            altText: 'Gaming Laptop Sale'
        }
    ]

    const [currentIndex, setCurrentIndex] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)

    const nextSlide = () => {
        if (isAnimating) return
        setIsAnimating(true)
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1))
            setIsAnimating(false)
        }, 500) // Animation duration
    }

    const prevSlide = () => {
        if (isAnimating) return
        setIsAnimating(true)
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1))
            setIsAnimating(false)
        }, 500) // Animation duration
    }

    return (
        <div className="relative w-full max-w-4xl mx-auto overflow-hidden">
            <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                    transform: `translateX(-${currentIndex * 100}%)`
                }}
            >
                {slides.map((slide) => (
                    <div key={slide.image} className="min-w-full transition-opacity duration-500 ease-in-out">
                        <img src={slide.image} alt={slide.altText} className="w-full object-cover aspect-video rounded-2xl" />
                    </div>
                ))}
            </div>

            {/* Previous button */}
            <button
                type="button"
                onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-r-md hover:bg-opacity-75 transition"
            >
                &#10094;
            </button>

            {/* Next button */}
            <button
                type="button"
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-l-md hover:bg-opacity-75 transition"
            >
                &#10095;
            </button>
        </div>
    )
}

export default Carousel
