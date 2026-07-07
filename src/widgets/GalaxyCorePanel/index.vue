<template>
  <div class="galaxy-core" aria-label="中心数据星河图">
    <div class="galaxy-core__starfield" aria-hidden="true" />
    <div class="galaxy-core__nebula" aria-hidden="true" />
    <div class="galaxy-core__stream galaxy-core__stream--a" aria-hidden="true" />
    <div class="galaxy-core__stream galaxy-core__stream--b" aria-hidden="true" />
    <div class="galaxy-core__stream galaxy-core__stream--c" aria-hidden="true" />

    <div class="galaxy-core__center">
      <span>Data Tide</span>
      <strong>{{ healthScore }}%</strong>
      <em>教学数据星河</em>
    </div>

    <div
      v-for="node in tideNodes"
      :key="node.name"
      class="galaxy-core__chip"
      :style="{
        left: `${node.x}%`,
        top: `${node.y}%`,
        '--node-delay': `${node.delay}ms`,
        '--node-rotate': `${node.rotate}deg`,
      }"
    >
      <strong>{{ node.name }}</strong>
      <span>{{ node.value }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CategoryPoint, RegionPoint } from '@/features/dashboard/model/dashboard'

const props = defineProps<{
  regions: RegionPoint[]
  chartUsage: CategoryPoint[]
  healthScore: number
}>()

const tideLayout = [
  { x: 23, y: 28, delay: 0, rotate: -7 },
  { x: 38, y: 18, delay: 120, rotate: 4 },
  { x: 72, y: 27, delay: 240, rotate: 7 },
  { x: 78, y: 61, delay: 360, rotate: -5 },
  { x: 54, y: 82, delay: 480, rotate: 3 },
  { x: 25, y: 70, delay: 600, rotate: -6 },
]

const tideNodes = computed(() => {
  const regionNodes = props.regions.slice(0, 4).map((item) => ({
    name: item.name,
    value: item.value,
  }))
  const chartNodes = props.chartUsage.slice(0, 2).map((item) => ({
    name: item.name,
    value: item.value,
  }))

  return [...regionNodes, ...chartNodes].map((item, index) => ({
    ...item,
    ...tideLayout[index],
  }))
})
</script>

<style scoped>
.galaxy-core {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 0;
  overflow: hidden;
  border-radius: 8px;
  background:
    radial-gradient(circle at 44% 48%, rgb(47 143 138 / 18%), transparent 10%),
    radial-gradient(ellipse at 55% 48%, rgb(93 154 178 / 16%), transparent 34%),
    radial-gradient(ellipse at 42% 56%, rgb(185 139 74 / 10%), transparent 42%),
    radial-gradient(circle at 48% 52%, rgb(255 255 255 / 72%), transparent 60%);
}

.galaxy-core__starfield {
  position: absolute;
  inset: -12%;
  background:
    radial-gradient(circle at 30% 24%, rgb(47 143 138 / 34%) 0 1px, transparent 2px),
    radial-gradient(circle at 70% 66%, rgb(37 72 95 / 26%) 0 1px, transparent 2px),
    radial-gradient(circle at 44% 76%, rgb(185 139 74 / 26%) 0 1px, transparent 2px),
    radial-gradient(circle at 58% 42%, rgb(47 143 138 / 18%) 0 1px, transparent 2px);
  background-size:
    78px 78px,
    116px 116px,
    96px 96px,
    52px 52px;
  filter: blur(0.2px);
  opacity: 0.86;
  animation: galaxyDrift 24s linear infinite;
}

.galaxy-core__nebula {
  position: absolute;
  inset: 7% 4%;
  border-radius: 50%;
  background:
    conic-gradient(
      from 34deg,
      transparent 0 9%,
      rgb(47 143 138 / 20%) 13%,
      transparent 24%,
      rgb(93 154 178 / 18%) 38%,
      transparent 52%,
      rgb(185 139 74 / 12%) 67%,
      transparent 82% 100%
    );
  filter: blur(12px);
  opacity: 0.82;
  transform: rotate(-10deg) scaleX(1.2);
  animation: galaxyNebulaSweep 18s linear infinite;
}

