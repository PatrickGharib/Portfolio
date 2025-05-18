<script setup>
import { ref, onMounted } from 'vue';
import ProjectCard from './ProjectCard.vue';
import { fetchRepositories } from '../../services/github';
import '../../assets/styles/components/projects/GithubProjects.css';

const repositories = ref([]);
const isLoading = ref(true);
const error = ref(null);

// Fetch repositories from GitHub
const loadRepositories = async () => {
  isLoading.value = true;
  error.value = null;
  
  try {
    const data = await fetchRepositories();
    
    // Filter out forked repositories (optional)
    repositories.value = data.filter(repo => !repo.fork);
    
    // Sort repositories by last updated date (most recent first)
    repositories.value.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
  } catch (err) {
    console.error('Error loading GitHub repositories:', err);
    error.value = 'Failed to load GitHub repositories. Please try again later.';
  } finally {
    isLoading.value = false;
  }
};

// Retry loading repositories if there was an error
const retryLoading = () => {
  loadRepositories();
};

onMounted(() => {
  loadRepositories();
});
</script>

<template>
  <section class="github-projects">
    <div class="github-projects-header">
      <h2 class="github-projects-title">GitHub Projects</h2>
      <p class="github-projects-description">
        These are my public repositories on GitHub, showcasing various projects and contributions.
      </p>
    </div>
    
    <!-- Loading state -->
    <div v-if="isLoading" class="github-projects-loading">
      <div class="github-projects-loading-spinner"></div>
      <p>Loading repositories from GitHub...</p>
    </div>
    
    <!-- Error state -->
    <div v-else-if="error" class="github-projects-error">
      <div class="github-projects-error-icon">⚠️</div>
      <p class="github-projects-error-message">{{ error }}</p>
      <button @click="retryLoading" class="github-projects-retry">Try Again</button>
    </div>
    
    <!-- Empty state -->
    <div v-else-if="repositories.length === 0" class="github-projects-empty">
      <p>No repositories found.</p>
    </div>
    
    <!-- Repositories grid -->
    <div v-else class="github-projects-grid">
      <ProjectCard 
        v-for="repo in repositories" 
        :key="repo.id" 
        :repository="repo" 
      />
    </div>
  </section>
</template>
