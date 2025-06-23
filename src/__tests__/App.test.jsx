import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'

// Mock axios for the Projects component
vi.mock('axios', () => ({
  default: {
    get: vi.fn().mockResolvedValue({ data: [] }),
  },
}))

describe('App Component Integration Tests', () => {
  it('renders navigation and home page by default', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    )

    // Navigation should be present
    expect(screen.getByText('Adam Wickenden')).toBeInTheDocument()

    // Home page content should be present
    expect(
      screen.getByText('Software Developer & Technology Enthusiast')
    ).toBeInTheDocument()
    expect(screen.getByText('Technical Skills')).toBeInTheDocument()
  })

  it('navigates to projects page', async () => {
    render(
      <MemoryRouter initialEntries={['/projects']}>
        <App />
      </MemoryRouter>
    )

    // Navigation should be present
    expect(screen.getByText('Adam Wickenden')).toBeInTheDocument()

    // Projects page content should be present
    expect(screen.getByText('My Projects')).toBeInTheDocument()
    expect(screen.getByText('Interactive Unity Projects')).toBeInTheDocument()
  })

  it('navigates to experience page', async () => {
    render(
      <MemoryRouter initialEntries={['/experience']}>
        <App />
      </MemoryRouter>
    )

    // Navigation should be present
    expect(screen.getByText('Adam Wickenden')).toBeInTheDocument()

    // Experience page content should be present
    expect(screen.getByText('Professional Experience')).toBeInTheDocument()
    expect(screen.getByText('Work Experience')).toBeInTheDocument()
  })

  it('has proper page structure', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    )

    const appContainer = document.querySelector('.App')
    expect(appContainer).toBeInTheDocument()

    const mainContent = document.querySelector('.main-content')
    expect(mainContent).toBeInTheDocument()
  })
})
