<template>
  <div class="system-status">
    <div class="system-status__grid">
      <div>
        <span>接口延迟</span>
        <strong>{{ health.apiLatency }}ms</strong>
      </div>
      <div>
        <span>渲染帧率</span>
        <strong>{{ health.renderFps }}fps</strong>
      </div>
      <div>
        <span>Mock 覆盖</span>
        <strong>{{ health.mockCoverage }}%</strong>
      </div>
    </div>
    <ul class="system-status__logs">
      <li v-for="log in logs" :key="`${log.time}-${log.message}`" :class="`is-${log.level}`">
        <span>{{ log.time }}</span>
        <strong>{{ log.message }}</strong>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { DashboardData } from '@/features/dashboard/model/dashboard'

defineProps<{
  health: DashboardData['health']
  logs: DashboardData['logs']
}>()
</script>

<style scoped>
.system-status {
  display: grid;
  height: 100%;
  min-height: 0;
  grid-template-rows: auto minmax(0, 1fr);
  gap: 10px;
}

.system-status__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
}

.system-status__grid div {
  min-width: 0;
  padding: 10px;
  border: 1px solid var(--ink-line);
  border-radius: 8px;
  background: rgb(255 252 242 / 58%);
}

.system-status__grid span {
  display: block;
  overflow-wrap: anywhere;
  color: var(--ink-text-soft);
  font-size: 12px;
  font-weight: 600;
}

.system-status__grid strong {
  display: block;
  margin-top: 6px;
  color: var(--ink-dark);
  font-family: var(--ink-font-number);
  font-size: clamp(18px, 1.15vw, 21px);
  line-height: 1.1;
}

.system-status__logs {
  display: grid;
  align-content: start;
  gap: 8px;
  min-height: 0;
  margin: 0;
  padding: 0;
  list-style: none;
}

.system-status__logs li {
  display: grid;
  grid-template-columns: 72px 1fr;
  gap: 10px;
  min-width: 0;
  padding: 9px 10px;
  border-radius: 8px;
  background: rgb(255 252 242 / 62%);
  color: var(--ink-dark);
  font-size: 13px;
}

.system-status__logs strong {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.system-status__logs span {
  color: var(--ink-muted);
  font-family: var(--ink-font-number);
}

.system-status__logs .is-warn {
  border-left: 3px solid var(--ink-ochre);
}

.system-status__logs .is-info {
  border-left: 3px solid var(--ink-cyan);
}

.system-status__logs .is-error {
  border-left: 3px solid var(--ink-cinnabar);
}
</style>
