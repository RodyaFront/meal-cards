<script setup lang="ts">
import type { Dish, MealSlot } from '~/data/dishes'
import { products } from '~/data/products'

defineProps<{
  slot: MealSlot
  dish?: Dish
  accepted: boolean
  cost: number
}>()

const emit = defineEmits<{
  accept: []
  reroll: []
  undo: []
}>()

const slotLabels: Record<MealSlot, string> = {
  breakfast: 'Завтрак',
  lunch: 'Обед',
  dinner: 'Ужин',
}
</script>

<template>
  <article
    class="rounded-2xl bg-white p-4 shadow-sm ring-1"
    :class="accepted ? 'ring-emerald-400' : 'ring-stone-200'"
  >
    <p class="text-xs font-medium tracking-wide text-emerald-700 uppercase">{{ slotLabels[slot] }}</p>

    <template v-if="dish">
      <h2 class="mt-1 text-lg font-semibold">{{ dish.name }}</h2>
      <p class="text-sm text-stone-500">{{ dish.minutes }} мин · {{ formatMoney(cost) }}</p>

      <ul class="mt-3 space-y-1 text-sm">
        <li v-for="[id, amount] in dish.ingredients" :key="id" class="flex justify-between gap-4">
          <span>{{ products[id].name }}</span>
          <span class="whitespace-nowrap text-stone-500">
            {{ amount.toLocaleString('ru-RU') }} {{ products[id].unit }}
          </span>
        </li>
      </ul>

      <details class="mt-3 text-sm" :open="accepted">
        <summary class="cursor-pointer font-medium text-stone-700">Как готовить</summary>
        <ol class="mt-2 list-decimal space-y-1 pl-5 text-stone-700">
          <li v-for="step in dish.steps" :key="step">{{ step }}</li>
        </ol>
      </details>

      <div v-if="accepted" class="mt-4 flex items-center justify-between gap-4 text-sm">
        <span class="font-medium text-emerald-700">Выбрано, списано {{ formatMoney(cost) }}</span>
        <button type="button" class="text-stone-500 underline" @click="emit('undo')">Отменить</button>
      </div>
      <div v-else class="mt-4 grid grid-cols-2 gap-2">
        <button
          type="button"
          class="rounded-xl bg-emerald-600 px-4 py-2.5 font-medium text-white active:bg-emerald-700"
          @click="emit('accept')"
        >
          Готовлю
        </button>
        <button
          type="button"
          class="rounded-xl bg-stone-100 px-4 py-2.5 font-medium text-stone-700 active:bg-stone-200"
          @click="emit('reroll')"
        >
          Другое блюдо
        </button>
      </div>
    </template>

    <p v-else class="mt-2 text-sm text-stone-500">
      В остаток бюджета на этот приём пищи не помещается ни одно блюдо.
    </p>
  </article>
</template>
