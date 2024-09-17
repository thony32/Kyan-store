import type React from 'react'
import { useState } from 'react'

interface Slide {
    image: string
    altText: string
}

const Carousel: React.FC = () => {
    const slides: Slide[] = [
        {
            image: 'https://media.istockphoto.com/id/1295274245/photo/random-multicolored-spheres-computer-generated-abstract-form-of-large-and-small-balls-3d.jpg?s=612x612&w=0&k=20&c=q7NOl28YxIIOqKu6em50VlKrg6ISFyVww_nLOCr5W_A=',
            altText: 'Mega Sale'
        },
        {
            image: 'https://t3.ftcdn.net/jpg/09/37/69/86/360_F_937698648_AWqXvwVo1siiUQplTtjNjQCRIdH63Ifl.jpg',
            altText: 'New Arrivals'
        },
        {
            image: 'https://t3.ftcdn.net/jpg/09/37/69/86/360_F_937698654_KFtpOXKXTFjOQajWM03TLvxTQJhtbNmA.jpg',
            altText: 'Summer Sale'
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
                        <img src={slide.image} alt={slide.altText} className="w-full rounded-2xl" />
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
