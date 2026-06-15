<template>
  <component :is="iconComponent" v-bind="$attrs" class="svg-icon" />
</template>

<script setup>
import { computed, defineAsyncComponent } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  }
})

// 使用 Vite 的 glob 导入建立索引
const iconModules = import.meta.glob('../assets/icons/*.svg')

const iconComponent = computed(() => {
  const path = `../assets/icons/${props.name}.svg`
  if (iconModules[path]) {
    return defineAsyncComponent(iconModules[path])
  }
  console.warn(`Icon "${props.name}" not found`)
  return null
})
</script>

<style>
.svg-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.svg-icon svg {
  width: 1.2em;
  height: 1.2em;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}
</style>
