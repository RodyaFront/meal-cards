<script setup lang="ts">
import { dishes } from '~/data/dishes'

defineProps<{
  prices: Prices
}>()

const groups = [
  { title: 'Завтраки', dishes: dishes.filter(dish => dish.slots.includes('breakfast')) },
  { title: 'Обед и ужин', dishes: dishes.filter(dish => dish.slots.includes('lunch')) },
]
</script>

<template>
  <section v-for="group in groups" :key="group.title">
    <h2 class="mb-2 text-sm font-medium text-stone-500">{{ group.title }} · {{ group.dishes.length }}</h2>
    <div class="divide-y divide-stone-100 rounded-2xl bg-white px-4 shadow-sm ring-1 ring-stone-200">
      <details v-for="dish in group.dishes" :key="dish.id" class="py-3">
        <summary class="cursor-pointer font-medium">{{ dish.name }}</summary>
        <DishInfo class="mt-2" :dish="dish" :cost="dishCost(dish, prices)" steps-open />
      </details>
    </div>
  </section>
</template>
