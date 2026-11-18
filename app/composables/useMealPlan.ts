import { dishes, type Dish, type MealSlot } from '~/data/dishes'
import type { ProductId } from '~/data/products'

interface DayOffer {
  date: string
  cards: Partial<Record<MealSlot, string>>
  /** Блюда, уже показанные сегодня в слоте, чтобы реролл не повторялся */
  seen: Partial<Record<MealSlot, string[]>>
}

interface PlanState {
  log: LogEntry[]
  offer: DayOffer
  prices: Prices
}

const STORAGE_KEY = 'meal-cards'

function localDate() {
  const now = new Date()
  const pad = (value: number) => String(value).padStart(2, '0')
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
}

export function useMealPlan() {
  const today = ref(localDate())
  const stored = localStorage.getItem(STORAGE_KEY)
  const state = ref<PlanState>({
    log: [],
    offer: { date: today.value, cards: {}, seen: {} },
    prices: {},
    ...(stored ? JSON.parse(stored) : {}),
  })

  const acceptedEntry = (slot: MealSlot) =>
    state.value.log.find(entry => entry.date === today.value && entry.slot === slot)

  const cost = (dish: Dish) => dishCost(dish, state.value.prices)

  function deal(slot: MealSlot) {
    const { offer: { cards, seen }, prices } = state.value
    const cap = slotCap(state.value.log, today.value)
    const taken = SLOTS.flatMap(other => acceptedEntry(other)?.dishId ?? cards[other] ?? [])
    const shown = seen[slot] ?? []
    const dish = pickDish(slot, cap, [...shown, ...taken], prices) ?? pickDish(slot, cap, taken, prices)
    if (!dish) return false
    seen[slot] = shown.includes(dish.id) ? [dish.id] : [...shown, dish.id]
    cards[slot] = dish.id
    return true
  }

  function refresh() {
    today.value = localDate()
    if (state.value.offer.date !== today.value) {
      state.value.offer = { date: today.value, cards: {}, seen: {} }
    }
    const { cards } = state.value.offer
    for (const slot of SLOTS) {
      if (acceptedEntry(slot)) continue
      const current = dishes.find(dish => dish.id === cards[slot])
      const affordable = current && cost(current) <= slotCap(state.value.log, today.value)
      if (!affordable && !deal(slot)) delete cards[slot]
    }
  }

  function accept(slot: MealSlot) {
    const dish = dishes.find(item => item.id === state.value.offer.cards[slot])
    if (!dish || acceptedEntry(slot)) return
    state.value.log.push({ date: today.value, slot, dishId: dish.id, cost: cost(dish) })
  }

  function setPrice(id: ProductId, price: number) {
    state.value.prices[id] = price
    // Подорожавшие карточки могли перестать помещаться в долю на слот.
    refresh()
  }

  function undo(slot: MealSlot) {
    const entry = acceptedEntry(slot)
    if (!entry) return
    state.value.log.splice(state.value.log.indexOf(entry), 1)
    // После возврата денег доля на слот уменьшается: карточки могли перестать в неё помещаться.
    refresh()
  }

  const cards = computed(() =>
    SLOTS.map((slot) => {
      const entry = acceptedEntry(slot)
      const dish = dishes.find(item => item.id === (entry?.dishId ?? state.value.offer.cards[slot]))
      return { slot, dish, accepted: !!entry, cost: entry?.cost ?? (dish ? cost(dish) : 0) }
    }),
  )

  const spent = computed(() => monthSpent(state.value.log, today.value))
  const prices = computed(() => state.value.prices)

  refresh()
  watch(state, value => localStorage.setItem(STORAGE_KEY, JSON.stringify(value)), { deep: true, immediate: true })

  function exportBackup() {
    const url = URL.createObjectURL(new Blob([JSON.stringify(state.value)], { type: 'application/json' }))
    const link = document.createElement('a')
    link.href = url
    link.download = `meal-cards-${today.value}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  async function importBackup(file: File) {
    try {
      const data = JSON.parse(await file.text())
      if (!Array.isArray(data.log) || !data.offer?.cards) return false
      state.value = { prices: {}, ...data }
      refresh()
      return true
    }
    catch {
      return false
    }
  }

  const onVisible = () => document.visibilityState === 'visible' && refresh()
  onMounted(() => {
    document.addEventListener('visibilitychange', onVisible)
    // Просим браузер не удалять данные сайта при нехватке места.
    navigator.storage?.persist?.()
  })
  onUnmounted(() => document.removeEventListener('visibilitychange', onVisible))

  return { today, cards, spent, prices, accept, reroll: deal, undo, setPrice, exportBackup, importBackup }
}
