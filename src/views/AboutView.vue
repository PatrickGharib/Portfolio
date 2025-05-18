<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const aboutSection = ref(null)

onMounted(() => {
  // Animate about section elements
  if (aboutSection.value) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: aboutSection.value,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none none'
      }
    })
    
    tl.from('.about-title', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    })
    .from('.about-content', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.6')
  }
})
</script>

<template>
  <div class="about" ref="aboutSection">
    <h1 class="section-title about-title">About Me</h1>
    
    <div class="about-content">
      <div class="about-image">
        <div class="image-container">
          <!-- Placeholder for profile image -->
          <div class="profile-placeholder">
            <span>Profile Image</span>
          </div>
        </div>
      </div>
      
      <div class="about-text">
        <h2>Lead Software Developer</h2>
        <p>
          Hello! I'm Patrick Abou Gharib, a proactive Lead Software Engineer with 5+ years of full-stack development experience, 
          specializing in building robust, scalable cloud-based solutions. I have demonstrated success leading cross-functional teams, 
          delivering mission-critical projects on time, and driving over $10M in annual revenue.
        </p>
        
        <p>
          I'm skilled in architecting microservice-based systems, integrating DevOps best practices, and improving efficiency and time-to-market. 
          My technical expertise spans across JavaScript/TypeScript, Vue.js, React.js, C#, Python, and various cloud platforms including 
          Azure and AWS.
        </p>
        
        <p>
          Throughout my career, I've focused on developing high-performance, user-facing interfaces while also implementing robust backend 
          solutions. I'm passionate about creating seamless user experiences and solving complex technical challenges through innovative approaches.
        </p>
        
        <h3>My Values</h3>
        <ul class="values-list">
          <li>
            <strong>Technical Excellence:</strong> I'm committed to writing clean, maintainable code and implementing best practices 
            that ensure long-term project success and scalability.
          </li>
          <li>
            <strong>User-Centered Design:</strong> I believe that the best applications are those that prioritize the user experience, 
            making complex tasks feel intuitive and simple.
          </li>
          <li>
            <strong>Continuous Improvement:</strong> I constantly seek to enhance both my technical skills and development processes, 
            staying current with emerging technologies and methodologies.
          </li>
          <li>
            <strong>Collaborative Leadership:</strong> I value open communication, constructive feedback, and knowledge sharing, 
            fostering environments where teams can thrive and deliver exceptional results.
          </li>
        </ul>
        
        <h3>Outside of Coding</h3>
        <p>
          When I'm not coding, you might find me exploring the mountains around Calgary, contributing to open-source projects, 
          or diving into the latest research in VR and data visualization. I believe that diverse interests and experiences 
          contribute to creative problem-solving in software development.
        </p>
        
        <div class="cta-buttons">
          <a href="/resume.pdf" download class="btn btn-primary">Download Resume</a>
          <router-link to="/contact" class="btn btn-secondary">Get In Touch</router-link>
        </div>
      </div>
    </div>
    
    <div class="education-experience">
      <div class="education">
        <h2 class="subsection-title">Education</h2>
        <div class="timeline">
          <div class="timeline-item">
            <div class="timeline-marker"></div>
            <div class="timeline-content">
              <h3>Bachelor of Science in Computer Science</h3>
              <p class="institution">University of Calgary</p>
              <p class="period">2015 - 2019</p>
              <p>
                Relevant coursework included Data Structures & Algorithms, Operating Systems, 
                Distributed Systems, and Software Engineering. Participated in research projects 
                focused on VR applications for medical and geophysical data visualization.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="publications">
        <h2 class="subsection-title">Publications</h2>
        <div class="pub-grid">
          <div class="pub-item">
            <div class="pub-icon">
              <span>📄</span>
            </div>
            <div class="pub-details">
              <h3>EPES: Seizure Propagation Analysis in an Immersive Environment</h3>
              <p class="publisher">ACM Digital Library</p>
              <p class="pub-date">2019</p>
              <a href="https://dl.acm.org/doi/10.1145/3343055.3360745" target="_blank" class="pub-link">View Publication</a>
            </div>
          </div>
          
          <div class="pub-item">
            <div class="pub-icon">
              <span>📄</span>
            </div>
            <div class="pub-details">
              <h3>SIERA: The Seismic Information Extended Reality Analytics Tool</h3>
              <p class="publisher">ACM Digital Library</p>
              <p class="pub-date">2020</p>
              <a href="https://dl.acm.org/doi/10.1145/3380867.3426223" target="_blank" class="pub-link">View Publication</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about {
  padding: 2rem 0 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 100%;
}

