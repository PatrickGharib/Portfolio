import { defineStore } from 'pinia'

export const usePortfolioStore = defineStore('portfolio', {
  state: () => ({
    theme: 'dark', // Always use dark theme
    projects: [
      {
        id: 1,
        title: 'EPES: Seizure Propagation Analysis',
        description: 'An immersive environment for visualizing and analyzing seizure propagation in MRI data, providing neurologists with enhanced diagnostic tools.',
        image: '/images/projects/epes.jpg',
        technologies: ['Unity', 'C#', 'VR', 'Data Visualization'],
        demoUrl: 'https://example.com/epes',
        repoUrl: 'https://github.com/patrickgharib/epes',
        featured: true,
        publicationUrl: 'https://dl.acm.org/doi/10.1145/3343055.3360745'
      },
      {
        id: 2,
        title: 'SIERA: Seismic Information Extended Reality Analytics Tool',
        description: 'A VR platform for seismic and geophysical data visualization, accelerating research insights through immersive data exploration.',
        image: '/images/projects/siera.jpg',
        technologies: ['Unity', 'C#', 'VR', 'Geophysical Data'],
        demoUrl: 'https://example.com/siera',
        repoUrl: 'https://github.com/patrickgharib/siera',
        featured: true,
        publicationUrl: 'https://dl.acm.org/doi/10.1145/3380867.3426223'
      },
      {
        id: 3,
        title: 'Mobile eConsult Platform',
        description: 'Led the migration of a medical eConsult platform to mobile (Android/iOS) using Capacitor, React, and TypeScript, increasing user reach by 40%.',
        image: '/images/projects/econsult.jpg',
        technologies: ['React.js', 'TypeScript', 'Capacitor', 'Firestore'],
        demoUrl: 'https://example.com/econsult',
        repoUrl: 'https://github.com/patrickgharib/econsult',
        featured: true
      },
      {
        id: 4,
        title: 'Fundraising Platform',
        description: 'A comprehensive fundraising platform with PCI-compliant payment processing, user authentication, and role-based access control.',
        image: '/images/projects/fundraising.jpg',
        technologies: ['Vue.js', 'Azure', 'Docker', 'Auth0', 'Datadog'],
        demoUrl: 'https://example.com/fundraising',
        repoUrl: 'https://github.com/patrickgharib/fundraising',
        featured: false
      }
    ],
    skills: [
      {
        category: 'Programming Languages',
        items: [
          { name: 'JavaScript', level: 95 },
          { name: 'TypeScript', level: 90 },
          { name: 'C#', level: 85 },
          { name: 'Python', level: 80 },
          { name: 'Java', level: 75 },
          { name: 'Bash', level: 70 }
        ]
      },
      {
        category: 'Frameworks & Libraries',
        items: [
          { name: 'Vue.js', level: 95 },
          { name: 'React.js', level: 90 },
          { name: 'Capacitor', level: 85 },
          { name: 'Unity', level: 80 }
        ]
      },
      {
        category: 'Cloud & DevOps',
        items: [
          { name: 'Azure', level: 90 },
          { name: 'AWS', level: 85 },
          { name: 'Docker', level: 85 },
          { name: 'GitHub Actions', level: 80 },
          { name: 'Azure DevOps', level: 90 },
          { name: 'CI/CD', level: 85 },
          { name: 'Datadog', level: 80 },
          { name: 'Auth0', level: 85 }
        ]
      },
      {
        category: 'Databases',
        items: [
          { name: 'MySQL', level: 90 },
          { name: 'MariaDB', level: 85 },
          { name: 'MongoDB', level: 85 },
          { name: 'Firestore', level: 80 }
        ]
      }
    ],
    experiences: [
      {
        id: 1,
        company: 'Stride (a Jumbo Interactive Company)',
        position: 'Lead Software Developer / Consultant',
        period: '2023 - 2025',
        description: 'Spearheaded cross-functional teams to deliver mission-critical projects for high-profile fundraising clients, achieving a 95% on-time delivery rate.',
        technologies: ['Vue.js', 'Azure', 'Docker', 'Auth0', 'Datadog']
      },
      {
        id: 2,
        company: 'Stride (a Jumbo Interactive Company)',
        position: 'Senior Software Developer / Consultant',
        period: '2022 - 2023',
        description: 'Delivered high-performance, user-facing Vue.js interfaces, increasing customer engagement and satisfaction across multiple platforms.',
        technologies: ['Vue.js', 'Azure DevOps', 'Docker', 'XUnit', 'Datadog']
      },
      {
        id: 3,
        company: 'Alethea Medical',
        position: 'Software Developer',
        period: '2021 - 2022',
        description: 'Led the migration of the eConsult platform to mobile (Android/iOS) using Capacitor, React, and TypeScript, increasing user reach by 40%.',
        technologies: ['React.js', 'TypeScript', 'Capacitor', 'Firestore', 'CI/CD']
      },
      {
        id: 4,
        company: 'University of Calgary',
        position: 'Junior Software Developer',
        period: '2019 - 2020',
        description: 'Developed an MRI seizure visualization prototype in VR using Unity and C#, providing neurologists with enhanced diagnostic tools.',
        technologies: ['Unity', 'C#', 'VR', 'Data Visualization']
      }
    ],
  }),
  getters: {
    getFeaturedProjects: (state) => state.projects.filter(project => project.featured),
    getProjectById: (state) => (id) => state.projects.find(project => project.id === parseInt(id))
  },
  actions: {
    // No actions needed at this time
  }
})
