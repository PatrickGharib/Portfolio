<script setup>
import '../assets/styles/views/AboutView.css'

// Simple implementation without animations for now
</script>

<template>
  <v-container class="about py-16">
    <v-row justify="center">
      <v-col cols="12" class="text-center">
        <h1 class="text-h3 font-weight-bold mb-6 position-relative underline-title">About Me</h1>
      </v-col>
    </v-row>
    
    <v-row class="mt-6">
      <v-col cols="12" md="4" class="mb-6 mb-md-0">
        <v-card class="h-100 d-flex align-center justify-center" elevation="3">
          <!-- Placeholder for profile image -->
          <div class="profile-placeholder d-flex align-center justify-center pa-16">
            <span class="text-h5 text-center">Profile Image</span>
          </div>
        </v-card>
      </v-col>
      
      <v-col cols="12" md="8">
        <h2 class="text-h4 mb-4">Lead Software Developer</h2>
        <v-card class="mb-4 pa-4" variant="flat">
          <p class="text-body-1 mb-4">
            Hello! I'm Patrick Abou Gharib, a proactive Lead Software Engineer with 5+ years of full-stack development experience, 
            specializing in building robust, scalable cloud-based solutions. I have demonstrated success leading cross-functional teams, 
            delivering mission-critical projects on time, and driving over $10M in annual revenue.
          </p>
          
          <p class="text-body-1 mb-4">
            I'm skilled in architecting microservice-based systems, integrating DevOps best practices, and improving efficiency and time-to-market. 
            My technical expertise spans across JavaScript/TypeScript, Vue.js, React.js, C#, Python, and various cloud platforms including 
            Azure and AWS.
          </p>
          
          <p class="text-body-1">
            Throughout my career, I've focused on developing high-performance, user-facing interfaces while also implementing robust backend 
            solutions. I'm passionate about creating seamless user experiences and solving complex technical challenges through innovative approaches.
          </p>
        </v-card>
        
        <h3 class="text-h5 mb-4 mt-6">My Values</h3>
        <v-list>
          <v-list-item>
            <v-list-item-title class="font-weight-bold">Technical Excellence</v-list-item-title>
            <v-list-item-subtitle>
              I'm committed to writing clean, maintainable code and implementing best practices 
              that ensure long-term project success and scalability.
            </v-list-item-subtitle>
          </v-list-item>
          
          <v-list-item>
            <v-list-item-title class="font-weight-bold">User-Centered Design</v-list-item-title>
            <v-list-item-subtitle>
              I believe that the best applications are those that prioritize the user experience, 
              making complex tasks feel intuitive and simple.
            </v-list-item-subtitle>
          </v-list-item>
          
          <v-list-item>
            <v-list-item-title class="font-weight-bold">Continuous Improvement</v-list-item-title>
            <v-list-item-subtitle>
              I constantly seek to enhance both my technical skills and development processes, 
              staying current with emerging technologies and methodologies.
            </v-list-item-subtitle>
          </v-list-item>
          
          <v-list-item>
            <v-list-item-title class="font-weight-bold">Collaborative Leadership</v-list-item-title>
            <v-list-item-subtitle>
              I value open communication, constructive feedback, and knowledge sharing, 
              fostering environments where teams can thrive and deliver exceptional results.
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>
        
        <h3 class="text-h5 mb-4 mt-6">Outside of Coding</h3>
        <v-card class="mb-6 pa-4" variant="flat">
          <p class="text-body-1">
            When I'm not coding, you might find me exploring the mountains around Calgary, contributing to open-source projects, 
            or diving into the latest research in VR and data visualization. I believe that diverse interests and experiences 
            contribute to creative problem-solving in software development.
          </p>
        </v-card>
        
        <div class="d-flex flex-wrap gap-4 mt-6">
          <v-btn color="primary" href="/resume.pdf" download size="large" variant="elevated">
            Download Resume
          </v-btn>
          <v-btn variant="outlined" to="/contact" size="large">
            Get In Touch
          </v-btn>
        </div>
      </v-col>
    </v-row>
    
    <v-row class="mt-16">
      <v-col cols="12" lg="6" class="mb-8 mb-lg-0">
        <h2 class="text-h4 mb-6 position-relative underline-title">Education</h2>
        <v-timeline side="end">
          <v-timeline-item dot-color="primary" size="large">
            <template v-slot:opposite>
              <div class="text-h6">2015 - 2019</div>
            </template>
            <v-card>
              <v-card-title class="text-h6">
                Bachelor of Science in Computer Science
              </v-card-title>
              <v-card-text>
                <p class="text-subtitle-1 mb-2">University of Calgary</p>
                <p class="text-body-2">
                  Relevant coursework included Data Structures & Algorithms, Operating Systems, 
                  Distributed Systems, and Software Engineering. Participated in research projects 
                  focused on VR applications for medical and geophysical data visualization.
                </p>
              </v-card-text>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-col>
      
      <v-col cols="12" lg="6">
        <h2 class="text-h4 mb-6 position-relative underline-title">Publications</h2>
        <v-row>
          <v-col cols="12" class="mb-4">
            <v-card elevation="2" class="h-100">
              <v-card-item>
                <template v-slot:prepend>
                  <v-icon color="primary" size="large">mdi-file-document-outline</v-icon>
                </template>
                <v-card-title>EPES: Seizure Propagation Analysis in an Immersive Environment</v-card-title>
                <v-card-subtitle>
                  <div>ACM Digital Library</div>
                  <div>2019</div>
                </v-card-subtitle>
                <v-card-text>
                  <v-btn
                    variant="text"
                    color="primary"
                    href="https://dl.acm.org/doi/10.1145/3343055.3360745"
                    target="_blank"
                  >
                    View Publication
                  </v-btn>
                </v-card-text>
              </v-card-item>
            </v-card>
          </v-col>
          
          <v-col cols="12">
            <v-card elevation="2" class="h-100">
              <v-card-item>
                <template v-slot:prepend>
                  <v-icon color="primary" size="large">mdi-file-document-outline</v-icon>
                </template>
                <v-card-title>SIERA: The Seismic Information Extended Reality Analytics Tool</v-card-title>
                <v-card-subtitle>
                  <div>ACM Digital Library</div>
                  <div>2020</div>
                </v-card-subtitle>
                <v-card-text>
                  <v-btn
                    variant="text"
                    color="primary"
                    href="https://dl.acm.org/doi/10.1145/3380867.3426223"
                    target="_blank"
                  >
                    View Publication
                  </v-btn>
                </v-card-text>
              </v-card-item>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.profile-placeholder {
  background-color: var(--color-background-soft);
  border-radius: 8px;
  height: 100%;
  min-height: 300px;
}

.underline-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
  border-radius: 2px;
}

@media (max-width: 960px) {
  .underline-title::after {
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
