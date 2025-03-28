<script setup>
import { ref, onMounted, watch } from 'vue';
import MarkdownRenderer from './components/MarkdownRenderer.vue';
import exampleMarkdown from './assets/example.md?raw';

const markdown = ref(exampleMarkdown);
const isDarkMode = ref(false);

function toggleDarkMode() {
  isDarkMode.value = !isDarkMode.value;
  document.body.classList.toggle('dark-mode', isDarkMode.value);
}

onMounted(() => {
  document.body.classList.toggle('dark-mode', isDarkMode.value);
});
</script>

<template>
  <div class="app-container" :class="{ 'dark-mode': isDarkMode }">
    <div class="visionos-container">
      <div class="header">
        <h1>VisionOS 风格的 Markdown 查看器</h1>
        <button class="theme-toggle" @click="toggleDarkMode">
          {{ isDarkMode ? '☀️' : '🌙' }}
        </button>
      </div>
      <div class="content-area">
        <MarkdownRenderer :markdown="markdown" />
      </div>
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=SF+Pro+Display:wght@300;400;500;600&display=swap');

:root {
  --background-light: rgba(255, 255, 255, 0.7);
  --background-dark: rgba(30, 30, 30, 0.8);
  --text-light: #333;
  --text-dark: #f1f1f1;
  --accent-color: #0a84ff;
  --border-light: rgba(200, 200, 200, 0.3);
  --border-dark: rgba(80, 80, 80, 0.3);
  --shadow-light: 0 8px 32px rgba(0, 0, 0, 0.08);
  --shadow-dark: 0 8px 32px rgba(0, 0, 0, 0.3);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
}

body {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  transition: background 0.3s ease;
}

body.dark-mode {
  background: linear-gradient(135deg, #2c3e50 0%, #1a1a2e 100%);
}

.app-container {
  min-height: 100vh;
  padding: 20px;
  display: flex;
  justify-content: center;
}

.visionos-container {
  width: 100%;
  max-width: 1200px;
  background: var(--background-light);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 24px;
  box-shadow: var(--shadow-light);
  border: 1px solid var(--border-light);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  color: var(--text-light);
  transition: all 0.3s ease;
}

.dark-mode .visionos-container {
  background: var(--background-dark);
  color: var(--text-dark);
  box-shadow: var(--shadow-dark);
  border: 1px solid var(--border-dark);
}

.header {
  padding: 20px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border-light);
}

.dark-mode .header {
  border-bottom: 1px solid var(--border-dark);
}

.header h1 {
  font-weight: 500;
  font-size: 24px;
}

.theme-toggle {
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
}

.theme-toggle:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.dark-mode .theme-toggle:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.content-area {
  padding: 30px;
  overflow-y: auto;
  height: calc(100vh - 100px);
}
</style>
