interface Product {
  name: string
  /** Единица, в которой продукт указан в рецептах */
  unit: string
  /** За что указана цена, в винительном падеже: «грн за кг» */
  pack: string
  /** Сколько единиц `unit` в одной упаковке */
  packSize: number
  /** Стартовая цена упаковки, грн; актуальная задаётся на экране «Цены» */
  price: number
}

export const products = {
  buckwheat: { name: 'Гречка', unit: 'г', pack: 'кг', packSize: 1000, price: 60 },
  rice: { name: 'Рис', unit: 'г', pack: 'кг', packSize: 1000, price: 45 },
  oats: { name: 'Овсянка', unit: 'г', pack: 'кг', packSize: 1000, price: 40 },
  pasta: { name: 'Макароны', unit: 'г', pack: 'кг', packSize: 1000, price: 35 },
  potato: { name: 'Картошка', unit: 'г', pack: 'кг', packSize: 1000, price: 20 },
  egg: { name: 'Яйца', unit: 'шт', pack: 'десяток', packSize: 10, price: 45 },
  chicken: { name: 'Курица (бёдра, окорочка)', unit: 'г', pack: 'кг', packSize: 1000, price: 120 },
  oil: { name: 'Масло подсолнечное', unit: 'мл', pack: 'бутылку 0,5 л', packSize: 500, price: 50 },
  cabbage: { name: 'Капуста', unit: 'г', pack: 'кг', packSize: 1000, price: 100 },
  carrot: { name: 'Морковь', unit: 'г', pack: 'кг', packSize: 1000, price: 30 },
  onion: { name: 'Лук', unit: 'г', pack: 'кг', packSize: 1000, price: 30 },
  // Вес буханки в исходной таблице не указан: считаем 16 ломтиков на буханку.
  bread: { name: 'Хлеб', unit: 'ломт.', pack: 'буханку', packSize: 16, price: 20 },
  milk: { name: 'Молоко или кефир', unit: 'мл', pack: 'л', packSize: 1000, price: 50 },
  fish: { name: 'Рыбные консервы', unit: 'бан.', pack: 'банку', packSize: 1, price: 55 },
  banana: { name: 'Бананы', unit: 'г', pack: 'кг', packSize: 1000, price: 50 },
  apple: { name: 'Яблоки', unit: 'г', pack: 'кг', packSize: 1000, price: 50 },
} satisfies Record<string, Product>

export type ProductId = keyof typeof products
