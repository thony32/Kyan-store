export const formatCurrency = (num?: number) => {
    if (num! >= 1000000) {
        return `${(num! / 1000000).toFixed(2).replace('.00', '')}M`
    }
    if (num! >= 1000) {
        let rounded = (num! / 1000).toFixed(2)
        rounded = rounded.replace('.00', '')
        return rounded.replace('.', 'k')
    }
    return num?.toString()
}
