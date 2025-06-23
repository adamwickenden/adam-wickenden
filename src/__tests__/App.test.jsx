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

    // Home page content should be present
    expect(
      screen.getByText('Software Developer & Technology Enthusiast')
    ).toBeInTheDocument()
    expect(screen.getByText('Technical Skills')).toBeInTheDocument()
  })

  it('navigates to projects page', async () => {
    renderWithRouter(['/projects'])

    // Should show projects page content
    await waitFor(() => {
      expect(screen.getByText('My Projects')).toBeInTheDocument()
    })

    expect(screen.getByText('GitHub Repositories')).toBeInTheDocument()
  })

  it('navigates to experience page', async () => {
    renderWithRouter(['/experience'])

    // Should show experience page content
    expect(screen.getByText('Professional Experience')).toBeInTheDocument()
    expect(screen.getByText('Work Experience')).toBeInTheDocument()
  })

  it('has proper page structure', () => {
    renderWithRouter(['/'])

    // Check for main structural elements - use getAllByText for duplicates
    const adamNames = screen.getAllByText('Adam Wickenden')
    expect(adamNames.length).toBeGreaterThan(0) // Navigation and Home content

    expect(screen.getByText('About Me')).toBeInTheDocument() // Home content

    // Check navigation links exist
    const homeLinks = screen.getAllByText('Home')
    const projectsLinks = screen.getAllByText('Projects')
    const experienceLinks = screen.getAllByText('Experience')

    expect(homeLinks.length).toBeGreaterThan(0)
    expect(projectsLinks.length).toBeGreaterThan(0)
    expect(experienceLinks.length).toBeGreaterThan(0)
  })
})
