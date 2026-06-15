<template>
  <div class="epub-container" ref="viewer"></div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import ePub from 'epubjs'

const props = defineProps(['file'])
const emit = defineEmits(['text-selected'])
const viewer = ref(null)
let rendition = null

async function loadEpub(file) {
  const url = URL.createObjectURL(file)
  const book = ePub(url)
  rendition = book.renderTo(viewer.value, { width: '100%', height: '100%' })
  await rendition.display()
  
  const iframe = viewer.value?.querySelector('iframe')
  if (iframe) {
    iframe.contentDocument?.addEventListener('mouseup', () => {
      const selection = iframe.contentWindow.getSelection()
      const text = selection.toString().trim()
      if (text) emit('text-selected', text)
    })
  }
}

onMounted(() => {
  if (props.file) loadEpub(props.file)
})

watch(() => props.file, (newFile) => {
  if (newFile) loadEpub(newFile)
})
</script>

<style scoped>
.epub-container {
  width: 100%;
  min-height: 500px;
  background: white;
}
</style>
