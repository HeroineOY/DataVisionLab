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
  grid-template-rows: auto 1fr;
  gap: 14px;
}

.system-status__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.system-status__grid div {
  padding: 12px;
  border: 1px solid rgb(255 255 255 / 9%);
  border-radius: 8px;
  background: rgb(255 255 255 / 5%);
}

.system-status__grid span {
  display: block;
  color: #a9bad6;
  font-size: 12px;
}

.system-status__grid strong {
  display: block;
  margin-top: 7px;
  color: #f8fbff;
  font-size: 20px;
}

.system-status__logs {
  display: grid;
  align-content: start;
  gap: 9px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.system-status__logs li {
  display: grid;
  grid-template-columns: 72px 1fr;
  gap: 10px;
  padding: 10px;
  border-radius: 8px;
  background: rgb(255 255 255 / 5%);
  color: #d9e7ff;
  font-size: 13px;
}

.system-status__logs span {
  color: #91a6c5;
}

.system-status__logs .is-warn {
  border-left: 3px solid #f59e0b;
}

.system-status__logs .is-info {
  border-left: 3px solid #2dd4bf;
}

.system-status__logs .is-error {
  border-left: 3px solid #fb7185;
}
</style>
