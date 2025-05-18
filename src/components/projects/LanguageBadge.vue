<script setup>
import { computed } from 'vue';
import '../../assets/styles/components/projects/LanguageBadge.css';

const props = defineProps({
  language: {
    type: String,
    required: true
  }
});

// Normalize language name for CSS class
const languageClass = computed(() => {
  const normalized = props.language.toLowerCase()
    .replace(/\s+/g, '')
    .replace(/\./g, '')
    .replace(/\#/g, 'sharp');
  
  return normalized;
});

// Format language name for display
const displayName = computed(() => {
  // Special case formatting
  const specialCases = {
    'csharp': 'C#',
    'cplusplus': 'C++',
    'objectivec': 'Objective-C',
    'javascript': 'JavaScript',
    'typescript': 'TypeScript',
    'html': 'HTML',
    'css': 'CSS',
    'scss': 'SCSS',
    'sass': 'Sass'
  };
  
  const normalized = languageClass.value;
  
  if (specialCases[normalized]) {
    return specialCases[normalized];
  }
  
  // Capitalize first letter
  return props.language.charAt(0).toUpperCase() + props.language.slice(1);
});
</script>

<template>
  <span class="language-badge" :class="languageClass">
    {{ displayName }}
  </span>
</template>
