<template>
  <main class="dashboard-page">
    <header class="dashboard-header">
      <div>
        <p class="dashboard-header__eyebrow">Teaching Data Visualization Platform</p>
        <h1>DataVisionLab 数据可视化实验室</h1>
      </div>
      <div class="dashboard-header__status">
        <span>Mock 数据源</span>
        <strong>{{ currentTime }}</strong>
      </div>
    </header>

    <section v-if="store.loading" class="dashboard-loading">数据大屏加载中...</section>

    <section v-else-if="store.data" class="dashboard-content">
      <div class="dashboard-metrics">
        <StatisticCard v-for="metric in store.coreMetrics" :key="metric.label" :metric="metric" />
      </div>

      <div class="dashboard-grid">
        <PanelShell title="区域学习热力" meta="Regional distribution">
          <MapPanel :regions="store.data.regions" />
        </PanelShell>

        <PanelShell title="学习访问与实验完成趋势" meta="Weekly trend" variant="focus">
          <TrendChart :points="store.data.learningTrend" />
        </PanelShell>

        <PanelShell title="图表类型占比" meta="Chart usage">
          <DonutChart :items="store.data.chartUsage" />
        </PanelShell>

        <PanelShell title="课程模块掌握度" meta="Module mastery">
          <BarChartPanel :items="store.data.courseDistribution" />
        </PanelShell>

        <PanelShell title="热门学习任务排行" meta="Top tasks">
          <RankingBoard :items="store.data.ranking" />
        </PanelShell>

        <PanelShell title="系统运行状态" meta="Quality & logs">
          <div class="dashboard-health">
            <GaugePanel :score="store.data.health.score" />
            <SystemStatusPanel :health="store.data.health" :logs="store.data.logs" />
          </div>
        </PanelShell>
      </div>
    </section>

    <section v-else class="dashboard-loading">{{ store.error ?? '暂无数据' }}</section>
  </main>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useDashboardStore } from '@/app/stores/dashboardStore'
import BarChartPanel from '@/widgets/BarChartPanel/index.vue'
import DonutChart from '@/widgets/DonutChart/index.vue'
import GaugePanel from '@/widgets/GaugePanel/index.vue'
import MapPanel from '@/widgets/MapPanel/index.vue'
import RankingBoard from '@/widgets/RankingBoard/index.vue'
import StatisticCard from '@/widgets/StatisticCard/index.vue'
import TrendChart from '@/widgets/TrendChart/index.vue'
import { formatDashboardTime } from '@/shared/utils/time'
import PanelShell from './components/PanelShell.vue'
import SystemStatusPanel from './components/SystemStatusPanel.vue'

const store = useDashboardStore()
const currentTime = ref(formatDashboardTime())
let clockTimer: number | undefined

onMounted(() => {
  store.loadDashboard()
  clockTimer = window.setInterval(() => {
    currentTime.value = formatDashboardTime()
  }, 1000)
})

onBeforeUnmount(() => {
  if (clockTimer) {
    window.clearInterval(clockTimer)
  }
})
</script>

