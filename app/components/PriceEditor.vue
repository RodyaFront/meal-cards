<script setup lang="ts">
import { products, type ProductId } from '~/data/products'

const props = defineProps<{
  prices: Prices
}>()

const emit = defineEmits<{
  change: [id: ProductId, price: number]
}>()

const productIds = Object.keys(products) as ProductId[]

const currentPrice = (id: ProductId) => props.prices[id] ?? products[id].price

function onChange(id: ProductId, event: Event) {
  const input = event.target as HTMLInputElement
  const price = Number(input.value)
  if (price > 0) emit('change', id, price)
  else input.value = String(currentPrice(id))
}
</script>

<template>
  <section class="rounded-2xl bg-white px-4 py-2 shadow-sm ring-1 ring-stone-200">
    <ul class="divide-y divide-stone-100">
      <li v-for="id in productIds" :key="id" class="flex items-center justify-between gap-3 py-2">
        <label :for="`price-${id}`" class="text-sm">{{ products[id].name }}</label>
        <div class="flex shrink-0 items-center gap-2">
          <input
            :id="`price-${id}`"
            type="number"
            inputmode="decimal"
            min="0"
            step="any"
            :value="currentPrice(id)"
            class="w-20 rounded-lg bg-stone-100 px-2 py-1.5 text-right"
            @change="onChange(id, $event)"
          >
          <span class="w-24 text-xs text-stone-500">грн за {{ products[id].pack }}</span>
        </div>
      </li>
    </ul>
  </section>
</template>
