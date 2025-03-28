<script setup>
import { ref, computed, onMounted } from 'vue';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import mermaid from 'mermaid';
import katex from 'katex';
import 'katex/dist/katex.min.css';

// 接收markdown内容
const props = defineProps({
  markdown: {
    type: String,
    required: true
  }
});

// 初始化markdown-it实例
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs language-${lang}"><code>${hljs.highlight(str, { language: lang }).value}</code></pre>`;
      } catch (__) {}
    }
    return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`;
  }
});

// 扩展markdown-it以支持数学公式
md.use(require('markdown-it-texmath'), {
  engine: katex,
  delimiters: 'dollars',
  katexOptions: { macros: { '\\RR': '\\mathbb{R}' } }
});

// 扩展markdown-it以支持表格
md.use(require('markdown-it-table'));

// 扩展markdown-it以支持任务列表
md.use(require('markdown-it-task-lists'));

// 渲染markdown内容
const renderedContent = computed(() => {
  return md.render(props.markdown);
});

onMounted(() => {
  // 初始化mermaid
  mermaid.initialize({
    startOnLoad: true,
    theme: 'neutral',
    securityLevel: 'loose',
  });
  
  // 在DOM更新后处理流程图
  setTimeout(() => {
    const elements = document.querySelectorAll('.mermaid');
    mermaid.init(undefined, elements);
  }, 100);
});
</script>

<template>
  <div class="markdown-content visionos-style" v-html="renderedContent"></div>
</template>

<style>
.markdown-content.visionos-style {
  font-size: 16px;
  line-height: 1.6;
}

/* 标题样式 */
.visionos-style h1,
.visionos-style h2,
.visionos-style h3,
.visionos-style h4,
.visionos-style h5,
.visionos-style h6 {
  margin-top: 1.5em;
  margin-bottom: 0.75em;
  font-weight: 500;
  line-height: 1.2;
}

.visionos-style h1 {
  font-size: 2em;
  color: var(--accent-color);
}

.visionos-style h2 {
  font-size: 1.75em;
  border-bottom: 1px solid var(--border-light);
  padding-bottom: 0.3em;
}

.visionos-style h3 {
  font-size: 1.5em;
}

.visionos-style h4 {
  font-size: 1.25em;
}

/* 段落样式 */
.visionos-style p {
  margin-bottom: 1em;
}

/* 列表样式 */
.visionos-style ul,
.visionos-style ol {
  margin-bottom: 1em;
  padding-left: 2em;
}

.visionos-style li {
  margin-bottom: 0.5em;
}

/* 代码块样式 */
.visionos-style pre {
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 12px;
  padding: 16px;
  overflow-x: auto;
  margin-bottom: 1em;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
}

.dark-mode .visionos-style pre {
  background-color: rgba(0, 0, 0, 0.3);
}

/* 内联代码样式 */
.visionos-style code:not(.hljs) {
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  padding: 0.2em 0.4em;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
}

.dark-mode .visionos-style code:not(.hljs) {
  background-color: rgba(255, 255, 255, 0.1);
}

/* 表格样式 */
.visionos-style table {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 1em;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.visionos-style th,
.visionos-style td {
  border: 1px solid var(--border-light);
  padding: 10px 16px;
  text-align: left;
}

.visionos-style th {
  background-color: rgba(0, 0, 0, 0.03);
  font-weight: 500;
}

.dark-mode .visionos-style th {
  background-color: rgba(255, 255, 255, 0.05);
}

.dark-mode .visionos-style th,
.dark-mode .visionos-style td {
  border-color: var(--border-dark);
}

/* 引用样式 */
.visionos-style blockquote {
  border-left: 4px solid var(--accent-color);
  padding-left: 1em;
  margin-left: 0;
  margin-bottom: 1em;
  color: rgba(60, 60, 67, 0.75);
}

.dark-mode .visionos-style blockquote {
  color: rgba(235, 235, 245, 0.75);
}

/* 水平线样式 */
.visionos-style hr {
  height: 1px;
  border: none;
  background-color: var(--border-light);
  margin: 2em 0;
}

.dark-mode .visionos-style hr {
  background-color: var(--border-dark);
}

/* 图片样式 */
.visionos-style img {
  max-width: 100%;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  margin: 1em 0;
}

/* 链接样式 */
.visionos-style a {
  color: var(--accent-color);
  text-decoration: none;
  transition: opacity 0.2s;
}

.visionos-style a:hover {
  opacity: 0.8;
}

/* 任务列表样式 */
.visionos-style .task-list-item {
  list-style-type: none;
  margin-left: -2em;
}

.visionos-style .task-list-item input {
  margin-right: 0.5em;
}

/* 流程图样式 */
.visionos-style .mermaid {
  background: rgba(255, 255, 255, 0.5);
  padding: 20px;
  border-radius: 12px;
  margin: 1em 0;
  text-align: center;
}

.dark-mode .visionos-style .mermaid {
  background: rgba(40, 40, 40, 0.5);
}
</style>