<style scoped>
.dashboard-page {
  position: relative;
  isolation: isolate;
  min-height: 100vh;
  padding: clamp(14px, 1vw, 20px);
  overflow: hidden;
  background:
    radial-gradient(circle at 16% 18%, rgb(47 143 138 / 12%), transparent 24%),
    radial-gradient(circle at 82% 8%, rgb(93 154 178 / 16%), transparent 24%),
    radial-gradient(circle at 42% 86%, rgb(83 116 137 / 10%), transparent 34%),
    linear-gradient(120deg, rgb(255 255 255 / 54%), transparent 38%),
    linear-gradient(135deg, var(--ink-paper-soft) 0%, var(--ink-paper) 46%, #e5ece7 100%);
  background-size:
    auto,
    auto,
    auto,
    auto,
    auto;
  color: var(--ink-text);
}

.dashboard-page::before {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background:
    linear-gradient(rgb(31 50 64 / 3%) 1px, transparent 1px),
    linear-gradient(90deg, rgb(31 50 64 / 2.5%) 1px, transparent 1px),
    radial-gradient(circle at 8% 18%, rgb(31 50 64 / 10%) 0 1px, transparent 1px),
    radial-gradient(circle at 68% 32%, rgb(31 50 64 / 8%) 0 1px, transparent 1px);
  background-size:
    34px 34px,
    34px 34px,
    9px 9px,
    13px 13px;
  mix-blend-mode: multiply;
  opacity: 0.58;
  content: '';
}

.dashboard-page::after {
  position: fixed;
  right: -4vw;
  bottom: -6vh;
  left: -4vw;
  height: 38vh;
  pointer-events: none;
  z-index: 0;
  background:
    linear-gradient(165deg, transparent 14%, rgb(37 72 95 / 8%) 14% 22%, transparent 22%),
    linear-gradient(150deg, transparent 22%, rgb(15 31 43 / 11%) 22% 33%, transparent 33%),
    linear-gradient(135deg, transparent 30%, rgb(83 116 137 / 9%) 30% 43%, transparent 43%),
    linear-gradient(180deg, transparent, rgb(255 252 242 / 70%));
  filter: blur(0.2px);
  opacity: 0.52;
  content: '';
}

.dashboard-header {
  position: relative;
  z-index: 1;
  display: flex;
  min-height: clamp(58px, 6.7vh, 74px);
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: clamp(10px, 1vh, 14px);
  padding: 0 4px;
}

.dashboard-header h1 {
  margin: 6px 0 0;
  color: var(--ink-dark);
  font-size: clamp(25px, 1.7vw, 34px);
  font-weight: 800;
  letter-spacing: 0;
  text-shadow: 0 10px 32px rgb(37 72 95 / 12%);
}

.dashboard-header__eyebrow {
  margin: 0;
  color: var(--ink-blue-soft);
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
}

.dashboard-header__status {
  display: grid;
  min-width: 240px;
  justify-items: end;
  gap: 6px;
  padding: 10px 16px;
  border: 1px solid var(--ink-line);
  border-radius: 8px;
  background:
    linear-gradient(135deg, rgb(255 255 255 / 72%), rgb(235 242 238 / 56%)),
    var(--ink-card);
  box-shadow: var(--ink-shadow-soft);
  backdrop-filter: blur(18px);
}

.dashboard-header__status span {
  color: var(--ink-jade);
  font-size: 13px;
  font-weight: 700;
}

.dashboard-header__status strong {
  color: var(--ink-dark);
  font-family: var(--ink-font-number);
  font-size: 20px;
}

.dashboard-content {
  position: relative;
  z-index: 1;
  display: grid;
  height: calc(100vh - clamp(58px, 6.7vh, 74px) - clamp(10px, 1vh, 14px) - clamp(28px, 2vw, 40px));
  grid-template-rows: clamp(84px, 10vh, 108px) minmax(0, 1fr);
  gap: clamp(12px, 1vw, 16px);
}

.dashboard-metrics {
  display: grid;
  grid-template-columns: repeat(4, minmax(180px, 1fr));
  gap: clamp(12px, 1vw, 16px);
  min-height: 0;
}

.dashboard-metrics > * {
  animation: inkRise 480ms ease both;
}

.dashboard-grid {
  display: grid;
  min-height: 0;
  grid-template:
    "map trend donut" minmax(0, 1fr)
    "health bar ranking" minmax(0, 1fr)
    / minmax(300px, 0.92fr) minmax(520px, 1.56fr) minmax(340px, 1.04fr);
  gap: clamp(12px, 1vw, 16px);
}

.dashboard-grid > * {
  animation: inkRise 560ms ease both;
}

.dashboard-grid > :nth-child(2),
.dashboard-grid > :nth-child(5) {
  animation-delay: 80ms;
}

.dashboard-grid > :nth-child(3),
.dashboard-grid > :nth-child(6) {
  animation-delay: 140ms;
}

.dashboard-grid:has(.panel-shell--focus:hover) > .panel-shell:not(.panel-shell--focus) {
  filter: saturate(0.92) brightness(0.98);
}

.dashboard-grid > :nth-child(1) {
  grid-area: map;
}

.dashboard-grid > :nth-child(2) {
  grid-area: trend;
}

.dashboard-grid > :nth-child(3) {
  grid-area: donut;
}

.dashboard-grid > :nth-child(4) {
  grid-area: bar;
}

.dashboard-grid > :nth-child(5) {
  grid-area: ranking;
}

.dashboard-grid > :nth-child(6) {
  grid-area: health;
}

.dashboard-health {
  display: grid;
  height: 100%;
  min-height: 0;
  grid-template-columns: minmax(110px, 0.34fr) minmax(0, 1fr);
  gap: 12px;
}

.dashboard-loading {
  display: grid;
  min-height: 620px;
  place-items: center;
  border: 1px solid var(--ink-line);
  border-radius: 8px;
  background: var(--ink-card);
  color: var(--ink-text-soft);
  box-shadow: var(--ink-shadow);
}

.dashboard-loading::before {
  width: 34px;
  height: 34px;
  margin-right: 10px;
  border: 2px solid rgb(47 143 138 / 16%);
  border-top-color: var(--ink-cyan);
  border-radius: 50%;
  animation: inkSpin 0.9s linear infinite;
  content: '';
}

@keyframes inkSpin {
  to {
    transform: rotate(1turn);
  }
}

@keyframes inkRise {
  from {
    opacity: 0;
    transform: translateY(8px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (width <= 1180px) {
  .dashboard-page {
    overflow: auto;
  }

  .dashboard-content {
    height: auto;
    grid-template-rows: auto auto;
  }

  .dashboard-metrics,
  .dashboard-grid {
    grid-template: none;
    grid-template-columns: repeat(2, minmax(260px, 1fr));
  }

  .dashboard-grid > :nth-child(n) {
    grid-area: auto;
    min-height: 330px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .dashboard-metrics > *,
  .dashboard-grid > * {
    animation: none;
  }

  .dashboard-grid:has(.panel-shell--focus:hover) > .panel-shell:not(.panel-shell--focus) {
    filter: none;
  }
}

@media (width <= 760px) {
  .dashboard-page {
    padding: 14px;
  }

  .dashboard-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .dashboard-header__status {
    justify-items: start;
  }

  .dashboard-metrics,
  .dashboard-grid {
    grid-template-columns: 1fr;
  }

  .dashboard-health {
    grid-template-columns: 1fr;
  }
}
</style>
