import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import githubService from '../../services/githubService'
import Projects from '../Projects'

// The GitHub service is already mocked in setup.js

describe('Projects Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks()
  })

  it('renders loading state initially', () => {
    render(<Projects />)
    expect(document.querySelector('.spinner')).toBeInTheDocument()
  })

  it('renders projects after successful API call', async () => {
    render(<Projects />)

    // Wait for the component to update with mocked data
    await waitFor(
      () => {
        expect(screen.getByText('My Projects')).toBeInTheDocument()
      },
      { timeout: 3000 }
    )

    // Check for mocked repository names - they should all be present
    await waitFor(
      () => {
        expect(screen.getByText('TensorFlowNBs')).toBeInTheDocument()
        expect(screen.getAllByText('Unity-Game')).toHaveLength(2) // Appears in title and button
        expect(screen.getByText('React-Portfolio')).toBeInTheDocument()
      },
      { timeout: 3000 }
    )
  })

  it('displays repository information correctly', async () => {
    render(<Projects />)

    await waitFor(
      () => {
        expect(screen.getByText('TensorFlowNBs')).toBeInTheDocument()
      },
      { timeout: 3000 }
    )

    // Check repository details from mocked data
    expect(
      screen.getByText('A collection of TensorFlow notebooks')
    ).toBeInTheDocument()

    // Check stats from mocked data - TensorFlowNBs has 5 stars in the mock
    const starCounts = screen.getAllByText('5')
    expect(starCounts.length).toBeGreaterThan(0)
  })

  it('renders Unity projects section correctly', async () => {
    render(<Projects />)

    // Wait for component to load
    await waitFor(
      () => {
        expect(screen.getByText('My Projects')).toBeInTheDocument()
      },
      { timeout: 3000 }
    )

    // Check if Unity section is present
    expect(screen.getByText('Interactive Unity Projects')).toBeInTheDocument()

    // Should show the Unity project from mock data (appears in multiple places)
    await waitFor(
      () => {
        const unityGameElements = screen.getAllByText('Unity-Game')
        expect(unityGameElements.length).toBeGreaterThan(0)
      },
      { timeout: 3000 }
    )
  })

  it('renders Machine Learning projects section correctly', async () => {
    render(<Projects />)

    await waitFor(
      () => {
        expect(screen.getByText('My Projects')).toBeInTheDocument()
      },
      { timeout: 3000 }
    )

    // Check if ML section is present
    expect(screen.getByText('Machine Learning Projects')).toBeInTheDocument()

    // Should show the ML project from mock data
    await waitFor(
      () => {
        expect(screen.getByText('TensorFlowNBs')).toBeInTheDocument()
      },
      { timeout: 3000 }
    )
  })

  it('renders Frontend projects section correctly', async () => {
    render(<Projects />)

    await waitFor(
      () => {
        expect(screen.getByText('My Projects')).toBeInTheDocument()
      },
      { timeout: 3000 }
    )

    // Check if Frontend section is present
    expect(screen.getByText('Frontend Projects')).toBeInTheDocument()

    // Should show the Frontend project from mock data
    await waitFor(
      () => {
        expect(screen.getByText('React-Portfolio')).toBeInTheDocument()
      },
      { timeout: 3000 }
    )
  })

  it('handles Unity projects correctly when they exist', async () => {
    render(<Projects />)

    await waitFor(
      () => {
        expect(screen.getByText('My Projects')).toBeInTheDocument()
      },
      { timeout: 3000 }
    )

    // With our mock data, we should have Unity projects
    await waitFor(
      () => {
        const unityGameElements = screen.getAllByText('Unity-Game')
        expect(unityGameElements.length).toBeGreaterThan(0)
      },
      { timeout: 3000 }
    )

    // Should show Unity project details
    expect(screen.getByText('A Unity game project')).toBeInTheDocument()
  })

  it('has external links with proper attributes', async () => {
    render(<Projects />)

    await waitFor(
      () => {
        expect(screen.getByText('TensorFlowNBs')).toBeInTheDocument()
      },
      { timeout: 3000 }
    )

    const githubLinks = screen.getAllByText('View on GitHub')
    expect(githubLinks.length).toBeGreaterThan(0)
    githubLinks.forEach(link => {
      expect(link.closest('a')).toHaveAttribute('target', '_blank')
      expect(link.closest('a')).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  it('displays last commit date instead of updated date', async () => {
    render(<Projects />)

    await waitFor(
      () => {
        expect(screen.getByText('My Projects')).toBeInTheDocument()
      },
      { timeout: 3000 }
    )

    // Wait for async operations to complete and check that "Last commit" text appears
    await waitFor(
      () => {
        // Check that text contains "Last commit" instead of "Updated"
        const commitTexts = screen.getAllByText(/Last commit/)
        expect(commitTexts.length).toBeGreaterThan(0)
      },
      { timeout: 3000 }
    )
  })

  it('calls GitHub service on mount', async () => {
    render(<Projects />)

    // Wait for the service to be called
    await waitFor(() => {
      expect(githubService.fetchRepositories).toHaveBeenCalled()
    })
  })
})
