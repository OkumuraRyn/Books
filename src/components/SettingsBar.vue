<template>
  <div class="settings-bar">
    <Icon :name="isDark ? 'sun' : 'moon'" class="icon-btn" @click="toggleDark" />
    <div class="font-controls">
      <Icon name="font-minus" class="icon-btn" @click="decreaseFont" />
      <span class="font-size">{{ fontSize }}px</span>
      <Icon name="font-plus" class="icon-btn" @click="increaseFont" />
    </div>
  </div>
</template>

<script setup>
import Icon from './Icon.vue'

const props = defineProps({
  fontSize: Number,
  isDark: Boolean
})
const emit = defineEmits(['update:fontSize', 'update:isDark'])

function toggleDark() {
  emit('update:isDark', !props.isDark)
}
function increaseFont() {
  emit('update:fontSize', Math.min(props.fontSize + 2, 32))
}
function decreaseFont() {
  emit('update:fontSize', Math.max(props.fontSize - 2, 12))
}
</script>

<style scoped>
.settings-bar {
  padding: 12px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
  background: var(--bg-color);
}
.font-controls {
  display: flex;
  align-items: center;
  gap: 12px;
}
.font-size {
  font-size: 14px;
  min-width: 45px;
  text-align: center;
  color: var(--text-color);
}
.icon-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-color);
  padding: 6px;
  border-radius: 6px;
  transition: background 0.2s;
}
.icon-btn:hover {
  background: var(--border-color);
}
</style>
