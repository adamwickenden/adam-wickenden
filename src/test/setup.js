import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock GitHub Service - Create a proper mock for the singleton instance
const mockGitHubService = {
  fetchRepositories: vi.fn().mockImplementation(() =>
    Promise.resolve([
      {
        id: 1,
        name: 'TensorFlowNBs',
        description: 'A collection of TensorFlow notebooks',
        html_url: 'https://github.com/adamwickenden/TensorFlowNBs',
        stargazers_count: 5,
        forks_count: 2,
        watchers_count: 3,
        language: 'Python',
        topics: ['machine-learning', 'tensorflow'],
        type: 'Machine Learning',
        techStack: ['Python', 'TensorFlow'],
        last_commit_date: '2023-12-01T10:00:00Z',
        private: false,
        fork: false,
      },
      {
        id: 2,
        name: 'Unity-Game',
        description: 'A Unity game project',
        html_url: 'https://github.com/adamwickenden/Unity-Game',
        stargazers_count: 10,
        forks_count: 3,
        watchers_count: 5,
        language: 'C#',
        topics: ['unity', 'game'],
        type: 'Unity',
        techStack: ['C#', 'Unity'],
        last_commit_date: '2023-11-15T14:30:00Z',
        private: false,
        fork: false,
      },
      {
        id: 3,
        name: 'React-Portfolio',
        description: 'A React portfolio website',
        html_url: 'https://github.com/adamwickenden/React-Portfolio',
        stargazers_count: 8,
        forks_count: 1,
        watchers_count: 4,
        language: 'JavaScript',
        topics: ['frontend', 'react'],
        type: 'Frontend',
        techStack: ['JavaScript', 'React'],
        last_commit_date: '2023-12-05T09:15:00Z',
        private: false,
        fork: false,
      },
    ])
  ),
  getRateLimit: vi.fn().mockImplementation(() =>
    Promise.resolve({
      rate: {
        limit: 5000,
        remaining: 4999,
        reset: Date.now() / 1000 + 3600,
      },
    })
  ),
  fetchLatestCommit: vi.fn().mockImplementation(() =>
    Promise.resolve({
      commit: {
        author: {
          date: '2023-12-01T10:00:00Z',
        },
      },
    })
  ),
  getProjectType: vi.fn().mockImplementation(repo => {
    if (repo.topics?.includes('unity')) return 'Unity'
    if (repo.topics?.includes('machine-learning')) return 'Machine Learning'
    if (repo.topics?.includes('frontend')) return 'Frontend'
    return 'Other'
  }),
  getTechStack: vi.fn().mockImplementation(repo => {
    if (repo.language === 'Python') return ['Python', 'TensorFlow']
    if (repo.language === 'C#') return ['C#', 'Unity']
    if (repo.language === 'JavaScript') return ['JavaScript', 'React']
    return [repo.language || 'Unknown']
  }),
}

vi.mock('../services/githubService.js', () => ({
  default: mockGitHubService,
}))

// Mock CV Service
vi.mock('../services/cvService.js', () => ({
  default: {
    fetchProfile: vi.fn().mockImplementation(() =>
      Promise.resolve({
        profile: {
          name: 'Adam Wickenden',
          title: 'Senior Data Scientist',
          location: 'London',
          email: 'adamwickenden94@gmail.com',
          github: 'https://github.com/adamwickenden',
          summary:
            'Adam has a wide range of experience delivering data science solutions across the public sector, defence and heavy industry. He has led multiple machine learning projects in Radio Frequency analysis, and driven the upskilling of colleagues in this space.',
        },
        workExperience: [
          {
            title: 'Senior Data Scientist',
            company: 'Faculty.ai',
            startDate: '2021-11-01',
            endDate: null,
            duration: '2+ years',
            location: 'London, UK',
            description:
              'Leading machine learning projects in Radio Frequency analysis and upskilling colleagues in signal processing.',
            achievements: [
              'Technical Lead for a Drone Classification proof of concept, applying clustering and LightGBM to bespoke PDW data',
              'Oversaw continued development of internal IP and data collection for signal processing Centre of Excellence',
              'Upskilled 5+ colleagues in signal processing, contributing to multiple Radio Frequency projects',
              'Applied XVector speech recognition models to RF data to classify drone controller signals',
              'Technical Lead for Radar Waveform Zero/Few-Shot classification project using transformer models',
              'Managed a small team of data scientists and machine learning engineers',
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
              'Developed backend modules for batch inference across arctic using satellite APIs',
              'Developed and tuned a bespoke UNET using Tensorflow for multi-band satellite imagery',
              'Led Enterprise Scale Data Analytics project for Global Mining Company',
              'Managed migration of 500 servers for Tier 1 Investment Bank',
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
              'Developed the ability to efficiently articulate high level concepts through presenting multiple seminars',
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
              {
                name: 'Google Cloud Platform',
                level: 75,
                yearsOfExperience: 2,
              },
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
      })
    ),
  },
}))

// Mock IntersectionObserver
globalThis.IntersectionObserver = vi.fn(() => ({
  observe: vi.fn(),
  disconnect: vi.fn(),
  unobserve: vi.fn(),
}))

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock window.scrollTo
Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: vi.fn(),
})

// Mock localStorage
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: vi.fn(() => null),
    setItem: vi.fn(() => null),
    removeItem: vi.fn(() => null),
    clear: vi.fn(() => null),
  },
  writable: true,
})
