const money = new Intl.NumberFormat('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

export const formatMoney = (value: number) => `${money.format(value)} грн`
