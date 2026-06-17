<template>
  <div class="pdf-container" ref="container">
    <div v-for="(_, idx) in pages" :key="idx" class="pdf-page">
      <canvas :id="`pdf-canvas-${idx}`"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import * as pdfjsLib from 'pdfjs-dist'

// 使用 unpkg，稳定性更好
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@4.0.379/build/pdf.worker.min.js`
  
const props = defineProps(['data'])
const emit = defineEmits(['text-selected'])

const pages = ref([])
let pdfDoc = null

async function loadPdf(arrayBuffer) {
  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer })
  pdfDoc = await loadingTask.promise
  pages.value = Array.from({ length: pdfDoc.numPages }, (_, i) => i)
  await nextTick()
  renderPages()
}

async function renderPages() {
  for (let i = 0; i < pdfDoc.numPages; i++) {
    const page = await pdfDoc.getPage(i + 1)
    const viewport = page.getViewport({ scale: 1.5 })
    const canvas = document.getElementById(`pdf-canvas-${i}`)
    if (!canvas) continue
    canvas.width = viewport.width
    canvas.height = viewport.height
    const context = canvas.getContext('2d')
    await page.render({ canvasContext: context, viewport }).promise
  }
}

function onMouseUp() {
  const selection = window.getSelection()
  const text = selection.toString().trim()
  if (text) {
    emit('text-selected', text)
    selection.removeAllRanges()
  }
}

onMounted(() => {
  document.addEventListener('mouseup', onMouseUp)
  if (props.data) loadPdf(props.data)
})

watch(() => props.data, (newVal) => {
  if (newVal) loadPdf(newVal)
})
</script>

<style scoped>
.pdf-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pdf-page {
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
canvas {
  max-width: 100%;
  height: auto;
}
</style>
