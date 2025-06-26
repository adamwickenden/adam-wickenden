// CV Data Service - Contains Adam Wickenden's professional information
const CV_DATA = {
  profile: {
    name: 'Adam Wickenden',
    title: 'Senior Data Scientist',
    location: 'London',
    email: 'adamwickenden94@gmail.com',
    github: 'https://github.com/adamwickenden',
    summary: `I have a wide range of experience delivering data science solutions across the public sector, defence and heavy industry. I've led multiple machine learning projects in Radio Frequency analysis, and driven the upskilling of colleagues in this space. I've also worked across all cloud platforms to develop and deploy functional machine learning solutions to clients.`,
  },

  workExperience: [
    {
      title: 'Senior Data Scientist',
      company: 'Faculty.ai',
      startDate: '2021-11-01',
      endDate: null,
      duration: '3+ years',
      location: 'London, UK',
      description:
        'Leading machine learning projects in Radio Frequency analysis and upskilling colleagues in signal processing.',
      achievements: [
        'Technical Lead for a Drone Classification proof of concept, applying clustering and LightGBM to bespoke PDW data, achieving comparable performance to clients lengthy (6+ months) manual process in only 4 weeks',
        'Oversaw continued development of internal IP and data collection for signal processing Centre of Excellence. Upskilled 5+ colleagues in signal processing',
        'Upskilled in sensor design to build a sensor array for collecting audio of flying drones, collecting audio and RF data on 15 drone platforms',
        'Applied XVector speech recognition models to RF data to classify drone controller and telemetry signals by specific emitter',
        'Technical Lead for a Radar Waveform Zero/Few-Shot classification project, applying transformer based speech recognition models to radar data',
        'Acted as lead data scientist when building relationships with third party software and data providers',
        'Managed a small team of data scientists and machine learning engineers',
        'Implemented a Random Forest Classifier for financial anomaly detection using manually labelled data',
        'Developed functionality for collapsing bipartite graphs generated from location data using NetworkX and Numpy',
        'Combined Zero-shot topic labelling with 1D KDE models to create a text based anomaly detection tool',
        'Applied standardisation across 5 repos including MyPy, deployment controls, and AWS monitoring dashboards',
      ],
    },
    {
      title: 'Data Scientist / Software Engineer',
      company: 'Accenture',
      startDate: '2019-03-01',
      endDate: '2021-11-01',
      duration: '2 years 8 months',
      location: 'London, UK',
      description:
        'Delivered data science solutions across multiple industries including environmental research, mining, and financial services.',
      achievements: [
        'Solo Data Scientist and Engineer on prototype led sales project for Stockholm Environment Institute',
        'Developed backend modules for batch inference across arctic, integrating with satellite APIs and Google Earth Engine',
        'Developed and tuned a bespoke UNET using Tensorflow for multi-band satellite imagery',
        'Led Enterprise Scale Data Analytics project for Global Mining Company, developing Data Science modules to enhance mineral processing plants',
        'Implemented Kernel Density Estimation modules for anomaly detection in real-time data',
        'Developed CDF extraction modules for monitoring Rate Of Change of variables',
        'Managed migration of 500 servers for Tier 1 Investment Bank',
        'Managed a small team of developers using Agile methodology',
        'Developed multiple CLI tools for server analysis using Python and SQL',
        'Maintained and expanded internal website covering Full Stack development',
      ],
    },
  ],

  education: [
    {
      degree: 'MSci Physics',
      institution: 'University of Birmingham',
      startDate: '2014-09-01',
      endDate: '2018-06-01',
      duration: '4 years',
      location: 'Birmingham, UK',
      grade: '1st Class with Honours',
      description:
        'Developed outstanding written, research and problem solving skills through consistently producing first class exam results and experimental reports.',
      achievements: [
        'Significantly improved independent research abilities by fulfilling briefs and undertaking self-study modules',
        'Consistently shown an aptitude for understanding complex physical, mathematical and technical concepts',
        'Developed the ability to efficiently articulate high level concepts through presenting multiple seminars to peers and staff',
      ],
    },
  ],

  certifications: [
    {
      title: 'Machine Learning Course',
      issuer: 'Coursera - Stanford University (Andrew Ng)',
      issueDate: '2021-02-01',
      expirationDate: null,
      credentialId: 'ML-STANFORD-2021',
      description:
        'Completed to extend knowledge of machine learning concepts from a fundamental mathematical basis.',
    },
  ],

  skills: {
    technical: {
      programmingLanguages: [
        { name: 'Python', level: 95, yearsOfExperience: 5 },
        { name: 'C#', level: 80, yearsOfExperience: 3 },
        { name: 'SQL', level: 85, yearsOfExperience: 4 },
        { name: 'JavaScript', level: 75, yearsOfExperience: 3 },
        { name: 'Terraform', level: 70, yearsOfExperience: 2 },
      ],
      frameworks: [
        { name: 'TensorFlow', level: 90, yearsOfExperience: 3 },
        { name: 'PyTorch', level: 85, yearsOfExperience: 2 },
        { name: 'Scikit-Learn', level: 95, yearsOfExperience: 4 },
        { name: 'Pandas', level: 95, yearsOfExperience: 5 },
        { name: 'NumPy', level: 95, yearsOfExperience: 5 },
        { name: 'Unity', level: 85, yearsOfExperience: 5 },
      ],
      tools: [
        { name: 'AWS', level: 85, yearsOfExperience: 3 },
        { name: 'Microsoft Azure', level: 80, yearsOfExperience: 2 },
        { name: 'Google Cloud Platform', level: 75, yearsOfExperience: 2 },
        { name: 'Git', level: 90, yearsOfExperience: 5 },
        { name: 'NetworkX', level: 80, yearsOfExperience: 2 },
      ],
    },
    soft: [
      'Technical Leadership',
      'Team Management',
      'Project Management',
      'Problem Solving',
      'Research & Development',
      'Client Relations',
      'Mentoring & Upskilling',
    ],
  },
  projects: [
    {
      name: 'Bias Assessment Tool',
      description:
        'JavaScript & GCP: Using Google Firebase to create a demo website that collects news articles from RSS feeds and uses GPT 3.5/4 to assess language bias',
      technologies: [
        'JavaScript',
        'Google Cloud Platform',
        'Firebase',
        'GPT-3.5/4',
        'RSS',
      ],
      startDate: '2023-01-01',
      status: 'Current',
      github: 'https://github.com/adamwickenden',
    },
    {
      name: 'GPU-Accelerated Natural Phenomena Simulation',
      description:
        'Unity: Using compute shaders (GPU accelerated programming) to perform large scale simulations of natural phenomena, and developed a self driving car simulation using evolutionary algorithms',
      technologies: [
        'Unity',
        'C#',
        'Compute Shaders',
        'GPU Programming',
        'Evolutionary Algorithms',
      ],
      startDate: '2021-01-01',
      status: 'Current',
      github: 'https://github.com/adamwickenden',
    },
    {
      name: 'Game Development Portfolio',
      description:
        'Unity Development: Developed multiple games including 2D infinite scrolling universe explorer, random maze generator, 3D online shooter demo, and competitive pong/air hockey game',
      technologies: ['Unity', 'C#', 'UnityPUN', 'Game Development'],
      startDate: '2018-01-01',
      status: 'Current',
      github: 'https://github.com/adamwickenden',
    },
  ],
}

