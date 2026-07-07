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

        <PanelShell title="学习访问与实验完成趋势" meta="Weekly trend">
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
  min-height: 100vh;
  padding: clamp(14px, 1vw, 20px);
  overflow: hidden;
  background:
    linear-gradient(rgb(96 165 250 / 4%) 1px, transparent 1px),
    linear-gradient(90deg, rgb(96 165 250 / 4%) 1px, transparent 1px),
    radial-gradient(circle at 18% 12%, rgb(45 212 191 / 18%), transparent 26%),
    radial-gradient(circle at 78% 8%, rgb(245 158 11 / 12%), transparent 24%),
    radial-gradient(circle at 50% 92%, rgb(96 165 250 / 10%), transparent 32%),
    linear-gradient(135deg, #07111f 0%, #0c1728 46%, #111827 100%);
  background-size:
    32px 32px,
    32px 32px,
    auto,
    auto,
    auto,
    auto;
  color: #f8fbff;
}

.dashboard-page::before {
  position: fixed;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(180deg, rgb(255 255 255 / 5%), transparent 18%, rgb(0 0 0 / 16%));
  content: '';
}

.dashboard-header {
  position: relative;
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
  color: #f8fbff;
  font-size: clamp(25px, 1.7vw, 34px);
  font-weight: 800;
  text-shadow: 0 0 28px rgb(45 212 191 / 28%);
}

.dashboard-header__eyebrow {
  margin: 0;
  color: #8bd9ff;
  font-size: 13px;
  text-transform: uppercase;
}

.dashboard-header__status {
  display: grid;
  min-width: 240px;
  justify-items: end;
  gap: 6px;
  padding: 10px 14px;
  border: 1px solid rgb(141 220 255 / 18%);
  border-radius: 8px;
  background: rgb(9 19 34 / 58%);
}

.dashboard-header__status span {
  color: #a3e635;
  font-size: 13px;
}

.dashboard-header__status strong {
  color: #e7eefc;
  font-size: 20px;
}

.dashboard-content {
  position: relative;
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

.dashboard-grid {
  display: grid;
  min-height: 0;
  grid-template:
    "map trend donut" minmax(0, 1fr)
    "health bar ranking" minmax(0, 1fr)
    / minmax(300px, 0.92fr) minmax(520px, 1.56fr) minmax(340px, 1.04fr);
  gap: clamp(12px, 1vw, 16px);
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
  border: 1px solid rgb(255 255 255 / 10%);
  border-radius: 8px;
  background: rgb(9 19 34 / 72%);
  color: #dbeafe;
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
