<template>
  <section class="panel-shell">
    <header class="panel-shell__header">
      <h2>{{ title }}</h2>
      <span v-if="meta">{{ meta }}</span>
    </header>
    <div class="panel-shell__body">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  meta?: string
}>()
</script>

<style scoped>
.panel-shell {
  position: relative;
  display: flex;
  min-height: 0;
  overflow: hidden;
  flex-direction: column;
  border: 1px solid var(--ink-line);
  border-radius: var(--ink-radius);
  background:
    radial-gradient(circle at 12% 0%, rgb(47 143 138 / 8%), transparent 28%),
    linear-gradient(145deg, rgb(255 255 255 / 94%), rgb(241 246 242 / 82%)),
    var(--ink-card-solid);
  box-shadow:
    var(--ink-shadow),
    inset 0 1px 0 rgb(255 255 255 / 68%);
  backdrop-filter: blur(18px);
  transition:
    transform 180ms ease,
    box-shadow 180ms ease,
    border-color 180ms ease;
}

.panel-shell:hover {
  border-color: rgb(47 143 138 / 28%);
  box-shadow:
    0 22px 52px rgb(37 72 95 / 15%),
    inset 0 1px 0 rgb(255 255 255 / 80%);
  transform: translateY(-1px);
}

.panel-shell::before {
  position: absolute;
  inset: 0 0 auto;
  height: 3px;
  background: linear-gradient(90deg, transparent, var(--ink-cyan), var(--ink-lake), transparent);
  opacity: 0.58;
  content: '';
}

.panel-shell::after {
  position: absolute;
  right: 10px;
  bottom: 10px;
  width: 44px;
  height: 44px;
  border-right: 1px solid rgb(47 143 138 / 18%);
  border-bottom: 1px solid rgb(47 143 138 / 18%);
  opacity: 0.8;
  content: '';
}

.panel-shell__header {
  position: relative;
  display: flex;
  min-height: clamp(42px, 4.7vh, 50px);
  align-items: center;
  justify-content: space-between;
  padding: 0 18px;
  border-bottom: 1px solid rgb(31 50 64 / 8%);
  background: linear-gradient(90deg, rgb(47 143 138 / 8%), transparent);
}

.panel-shell__header h2 {
  margin: 0;
  color: var(--ink-dark);
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0;
}

.panel-shell__header span {
  color: var(--ink-blue-soft);
  font-size: 12px;
  font-weight: 700;
}

.panel-shell__body {
  position: relative;
  min-height: 0;
  flex: 1;
  padding: clamp(10px, 0.78vw, 14px);
}
</style>
