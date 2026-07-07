<template>
  <article class="metric-card" :class="`metric-card--${metric.tone}`">
    <div>
      <p class="metric-card__label">{{ metric.label }}</p>
      <strong class="metric-card__value">{{ displayValue }}</strong>
    </div>
    <div class="metric-card__meta">
      <span>{{ metric.unit }}</span>
      <span>+{{ metric.trend.toFixed(1) }}%</span>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CoreMetric } from '@/features/dashboard/model/dashboard'
import { formatCompactNumber } from '@/shared/utils/number'

const props = defineProps<{
  metric: CoreMetric
}>()

const displayValue = computed(() => {
  if (props.metric.unit === '%' || props.metric.unit === '分') {
    return props.metric.value.toFixed(1)
  }

  return formatCompactNumber(props.metric.value)
})
</script>

<style scoped>
.metric-card {
  position: relative;
  display: flex;
  min-height: 0;
  justify-content: space-between;
  overflow: hidden;
  padding: clamp(14px, 1vw, 18px);
  border: 1px solid rgb(125 211 252 / 14%);
  border-radius: 8px;
  background:
    linear-gradient(145deg, rgb(255 255 255 / 11%), rgb(255 255 255 / 3%)),
    rgb(12 24 42 / 82%);
  box-shadow:
    0 16px 34px rgb(0 0 0 / 20%),
    inset 0 1px 0 rgb(255 255 255 / 8%);
}

.metric-card::before {
  position: absolute;
  inset: 0 auto 0 0;
  width: 3px;
  content: '';
}

.metric-card::after {
  position: absolute;
  top: -22px;
  right: -18px;
  width: 74px;
  height: 74px;
  border-radius: 50%;
  background: rgb(125 211 252 / 10%);
  content: '';
}

.metric-card--cyan::before {
  background: #2dd4bf;
}

.metric-card--blue::before {
  background: #60a5fa;
}

.metric-card--amber::before {
  background: #f59e0b;
}

.metric-card--rose::before {
  background: #f472b6;
}

.metric-card__label {
  margin: 0 0 clamp(8px, 0.7vh, 11px);
  color: #a9bad6;
  font-size: 14px;
}

.metric-card__value {
  color: #f8fbff;
  font-size: clamp(24px, 1.55vw, 31px);
  font-weight: 700;
  line-height: 1;
}

.metric-card__meta {
  display: flex;
  min-width: 72px;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  color: #c7d2fe;
  font-size: 13px;
}
</style>
