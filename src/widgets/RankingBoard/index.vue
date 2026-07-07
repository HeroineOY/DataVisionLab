<template>
  <ol class="ranking-board">
    <li v-for="(item, index) in items" :key="item.name" class="ranking-board__item">
      <span class="ranking-board__index">{{ index + 1 }}</span>
      <div class="ranking-board__content">
        <div class="ranking-board__line">
          <strong>{{ item.name }}</strong>
          <span>{{ item.value.toLocaleString('zh-CN') }}</span>
        </div>
        <div class="ranking-board__track">
          <i :style="{ width: `${item.rate}%` }" />
        </div>
      </div>
    </li>
  </ol>
</template>

<script setup lang="ts">
import type { RankingItem } from '@/features/dashboard/model/dashboard'

defineProps<{
  items: RankingItem[]
}>()
</script>

<style scoped>
.ranking-board {
  display: grid;
  gap: 14px;
  height: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
}

.ranking-board__item {
  display: grid;
  grid-template-columns: 34px 1fr;
  align-items: center;
  gap: 12px;
}

.ranking-board__index {
  display: grid;
  width: 30px;
  height: 30px;
  place-items: center;
  border: 1px solid var(--ink-line-strong);
  border-radius: 8px;
  background: linear-gradient(145deg, rgb(255 255 255 / 72%), rgb(237 230 216 / 64%));
  color: var(--ink-blue);
  font-family: var(--ink-font-number);
  font-weight: 700;
}

.ranking-board__content {
  min-width: 0;
}

.ranking-board__line {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  color: var(--ink-dark);
  font-size: 14px;
}

.ranking-board__line strong {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ranking-board__line span {
  color: var(--ink-cyan);
  font-family: var(--ink-font-number);
  font-weight: 700;
}

.ranking-board__track {
  height: 7px;
  margin-top: 8px;
  overflow: hidden;
  border-radius: 99px;
  background: rgb(31 50 64 / 10%);
}

.ranking-board__track i {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--ink-cyan-bright), var(--ink-lake), var(--ink-blue));
  box-shadow: 0 0 16px rgb(47 143 138 / 18%);
}
</style>
