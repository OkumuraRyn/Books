<template>
  <Transition name="slide">
    <div v-if="response || loading" class="ai-panel">
      <div class="ai-header">
        <span><Icon name="ai" /> AI 助手</span>
        <Icon name="close" class="close-btn" @click="$emit('close')" />
      </div>
      <div class="ai-content">
        <div v-if="loading" class="loading">分析中...</div>
        <div v-else class="result">{{ response }}</div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import Icon from './Icon.vue'

defineProps(['response', 'loading'])
defineEmits(['close'])
</script>

<style scoped>
.ai-panel {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 340px;
  max-width: calc(100vw - 40px);
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.2);
  z-index: 1000;
  overflow: hidden;
}
.ai-header {
  padding: 12px 16px;
  background: var(--primary);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
}
.ai-header .close-btn {
  cursor: pointer;
  color: white;
}
.ai-content {
  padding: 16px;
  max-height: 350px;
  overflow-y: auto;
  font-size: 14px;
  line-height: 1.5;
}
.loading {
  color: var(--text-color);
  opacity: 0.7;
  font-style: italic;
}
.result {
  white-space: pre-wrap;
}
.slide-enter-active, .slide-leave-active {
  transition: transform 0.2s ease, opacity 0.2s;
}
.slide-enter-from, .slide-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
