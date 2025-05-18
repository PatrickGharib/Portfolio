<script setup>
import { ref, onMounted } from 'vue';
import LanguageBadge from './LanguageBadge.vue';
import { fetchRepositoryLanguages } from '../../services/github';
import '../../assets/styles/components/projects/ProjectCard.css';

const props = defineProps({
  repository: {
    type: Object,
    required: true
  }
});

const languages = ref([]);
const isLoadingLanguages = ref(false);
const languageError = ref(null);

// Format date to be more readable
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Load languages for the repository
const loadLanguages = async () => {
  if (!props.repository || !props.repository.name) return;
  
  isLoadingLanguages.value = true;
  languageError.value = null;
  
  try {
    const languagesData = await fetchRepositoryLanguages('PatrickGharib', props.repository.name);
    languages.value = Object.keys(languagesData);
  } catch (error) {
    console.error(`Error loading languages for ${props.repository.name}:`, error);
    languageError.value = 'Failed to load languages';
  } finally {
    isLoadingLanguages.value = false;
  }
};

// Truncate description if it's too long
const truncateDescription = (description, maxLength = 150) => {
  if (!description) return 'No description provided';
  if (description.length <= maxLength) return description;
  return `${description.substring(0, maxLength).trim()}...`;
};

onMounted(() => {
  loadLanguages();
});
</script>

<template>
  <div class="project-card">
    <div class="project-card-header">
      <h3 class="project-card-title">
        {{ repository.name }}
      </h3>
    </div>
    
    <p class="project-card-description">
      {{ truncateDescription(repository.description) }}
    </p>
    
    <div class="project-card-footer">
      <div v-if="isLoadingLanguages" class="project-card-languages">
        Loading languages...
      </div>
      <div v-else-if="languageError" class="project-card-error-message">
        {{ languageError }}
      </div>
      <div v-else class="project-card-languages">
        <LanguageBadge 
          v-for="language in languages" 
          :key="language" 
          :language="language" 
        />
      </div>
      
      <div class="project-card-meta">
        <div class="project-card-updated">
          Updated: {{ formatDate(repository.updated_at) }}
        </div>
      </div>
    </div>
  </div>
</template>
