<template>
  <div class="app" :class="{ dark: isDark }">
    <div class="reader-container">
      <FileUploader @file-loaded="handleFileLoaded" />
      <SettingsBar 
        v-model:fontSize="fontSize" 
        v-model:isDark="isDark" 
      />
      <ReaderView 
        v-if="fileData" 
        :file="fileData" 
        :fontSize="fontSize"
        @ai-request="handleAIRequest"
      />
      <div v-else class="empty-state">
        <Icon name="upload" class="empty-icon" />
        <p>点击上方按钮，上传 PDF 或 EPUB 文件</p>
      </div>
      <AIPanel 
        :response="aiResponse" 
        :loading="aiLoading"
        @close="aiResponse = null"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import FileUploader from './components/FileUploader.vue'
import SettingsBar from './components/SettingsBar.vue'
import ReaderView from './components/ReaderView.vue'
import AIPanel from './components/AIPanel.vue'
import Icon from './components/Icon.vue'
import { callDeepSeek } from './services/aiService'

const fileData = ref(null)
const fontSize = ref(18)
const isDark = ref(false)
const aiResponse = ref(null)
const aiLoading = ref(false)

function handleFileLoaded(file) {
  fileData.value = file
}

async function handleAIRequest({ text, type }) {
  aiLoading.value = true
  try {
    const response = await callDeepSeek(text, type)
    aiResponse.value = response
  } catch (err) {
    aiResponse.value = `错误: ${err.message}`
  } finally {
    aiLoading.value = false
  }
}
</script>

<style>
.empty-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  color: var(--text-color);
  opacity: 0.6;
}
.empty-icon svg {
  width: 64px;
  height: 64px;
  stroke: var(--primary);
}
</style>
