<template>
  <div class="reader-view" :style="{ fontSize: fontSize + 'px' }">
    <PdfReader 
      v-if="file.type === 'application/pdf'" 
      :data="file.data" 
      @text-selected="onTextSelected"
    />
    <EpubReader 
      v-else-if="file.name.endsWith('.epub')" 
      :file="file.raw" 
      @text-selected="onTextSelected"
    />
    <div v-else class="unsupported">不支持的文件类型</div>
  </div>
</template>

<script setup>
import PdfReader from './PdfReader.vue'
import EpubReader from './EpubReader.vue'
import { tokenizeWithHyphens } from '../services/tokenizer'

const props = defineProps(['file', 'fontSize'])
const emit = defineEmits(['ai-request'])

function onTextSelected(selectedText) {
  if (!selectedText) return
  const words = tokenizeWithHyphens(selectedText)
  if (words.length === 0) return
  const isSingleWord = words.length === 1
  const type = isSingleWord ? 'word' : 'sentence'
  const textForAI = isSingleWord ? words[0] : selectedText
  emit('ai-request', { text: textForAI, type })
}
</script>

<style scoped>
.reader-view {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background: var(--bg-color);
  color: var(--text-color);
  line-height: 1.6;
}
</style>