.section-title {
  text-align: center;
  margin-bottom: 2rem;
}

.about-content {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 3rem;
  margin-top: 3rem;
  margin-bottom: 4rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  padding: 0 2rem;
  box-sizing: border-box;
}

.about-image {
  display: flex;
  justify-content: flex-start;
  flex: 0 0 300px;
}

.image-container {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  position: sticky;
  top: 100px;
}

.profile-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
}

.about-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.about-text h2 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: var(--color-primary);
  text-align: left;
  width: 100%;
}

.about-text h3 {
  font-size: 1.5rem;
  margin: 2rem 0 1rem;
  color: var(--color-text);
  text-align: left;
  width: 100%;
}

.about-text p {
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--color-text);
  text-align: left;
  width: 100%;
}

.values-list {
  padding: 0;
  margin-bottom: 2rem;
  width: 100%;
  list-style-type: none;
}

.values-list li {
  margin-bottom: 1rem;
  line-height: 1.6;
  text-align: left;
}

.values-list strong {
  color: var(--color-primary);
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  justify-content: center;
}

.education-experience {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 2rem;
  box-sizing: border-box;
}

.education, .publications {
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 3rem;
}

.subsection-title {
  font-size: 1.8rem;
  margin-bottom: 2rem;
  position: relative;
  display: inline-block;
  text-align: center;
  width: 100%;
}

.subsection-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 3px;
  background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
  border-radius: 2px;
}

.timeline {
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.timeline-item {
  position: relative;
  margin-bottom: 3rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.timeline-marker {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
  border: 3px solid var(--color-background);
  margin-bottom: 1rem;
}

.timeline-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.timeline-content h3 {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  text-align: left;
}

.institution, .period {
  color: var(--color-text-light);
  margin-bottom: 0.5rem;
  text-align: left;
}

.timeline-content p {
  text-align: left;
}

.cert-grid {
  display: grid;
  gap: 2rem;
}

.cert-item {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  background-color: var(--color-background);
  border-radius: 8px;
  box-shadow: var(--shadow-md);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.cert-item:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.cert-icon {
  font-size: 2rem;
  color: var(--color-primary);
}

.pub-grid {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 2rem;
}

.pub-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  background-color: var(--color-background);
  border-radius: 8px;
  box-shadow: var(--shadow-md);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 100%;
  max-width: 600px;
}

.pub-item:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.pub-icon {
  font-size: 2rem;
  color: var(--color-primary);
  margin-bottom: 1rem;
}

.pub-details {
  text-align: center;
}

.pub-details h3 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  text-align: center;
}

.publisher, .pub-date {
  color: var(--color-text-light);
  margin-bottom: 0.25rem;
  text-align: center;
}

.pub-link {
  display: inline-block;
  margin-top: 0.5rem;
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.pub-link:hover {
  color: var(--color-secondary);
}

.cert-details h3 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  text-align: center;
}

.issuer, .issue-date {
  color: var(--color-text-light);
  margin-bottom: 0.25rem;
  text-align: center;
}

@media (max-width: 992px) {
  .about-content {
    flex-direction: column;
  }
  
  .about-image {
    margin-bottom: 2rem;
    justify-content: center;
    flex: none;
  }
  
  .image-container {
    position: relative;
    top: 0;
  }
  
  .education-experience {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .cta-buttons {
    flex-direction: column;
    width: 100%;
  }
  
  .cta-buttons .btn {
    width: 100%;
  }
  
  .about-content {
    padding: 0 1rem;
  }
  
  .education-experience {
    padding: 0 1rem;
  }
}
</style>
