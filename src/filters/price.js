export const priceFilter = (value) => {
  if (!value) return '0 FCFA'
  return new Intl.NumberFormat('fr-SN', {
    style: 'currency',
    currency: 'XOF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value)
}