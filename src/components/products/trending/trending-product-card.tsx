import { Badge } from '@/components/ui/badge'

const TrendingProductCard = ({
    imgSrc,
    productName,
    productDescription,
    price
}: { imgSrc: string; productName: string; productDescription: string; price: number }) => {
    return (
        <div className="flex gap-2 w-1/2 items-center">
            <div className="w-2/3 shadow-sm">
                <img src={imgSrc} className="object-contain" alt="Manette" />
            </div>
            <div>
                <div>
                    <button type="button" className="font-bold">
                        {productName}
                    </button>
                    <p className="text-xs  line-clamp-1 overflow-hidden text-ellipsis">{productDescription}</p>
                </div>
                <div className="space-x-3">
                    <span>16</span>
                    <span>
                        {' '}
                        <span className="text-green-400">$</span>
                        {price}
                    </span>
                    <Badge className="bg-destructive"> -25%</Badge>
                </div>
                <div className="flex gap-2 items-center">
                    <span>4.7</span>
                    <div className="flex">
                        {Array(5)
                            .fill(0)
                            .map((_: any, index: number) => (
                                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                                <svg key={index} width={11} height={10} viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M4.78305 0.546026C4.84909 0.412107 4.9513 0.299343 5.0781 0.220493C5.2049 0.141643 5.35124 0.0998535 5.50055 0.0998535C5.64987 0.0998535 5.79621 0.141643 5.92301 0.220493C6.04981 0.299343 6.15201 0.412107 6.21805 0.546026L7.33005 2.79803L9.81605 3.15903C9.96384 3.18049 10.1027 3.24288 10.2168 3.33915C10.331 3.43543 10.4159 3.56173 10.462 3.70377C10.5081 3.84581 10.5135 3.99792 10.4777 4.14288C10.4418 4.28784 10.3661 4.41987 10.2591 4.52403L8.46005 6.27703L8.88505 8.75303C8.91033 8.9001 8.89397 9.05131 8.83782 9.18958C8.78166 9.32784 8.68796 9.44764 8.56728 9.53544C8.44661 9.62324 8.30379 9.67554 8.15496 9.68642C8.00612 9.6973 7.85721 9.66634 7.72505 9.59703L5.50005 8.42703L3.27605 9.59703C3.14389 9.66634 2.99498 9.6973 2.84615 9.68642C2.69731 9.67554 2.55449 9.62324 2.43382 9.53544C2.31315 9.44764 2.21944 9.32784 2.16329 9.18958C2.10713 9.05131 2.09077 8.9001 2.11605 8.75303L2.54005 6.27703L0.741053 4.52403C0.634016 4.41981 0.558301 4.2877 0.522481 4.14266C0.486661 3.99763 0.492169 3.84546 0.53838 3.70339C0.584591 3.56132 0.669658 3.43503 0.783949 3.33883C0.898239 3.24262 1.03719 3.18033 1.18505 3.15903L3.67105 2.79903L4.78305 0.546026Z"
                                        fill="#FFBA18"
                                    />
                                </svg>
                            ))}
                    </div>
                    <span>269</span>
                </div>
            </div>
        </div>
    )
}

export default TrendingProductCard
