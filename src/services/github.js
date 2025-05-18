/**
 * GitHub API service
 * Provides functions to interact with the GitHub API
 */

/**
 * Fetches public repositories for a GitHub user
 * @param {string} username - GitHub username
 * @returns {Promise<Array>} - Array of repository objects
 */
export const fetchRepositories = async (username = 'PatrickGharib') => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching repositories:', error);
    return [];
  }
};

/**
 * Fetches languages used in a repository
 * @param {string} username - GitHub username
 * @param {string} repoName - Repository name
 * @returns {Promise<Object>} - Object with languages as keys and byte counts as values
 */
export const fetchRepositoryLanguages = async (username = 'PatrickGharib', repoName) => {
  try {
    const response = await fetch(`https://api.github.com/repos/${username}/${repoName}/languages`);
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching languages for ${repoName}:`, error);
    return {};
  }
};