class CVService {
  // Simulate async loading for consistent UX (matches previous LinkedIn service behavior)
  async fetchProfile() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(CV_DATA)
      }, 100)
    })
  }

  // Method to get specific sections
  async getWorkExperience() {
    const data = await this.fetchProfile()
    return data.workExperience
  }

  async getEducation() {
    const data = await this.fetchProfile()
    return data.education
  }

  async getCertifications() {
    const data = await this.fetchProfile()
    return data.certifications
  }

  async getSkills() {
    const data = await this.fetchProfile()
    return data.skills
  }

  async getProjects() {
    const data = await this.fetchProfile()
    return data.projects
  }

  async getProfile() {
    const data = await this.fetchProfile()
    return data.profile
  }

  // Helper method to format duration
  formatDuration(startDate, endDate) {
    const start = new Date(startDate)
    const end = endDate ? new Date(endDate) : new Date()

    const years = end.getFullYear() - start.getFullYear()
    const months = end.getMonth() - start.getMonth()

    const totalMonths = years * 12 + months

    if (totalMonths < 12) {
      return `${totalMonths} month${totalMonths !== 1 ? 's' : ''}`
    } else {
      const displayYears = Math.floor(totalMonths / 12)
      const displayMonths = totalMonths % 12

      if (displayMonths === 0) {
        return `${displayYears} year${displayYears !== 1 ? 's' : ''}`
      } else {
        return `${displayYears} year${displayYears !== 1 ? 's' : ''}, ${displayMonths} month${displayMonths !== 1 ? 's' : ''}`
      }
    }
  }

  // Helper method to format dates
  formatDate(dateString) {
    if (!dateString) return 'Present'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    })
  }
}

// Export singleton instance
export const cvService = new CVService()
export default cvService
