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
  border: 1px solid var(--ink-line);
  border-radius: var(--ink-radius);
  background:
    radial-gradient(circle at 88% 0%, rgb(93 154 178 / 14%), transparent 30%),
    linear-gradient(145deg, rgb(255 255 255 / 96%), rgb(237 230 216 / 68%)),
    var(--ink-card-solid);
  box-shadow:
    var(--ink-shadow-soft),
    inset 0 1px 0 rgb(255 255 255 / 78%);
  backdrop-filter: blur(14px);
  transform-origin: center;
  transition:
    transform 360ms var(--motion-bounce),
    border-color 220ms ease,
    box-shadow 260ms var(--motion-smooth),
    filter 220ms ease;
  will-change: transform;
}

.metric-card:hover {
  border-color: rgb(47 143 138 / 28%);
  box-shadow:
    0 18px 42px rgb(47 72 82 / 15%),
    0 0 32px rgb(47 143 138 / 10%);
  animation: inkCardBounce 420ms var(--motion-bounce) both;
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
  background: rgb(47 143 138 / 9%);
  content: '';
}

.metric-card--cyan::before {
  background: var(--ink-cyan-bright);
}

.metric-card--blue::before {
  background: var(--ink-lake);
}

.metric-card--amber::before {
  background: var(--ink-ochre);
}

.metric-card--rose::before {
  background: var(--ink-cinnabar);
}

.metric-card__label {
  margin: 0 0 clamp(8px, 0.7vh, 11px);
  color: var(--ink-text-soft);
  font-size: 14px;
  font-weight: 600;
}

.metric-card__value {
  color: var(--ink-dark);
  font-family: var(--ink-font-number);
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
  color: var(--ink-blue-soft);
  font-size: 13px;
  font-weight: 700;
}

@media (width <= 1180px) {
  .metric-card:hover {
    animation: inkCardBounceCompact 360ms var(--motion-bounce) both;
  }
}

@media (prefers-reduced-motion: reduce) {
  .metric-card,
  .metric-card:hover {
    animation: none;
    transform: none;
  }
}
</style>
