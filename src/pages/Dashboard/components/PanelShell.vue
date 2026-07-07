<template>
  <section class="panel-shell" :class="variant ? `panel-shell--${variant}` : undefined">
    <span class="panel-shell__mist" aria-hidden="true" />
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
  variant?: 'focus'
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
  transform-origin: center;
  transition:
    transform 360ms var(--motion-bounce),
    box-shadow 360ms var(--motion-smooth),
    border-color 240ms ease,
    filter 240ms ease;
  will-change: transform;
}

.panel-shell:hover {
  border-color: rgb(47 143 138 / 28%);
  box-shadow:
    0 22px 52px rgb(37 72 95 / 15%),
    inset 0 1px 0 rgb(255 255 255 / 80%);
  animation: inkCardBounce 420ms var(--motion-bounce) both;
}

.panel-shell--focus {
  z-index: 1;
  overflow: visible;
}

.panel-shell--focus:hover {
  z-index: 6;
  border-color: rgb(47 143 138 / 40%);
  box-shadow:
    0 30px 78px rgb(37 72 95 / 22%),
    0 0 70px rgb(47 143 138 / 16%),
    inset 0 1px 0 rgb(255 255 255 / 86%);
  animation: inkFocusBounce 560ms var(--motion-bounce) both;
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

.panel-shell__mist {
  position: absolute;
  inset: -18% -12%;
  z-index: 0;
  pointer-events: none;
  background:
    radial-gradient(circle at 30% 42%, rgb(47 143 138 / 18%), transparent 26%),
    radial-gradient(circle at 70% 58%, rgb(93 154 178 / 14%), transparent 28%),
    linear-gradient(110deg, transparent 8%, rgb(255 255 255 / 20%) 34%, transparent 62%);
  background-size:
    120% 120%,
    130% 130%,
    220% 100%;
  filter: blur(16px);
  opacity: 0;
  transform: translate3d(-4%, 3%, 0) scale(0.96);
  transition:
    opacity 520ms var(--motion-smooth),
    transform 720ms var(--motion-smooth),
    background-position 900ms var(--motion-smooth);
}

.panel-shell--focus:hover .panel-shell__mist {
  background-position:
    12% 18%,
    88% 62%,
    100% 0;
  opacity: 1;
  transform: translate3d(0, 0, 0) scale(1.08);
}

.panel-shell__header {
  position: relative;
  z-index: 1;
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
  z-index: 1;
  min-height: 0;
  flex: 1;
  padding: clamp(10px, 0.78vw, 14px);
}

@media (width <= 1180px) {
  .panel-shell:hover,
  .panel-shell--focus:hover {
    animation: inkCardBounceCompact 360ms var(--motion-bounce) both;
  }
}

@media (prefers-reduced-motion: reduce) {
  .panel-shell,
  .panel-shell:hover,
  .panel-shell--focus:hover {
    animation: none;
    transform: none;
  }

  .panel-shell__mist {
    display: none;
  }
}
</style>
