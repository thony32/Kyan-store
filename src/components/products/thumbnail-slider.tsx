import type { EmblaOptionsType } from 'embla-carousel'
import Carousel, { Slider, SliderContainer, ThumsSlider } from '@/components/ui/carousel'

export default function ThumbnailSlider({ images }: { images: string[] }) {
    const OPTIONS: EmblaOptionsType = { loop: true }

    return (
        <>
            <div className="w-full">
                <Carousel options={OPTIONS} className="relative" isAutoPlay={true}>
                    <SliderContainer className="gap-2">
                        {images.map((src) => (
                            <Slider key={src} className="xl:h-[400px] sm:h-[350px] h-[300px] w-full" thumnailSrc={src}>
                                <img src={src} alt={src} className="h-full object-contain rounded-lg w-full" />
                            </Slider>
                        ))}
                    </SliderContainer>
                    <ThumsSlider />
                </Carousel>
            </div>
        </>
    )
}
