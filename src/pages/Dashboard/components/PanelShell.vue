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
  display: flex;
  min-height: 0;
  flex-direction: column;
  border: 1px solid rgb(255 255 255 / 11%);
  border-radius: 8px;
  background:
    linear-gradient(180deg, rgb(255 255 255 / 7%), rgb(255 255 255 / 3%)),
    rgb(9 19 34 / 78%);
  box-shadow: 0 18px 42px rgb(0 0 0 / 24%);
}

.panel-shell__header {
  display: flex;
  min-height: 48px;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  border-bottom: 1px solid rgb(255 255 255 / 8%);
}

.panel-shell__header h2 {
  margin: 0;
  color: #eaf2ff;
  font-size: 16px;
  font-weight: 700;
}

.panel-shell__header span {
  color: #8bd9ff;
  font-size: 12px;
}

.panel-shell__body {
  min-height: 0;
  flex: 1;
  padding: 14px;
}
</style>
