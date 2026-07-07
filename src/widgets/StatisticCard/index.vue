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
  min-height: 104px;
  justify-content: space-between;
  overflow: hidden;
  padding: 18px;
  border: 1px solid rgb(255 255 255 / 10%);
  border-radius: 8px;
  background: linear-gradient(145deg, rgb(255 255 255 / 9%), rgb(255 255 255 / 3%));
  box-shadow: 0 16px 38px rgb(0 0 0 / 20%);
}

.metric-card::before {
  position: absolute;
  inset: 0 auto 0 0;
  width: 4px;
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
  margin: 0 0 10px;
  color: #a9bad6;
  font-size: 14px;
}

.metric-card__value {
  color: #f8fbff;
  font-size: 30px;
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
