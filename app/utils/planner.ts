import { DISH_BUDGET } from '../data/budget'
import { dishes, type Dish, type MealSlot } from '../data/dishes'
import { products } from '../data/products'

export const SLOTS: MealSlot[] = ['breakfast', 'lunch', 'dinner']

export interface LogEntry {
  /** Локальная дата в формате YYYY-MM-DD */
  date: string
  slot: MealSlot
  dishId: string
  cost: number
}

const roundMoney = (value: number) => Math.round(value * 100) / 100

export function dishCost(dish: Dish) {
  return roundMoney(dish.ingredients.reduce((sum, [id, amount]) => sum + products[id].price * amount, 0))
}

export function monthSpent(log: LogEntry[], date: string) {
  const month = date.slice(0, 7)
  return roundMoney(log.filter(entry => entry.date.startsWith(month)).reduce((sum, entry) => sum + entry.cost, 0))
}

// Остаток бюджета делится поровну на все ещё не выбранные приёмы пищи до конца месяца.
// Блюдо дороже этой доли не предлагается, поэтому сумма за месяц не может превысить DISH_BUDGET.
export function slotCap(log: LogEntry[], date: string) {
  const day = new Date(`${date}T00:00`)
  const daysInMonth = new Date(day.getFullYear(), day.getMonth() + 1, 0).getDate()
  const daysLeft = daysInMonth - day.getDate() + 1
  const acceptedToday = log.filter(entry => entry.date === date).length
  return (DISH_BUDGET - monthSpent(log, date)) / (daysLeft * SLOTS.length - acceptedToday)
}

export function pickDish(slot: MealSlot, cap: number, exclude: string[]) {
  const pool = dishes.filter(dish => dish.slots.includes(slot) && dishCost(dish) <= cap && !exclude.includes(dish.id))
  return pool[Math.floor(Math.random() * pool.length)]
}
