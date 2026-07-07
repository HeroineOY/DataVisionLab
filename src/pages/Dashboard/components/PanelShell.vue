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
  border: 1px solid rgb(125 211 252 / 15%);
  border-radius: 8px;
  background:
    linear-gradient(135deg, rgb(125 211 252 / 10%), transparent 22%),
    linear-gradient(180deg, rgb(255 255 255 / 8%), rgb(255 255 255 / 3%)),
    rgb(9 19 34 / 84%);
  box-shadow:
    0 20px 42px rgb(0 0 0 / 25%),
    inset 0 1px 0 rgb(255 255 255 / 8%);
}

.panel-shell::before {
  position: absolute;
  inset: 0 0 auto;
  height: 2px;
  background: linear-gradient(90deg, transparent, #2dd4bf, #60a5fa, transparent);
  content: '';
}

.panel-shell::after {
  position: absolute;
  right: 10px;
  bottom: 10px;
  width: 44px;
  height: 44px;
  border-right: 1px solid rgb(125 211 252 / 22%);
  border-bottom: 1px solid rgb(125 211 252 / 22%);
  content: '';
}

.panel-shell__header {
  position: relative;
  display: flex;
  min-height: clamp(42px, 4.7vh, 50px);
  align-items: center;
  justify-content: space-between;
  padding: 0 18px;
  border-bottom: 1px solid rgb(255 255 255 / 8%);
  background: linear-gradient(90deg, rgb(96 165 250 / 10%), transparent);
}

.panel-shell__header h2 {
  margin: 0;
  color: #eaf2ff;
  font-size: 16px;
  font-weight: 700;
  text-shadow: 0 0 16px rgb(96 165 250 / 24%);
}

.panel-shell__header span {
  color: #8bd9ff;
  font-size: 12px;
}

.panel-shell__body {
  position: relative;
  min-height: 0;
  flex: 1;
  padding: clamp(10px, 0.78vw, 14px);
}
</style>
