<script setup lang="ts">
import { DISH_BUDGET, EXTRAS_RESERVE } from '~/data/budget'

const { today, cards, spent, prices, accept, reroll, undo, setPrice, exportBackup, importBackup } = useMealPlan()

const showPrices = ref(false)

const dateLabel = computed(() =>
  new Date(`${today.value}T00:00`).toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' }),
)

const backupError = ref(false)

async function onBackupSelected(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (file && confirm('Заменить текущие данные данными из копии?')) {
    backupError.value = !(await importBackup(file))
  }
  input.value = ''
}
</script>

<template>
  <NuxtPwaManifest />
  <div class="min-h-dvh bg-stone-50 text-stone-900">
    <main class="mx-auto flex max-w-md flex-col gap-4 px-4 py-6">
      <header class="flex items-end justify-between gap-4">
        <div>
          <p class="text-sm text-stone-500 first-letter:uppercase">{{ dateLabel }}</p>
          <h1 class="text-2xl font-semibold">{{ showPrices ? 'Цены на продукты' : 'Что готовим сегодня' }}</h1>
        </div>
        <button
          type="button"
          class="rounded-xl bg-stone-100 px-3 py-2 text-sm font-medium text-stone-700 active:bg-stone-200"
          @click="showPrices = !showPrices"
        >
          {{ showPrices ? 'Готово' : 'Цены' }}
        </button>
      </header>

      <template v-if="showPrices">
        <p class="text-sm text-stone-500">
          Впишите цены с чека — стоимость блюд пересчитается сразу. Уже выбранные блюда остаются по цене на
          момент выбора.
        </p>
        <PriceEditor :prices="prices" @change="setPrice" />
      </template>

      <template v-else>
        <BudgetSummary :spent="spent" :budget="DISH_BUDGET" :reserve="EXTRAS_RESERVE" />

        <MealCard
          v-for="card in cards"
          :key="card.slot"
          v-bind="card"
          @accept="accept(card.slot)"
          @reroll="reroll(card.slot)"
          @undo="undo(card.slot)"
        />
      </template>

      <footer class="text-center text-xs text-stone-500">
        <p>Траты и цены хранятся только на этом устройстве.</p>
        <div class="mt-2 flex justify-center gap-4">
          <button type="button" class="underline" @click="exportBackup">Сохранить копию</button>
          <label class="cursor-pointer underline">
            Восстановить из копии
            <input type="file" accept=".json,application/json" class="hidden" @change="onBackupSelected">
          </label>
        </div>
        <p v-if="backupError" class="mt-2 text-red-600">
          Не удалось прочитать файл: это не копия данных приложения.
        </p>
      </footer>
    </main>
  </div>
</template>
