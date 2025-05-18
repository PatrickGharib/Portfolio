import { defineStore } from 'pinia'

export const usePortfolioStore = defineStore('portfolio', {
  state: () => ({
    theme: 'light',
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
    blogPosts: [
      {
        id: 1,
        title: 'Optimizing Vue.js Performance',
        date: '2023-04-15',
        summary: 'Techniques for improving the performance of your Vue.js applications.',
        content: `
          <h2>Optimizing Vue.js Performance</h2>
          <p>Performance optimization is crucial for providing a smooth user experience in web applications. In this post, I'll share some techniques I've used to optimize Vue.js applications.</p>
          <h3>1. Use Computed Properties Wisely</h3>
          <p>Computed properties are cached based on their dependencies, making them more efficient than methods for operations you need to perform repeatedly.</p>
          <h3>2. Implement Lazy Loading</h3>
          <p>Lazy loading components and routes can significantly reduce the initial load time of your application.</p>
          <h3>3. Virtual Scrolling for Long Lists</h3>
          <p>When dealing with long lists, virtual scrolling can dramatically improve performance by only rendering items that are visible to the user.</p>
        `,
        tags: ['Vue.js', 'Performance', 'Frontend']
      },
      {
        id: 2,
        title: 'Building Scalable Backend Services',
        date: '2023-02-22',
        summary: 'Strategies for designing backend services that can scale with your application.',
        content: `
          <h2>Building Scalable Backend Services</h2>
          <p>As applications grow, the ability to scale becomes increasingly important. Here are some strategies I've employed for building scalable backend services.</p>
          <h3>1. Microservices Architecture</h3>
          <p>Breaking down your application into smaller, focused services can make it easier to scale individual components as needed.</p>
          <h3>2. Caching Strategies</h3>
          <p>Implementing effective caching can reduce database load and improve response times.</p>
          <h3>3. Database Optimization</h3>
          <p>Proper indexing, query optimization, and sometimes denormalization can significantly improve database performance under load.</p>
        `,
        tags: ['Backend', 'Scalability', 'Architecture']
      },
      {
        id: 3,
        title: 'The Power of CSS Grid',
        date: '2023-01-10',
        summary: 'How CSS Grid has revolutionized web layout design and how to use it effectively.',
        content: `
          <h2>The Power of CSS Grid</h2>
          <p>CSS Grid has transformed how we approach layout design on the web. Here's why I love using it and some tips for getting the most out of it.</p>
          <h3>1. Two-Dimensional Layouts</h3>
          <p>Unlike Flexbox, Grid allows you to control both rows and columns simultaneously, enabling complex layouts with less code.</p>
          <h3>2. Named Areas</h3>
          <p>Grid areas provide an intuitive way to define layouts, making your CSS more readable and maintainable.</p>
          <h3>3. Responsive Design Without Media Queries</h3>
          <p>With functions like minmax() and auto-fill/auto-fit, you can create responsive layouts that adapt to different screen sizes with minimal code.</p>
        `,
        tags: ['CSS', 'Web Design', 'Frontend']
      }
    ]
  }),
  getters: {
    getFeaturedProjects: (state) => state.projects.filter(project => project.featured),
    getBlogPostById: (state) => (id) => state.blogPosts.find(post => post.id === parseInt(id)),
    getProjectById: (state) => (id) => state.projects.find(project => project.id === parseInt(id))
  },
  actions: {
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
      document.documentElement.setAttribute('data-theme', this.theme)
    }
  }
})
