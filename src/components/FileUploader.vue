<template>
  <div class="uploader">
    <label class="upload-btn">
      <Icon name="upload" />
      <span>上传文件</span>
      <input type="file" accept=".pdf,.epub" @change="onFileChange" hidden />
    </label>
    <span v-if="fileName" class="file-name">{{ fileName }}</span>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Icon from './Icon.vue'

const emit = defineEmits(['file-loaded'])
const fileName = ref('')

function onFileChange(e) {
  const file = e.target.files[0]
  if (!file) return
  fileName.value = file.name
  const reader = new FileReader()
  reader.onload = (ev) => {
    emit('file-loaded', {
      name: file.name,
      type: file.type,
      data: ev.target.result,
      raw: file
    })
  }
  reader.readAsArrayBuffer(file)
}
</script>

<style scoped>
.uploader {
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  gap: 16px;
}
.upload-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--primary);
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background 0.2s;
}
.upload-btn:hover {
  background: var(--primary-hover);
}
.file-name {
  color: var(--text-color);
  font-size: 14px;
  opacity: 0.7;
}
</style>
