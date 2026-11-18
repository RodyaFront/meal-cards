interface Product {
  name: string
  unit: string
  /** Цена за одну единицу `unit`, грн */
  price: number
}

export const products = {
  buckwheat: { name: 'Гречка', unit: 'г', price: 60 / 1000 },
  rice: { name: 'Рис', unit: 'г', price: 45 / 1000 },
  oats: { name: 'Овсянка', unit: 'г', price: 40 / 1000 },
  pasta: { name: 'Макароны', unit: 'г', price: 35 / 1000 },
  potato: { name: 'Картошка', unit: 'г', price: 20 / 1000 },
  egg: { name: 'Яйца', unit: 'шт', price: 45 / 10 },
  chicken: { name: 'Курица (бёдра, окорочка)', unit: 'г', price: 120 / 1000 },
  oil: { name: 'Масло подсолнечное', unit: 'мл', price: 50 / 500 },
  cabbage: { name: 'Капуста', unit: 'г', price: 30 / 1000 },
  carrot: { name: 'Морковь', unit: 'г', price: 30 / 1000 },
  onion: { name: 'Лук', unit: 'г', price: 30 / 1000 },
  // Вес буханки в исходной таблице не указан: считаем 16 ломтиков на буханку.
  bread: { name: 'Хлеб', unit: 'ломт.', price: 20 / 16 },
  milk: { name: 'Молоко или кефир', unit: 'мл', price: 50 / 1000 },
  fish: { name: 'Рыбные консервы', unit: 'бан.', price: 55 },
  fruit: { name: 'Банан или яблоко', unit: 'г', price: 50 / 1000 },
} satisfies Record<string, Product>

export type ProductId = keyof typeof products
