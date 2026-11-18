<script setup lang="ts">
const props = defineProps<{
  spent: number
  budget: number
  reserve: number
}>()

const spentPercent = computed(() => Math.min(100, (props.spent / props.budget) * 100))
</script>

<template>
  <section class="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-stone-200">
    <div class="flex items-baseline justify-between gap-4">
      <p class="text-sm text-stone-500">Осталось на блюда в этом месяце</p>
      <p class="text-lg font-semibold whitespace-nowrap">{{ formatMoney(budget - spent) }}</p>
    </div>
    <div class="mt-3 h-2 overflow-hidden rounded-full bg-stone-100">
      <div class="h-full rounded-full bg-emerald-500" :style="{ width: `${spentPercent}%` }" />
    </div>
    <p class="mt-2 text-xs text-stone-500">
      Потрачено {{ formatMoney(spent) }} из {{ formatMoney(budget) }}.
      Ещё {{ formatMoney(reserve) }} отложено на соль, специи и чай.
    </p>
  </section>
</template>