.galaxy-core__stream {
  position: absolute;
  left: 50%;
  top: 50%;
  border: 1px solid rgb(47 143 138 / 16%);
  border-right-color: transparent;
  border-bottom-color: rgb(185 139 74 / 14%);
  border-radius: 48% 52% 50% 46%;
  box-shadow: 0 0 26px rgb(47 143 138 / 8%);
  transform: translate(-50%, -50%) rotate(var(--stream-rotate)) scaleX(var(--stream-x));
  animation: galaxyStreamFloat var(--stream-time) linear infinite;
}

.galaxy-core__stream--a {
  --stream-rotate: -16deg;
  --stream-x: 1.5;
  --stream-time: 19s;

  width: 72%;
  height: 42%;
}

.galaxy-core__stream--b {
  --stream-rotate: 18deg;
  --stream-x: 1.2;
  --stream-time: 24s;

  width: 58%;
  height: 30%;
  border-color: rgb(37 72 95 / 12%);
  border-left-color: transparent;
}

.galaxy-core__stream--c {
  --stream-rotate: -46deg;
  --stream-x: 1.4;
  --stream-time: 30s;

  width: 86%;
  height: 52%;
  border-color: rgb(93 154 178 / 11%);
  border-top-color: transparent;
}

.galaxy-core__center {
  position: absolute;
  top: 53%;
  left: 48%;
  display: grid;
  width: clamp(116px, 11vw, 152px);
  height: clamp(116px, 11vw, 152px);
  place-items: center;
  padding: 16px;
  border: 1px solid rgb(47 143 138 / 34%);
  border-radius: 34% 66% 39% 61% / 58% 36% 64% 42%;
  background:
    radial-gradient(circle, rgb(255 252 242 / 94%) 0 38%, rgb(47 143 138 / 22%) 39% 42%, rgb(255 252 242 / 72%) 43%),
    var(--ink-card-solid);
  box-shadow:
    0 0 0 10px rgb(47 143 138 / 6%),
    0 0 48px rgb(47 143 138 / 26%),
    var(--ink-shadow);
  color: var(--ink-dark);
  text-align: center;
  transform: translate(-50%, -50%) rotate(-5deg);
  animation: galaxyCoreBreath 5.2s var(--motion-smooth) infinite;
}

.galaxy-core__center span,
.galaxy-core__center em {
  color: var(--ink-blue-soft);
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
}

.galaxy-core__center strong {
  font-family: var(--ink-font-number);
  font-size: clamp(30px, 2.6vw, 42px);
  line-height: 1;
}

.galaxy-core__chip {
  position: absolute;
  display: flex;
  min-width: 86px;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 9px 12px;
  border: 1px solid rgb(47 143 138 / 32%);
  border-radius: 999px;
  background:
    linear-gradient(120deg, rgb(255 252 242 / 86%), rgb(47 143 138 / 16%)),
    var(--ink-card-solid);
  box-shadow:
    0 0 26px rgb(47 143 138 / 16%),
    inset 0 1px 0 rgb(255 255 255 / 78%);
  color: var(--ink-dark);
  transform: translate(-50%, -50%) rotate(var(--node-rotate));
  animation: galaxyNodeFloat 5.4s var(--motion-smooth) infinite;
  animation-delay: var(--node-delay);
}

.galaxy-core__chip strong {
  font-size: 13px;
  line-height: 1.1;
}

.galaxy-core__chip span {
  color: var(--ink-cyan);
  font-family: var(--ink-font-number);
  font-size: 12px;
  font-weight: 700;
}

@keyframes galaxyDrift {
  to {
    transform: rotate(1turn) scale(1.02);
  }
}

@keyframes galaxyNebulaSweep {
  to {
    transform: rotate(350deg) scaleX(1.2);
  }
}

@keyframes galaxyStreamFloat {
  to {
    transform: translate(-50%, -50%) rotate(calc(var(--stream-rotate) + 360deg))
      scaleX(var(--stream-x));
  }
}

@keyframes galaxyCoreBreath {
  50% {
    box-shadow:
      0 0 0 15px rgb(47 143 138 / 8%),
      0 0 60px rgb(47 143 138 / 32%),
      var(--ink-shadow);
  }
}

@keyframes galaxyNodeFloat {
  50% {
    transform: translate(-50%, calc(-50% - 8px)) rotate(var(--node-rotate));
  }
}

@media (width <= 1180px) {
  .galaxy-core {
    min-height: 380px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .galaxy-core__starfield,
  .galaxy-core__nebula,
  .galaxy-core__stream,
  .galaxy-core__center,
  .galaxy-core__chip {
    animation: none;
  }
}
</style>
