import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Routes, Route, MemoryRouter } from 'react-router-dom'
import Navigation from '../components/Navigation'
import Home from '../pages/Home'
import Projects from '../pages/Projects'
import Experience from '../pages/Experience'

// Mock axios for the Projects component
vi.mock('axios', () => ({
  default: {
    get: vi.fn().mockResolvedValue({ data: [] }),
  },
}))

// Mock the CV service
vi.mock('../services/cvService', () => ({
  default: {
    fetchProfile: vi.fn().mockResolvedValue({
      profile: {
        name: 'Adam Wickenden',
        title: 'Senior Data Scientist',
        summary:
          'Passionate software developer with experience in machine learning, robotics, and full-stack development.',
        email: 'adamwickenden94@gmail.com',
        location: 'London',
      },
      workExperience: [
        {
          company: 'Faculty.ai',
          position: 'Senior Data Scientist',
          startDate: '2021-11',
          endDate: 'Present',
          location: 'London',
          achievements: ['Led drone classification projects'],
        },
      ],
      education: [
        {
          institution: 'University of Birmingham',
          degree: 'MSci Physics',
          startDate: '2014',
          endDate: '2018',
          location: 'Birmingham, UK',
          grade: '1st Class Honours',
        },
      ],
      certifications: [
        {
          name: "Andrew Ng's Machine Learning Course",
          issuer: 'Coursera',
          issueDate: '2020',
        },
      ],
    }),
  },
}))

describe('App Component Integration Tests', () => {
  // Test individual components with routing instead of the full App
  const renderWithRouter = (initialEntries = ['/']) => {
    return render(
      <MemoryRouter initialEntries={initialEntries}>
        <div className="app">
          <Navigation />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/experience" element={<Experience />} />
            </Routes>
          </main>
        </div>
      </MemoryRouter>
    )
  }

  it('renders navigation and home page by default', async () => {
    renderWithRouter(['/'])

    // Navigation should be present - use getAllByText since "Adam Wickenden" appears in both nav and home
    const adamNames = screen.getAllByText('Adam Wickenden')
    expect(adamNames.length).toBeGreaterThan(0)

    // Home page content should be present - wait for async loading
    await waitFor(() => {
      expect(screen.getByText('About Me')).toBeInTheDocument()
    })

    expect(screen.getByText('Publications')).toBeInTheDocument()
  })

  it('navigates to projects page', async () => {
    renderWithRouter(['/projects'])

    // Should show projects page content
    await waitFor(() => {
      expect(screen.getByText('My Projects')).toBeInTheDocument()
    })

    expect(screen.getByText('Machine Learning Projects')).toBeInTheDocument()
  })

  it('navigates to experience page', async () => {
    renderWithRouter(['/experience'])

    // Should show experience page content - need to wait for async loading
    await waitFor(() => {
      expect(screen.getByText('Professional Experience')).toBeInTheDocument()
    })

    await waitFor(() => {
      expect(screen.getByText('Work Experience')).toBeInTheDocument()
    })
  })

  it('has proper page structure', async () => {
    renderWithRouter(['/'])

    // Check for main structural elements - use getAllByText for duplicates
    const adamNames = screen.getAllByText('Adam Wickenden')
    expect(adamNames.length).toBeGreaterThan(0) // Navigation and Home content

    // Wait for async home content to load
    await waitFor(() => {
      expect(screen.getByText('About Me')).toBeInTheDocument() // Home content
    })

    // Check navigation links exist
    const homeLinks = screen.getAllByText('Home')
    const projectsLinks = screen.getAllByText('Projects')
    const experienceLinks = screen.getAllByText('Experience')

    expect(homeLinks.length).toBeGreaterThan(0)
    expect(projectsLinks.length).toBeGreaterThan(0)
    expect(experienceLinks.length).toBeGreaterThan(0)
  })
})
