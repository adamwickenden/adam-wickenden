import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'
import Projects from '../Projects'

// Mock axios
vi.mock('axios')
const mockedAxios = axios

// Mock data for GitHub repositories
const mockRepos = [
  {
    id: 1,
    name: 'robocar',
    description: 'Playing with Freenove robocar kit for RPi',
    html_url: 'https://github.com/adamwickenden/robocar',
    language: 'Python',
    stargazers_count: 5,
    forks_count: 2,
    watchers_count: 1,
    updated_at: '2023-01-15T10:30:00Z',
    fork: false,
    private: false,
    topics: ['robotics', 'python'],
  },
  {
    id: 2,
    name: 'TensorFlowNBs',
    description: 'TensorFlow Training notebooks',
    html_url: 'https://github.com/adamwickenden/TensorFlowNBs',
    language: 'Jupyter Notebook',
    stargazers_count: 10,
    forks_count: 3,
    watchers_count: 2,
    updated_at: '2023-02-20T14:45:00Z',
    fork: false,
    private: false,
    topics: ['tensorflow', 'machine-learning'],
  },
]

describe('Projects Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.resetAllMocks()
  })

  it('renders loading state initially', () => {
    // Mock axios to return a pending promise
    mockedAxios.get.mockReturnValue(new Promise(() => {}))

    render(<Projects />)

    expect(
      screen.getByText('Loading projects from GitHub...')
    ).toBeInTheDocument()
  })

  it('renders projects after successful API call', async () => {
    // Mock successful API response
    mockedAxios.get.mockResolvedValue({ data: mockRepos })

    render(<Projects />)

    // Wait for the component to update
    await waitFor(() => {
      expect(screen.getByText('My Projects')).toBeInTheDocument()
    })

    expect(screen.getByText('robocar')).toBeInTheDocument()
    expect(screen.getByText('TensorFlowNBs')).toBeInTheDocument()
  })

  it('renders error state when API call fails', async () => {
    // Mock failed API response
    mockedAxios.get.mockRejectedValue(new Error('API Error'))

    render(<Projects />)

    await waitFor(() => {
      expect(
        screen.getByText('Failed to fetch GitHub repositories')
      ).toBeInTheDocument()
    })

    expect(screen.getByText('Try Again')).toBeInTheDocument()
  })

  it('displays repository information correctly', async () => {
    mockedAxios.get.mockResolvedValue({ data: mockRepos })

    render(<Projects />)

    await waitFor(() => {
      expect(screen.getByText('robocar')).toBeInTheDocument()
    })

    // Check repository details
    expect(
      screen.getByText('Playing with Freenove robocar kit for RPi')
    ).toBeInTheDocument()
    expect(screen.getByText('Python')).toBeInTheDocument()

    // Check stats - use getAllByText for numbers that might appear multiple times
    const starCounts = screen.getAllByText('5')
    expect(starCounts.length).toBeGreaterThan(0)

    const forkCounts = screen.getAllByText('2')
    expect(forkCounts.length).toBeGreaterThan(0)
  })

  it('renders Unity projects section even when axios is pending', async () => {
    mockedAxios.get.mockResolvedValue({ data: mockRepos })

    render(<Projects />)

    // Wait for component to load
    await waitFor(() => {
      expect(screen.getByText('My Projects')).toBeInTheDocument()
    })

    // Check if Unity section is present
    expect(
      screen.getByText((content, element) => {
        return element?.textContent === 'Interactive Unity Projects'
      })
    ).toBeInTheDocument()

    expect(screen.getByText('Solar System')).toBeInTheDocument()
  })

  it('filters out private and forked repositories', async () => {
    const reposWithPrivateAndFork = [
      ...mockRepos,
      {
        id: 3,
        name: 'private-repo',
        private: true,
        fork: false,
        description: 'This is private',
      },
      {
        id: 4,
        name: 'forked-repo',
        private: false,
        fork: true,
        description: 'This is a fork',
      },
    ]

    mockedAxios.get.mockResolvedValue({ data: reposWithPrivateAndFork })

    render(<Projects />)

    await waitFor(() => {
      expect(screen.getByText('robocar')).toBeInTheDocument()
    })

    // Should not show private or forked repos
    expect(screen.queryByText('private-repo')).not.toBeInTheDocument()
    expect(screen.queryByText('forked-repo')).not.toBeInTheDocument()
  })

  it('handles Unity project placeholder correctly', async () => {
    mockedAxios.get.mockResolvedValue({ data: mockRepos })

    render(<Projects />)

    await waitFor(() => {
      expect(screen.getByText('My Projects')).toBeInTheDocument()
    })

    expect(screen.getByText('Unity WebGL Build')).toBeInTheDocument()
    expect(
      screen.getByText(
        'This Unity project can be embedded here once built for WebGL'
      )
    ).toBeInTheDocument()
  })

  it('has external links with proper attributes', async () => {
    mockedAxios.get.mockResolvedValue({ data: mockRepos })

    render(<Projects />)

    await waitFor(() => {
      expect(screen.getByText('robocar')).toBeInTheDocument()
    })

    const githubLinks = screen.getAllByText('View on GitHub')
    githubLinks.forEach(link => {
      expect(link.closest('a')).toHaveAttribute('target', '_blank')
      expect(link.closest('a')).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })
})
