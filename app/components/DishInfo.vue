<script setup lang="ts">
import type { Dish } from '~/data/dishes'
import { products } from '~/data/products'

defineProps<{
  dish: Dish
  cost: number
  stepsOpen: boolean
}>()
</script>

<template>
  <div>
    <p class="text-sm text-stone-500">
      <template v-if="dish.active < dish.minutes">
        {{ dish.active }} мин руками · готово через {{ dish.minutes }} мин
      </template>
      <template v-else>{{ dish.minutes }} мин</template>
      · {{ formatMoney(cost) }}
    </p>

    <ul class="mt-3 space-y-1 text-sm">
      <li v-for="[id, amount] in dish.ingredients" :key="id" class="flex justify-between gap-4">
        <span>{{ products[id].name }}</span>
        <span class="whitespace-nowrap text-stone-500">
          {{ amount.toLocaleString('ru-RU') }} {{ products[id].unit }}
        </span>
      </li>
    </ul>

    <details class="mt-3 text-sm" :open="stepsOpen">
      <summary class="cursor-pointer font-medium text-stone-700">Как готовить</summary>
      <ol class="mt-2 list-decimal space-y-1 pl-5 text-stone-700">
        <li v-for="step in dish.steps" :key="step">{{ step }}</li>
      </ol>
    </details>
  </div>
</template>
