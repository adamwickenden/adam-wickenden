import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'
import Projects from '../Projects'

// Mock axios
vi.mock('axios')
const mockedAxios = axios

// Mock data for GitHub repositories with proper topics
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
    topics: ['robotics', 'python', 'unity'],
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
  {
    id: 3,
    name: 'portfolio-website',
    description: 'Personal portfolio website built with React',
    html_url: 'https://github.com/adamwickenden/portfolio-website',
    language: 'JavaScript',
    stargazers_count: 8,
    forks_count: 1,
    watchers_count: 3,
    updated_at: '2023-03-10T09:15:00Z',
    fork: false,
    private: false,
    topics: ['react', 'frontend', 'javascript'],
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

    expect(document.querySelector('.spinner')).toBeInTheDocument()
  })

  it('renders projects after successful API call', async () => {
    // Mock successful API response for repos and commits
    mockedAxios.get
      .mockResolvedValueOnce({ data: mockRepos })
      .mockResolvedValue({
        data: [
          {
            commit: {
              author: {
                date: '2023-03-10T10:00:00Z',
              },
            },
          },
        ],
      })

    render(<Projects />)

    // Wait for the component to update
    await waitFor(() => {
      expect(screen.getByText('My Projects')).toBeInTheDocument()
    })

    // Use getAllByText for project names that appear multiple times due to different sections
    const robocarElements = screen.getAllByText('robocar')
    expect(robocarElements.length).toBeGreaterThan(0)

    expect(screen.getByText('TensorFlowNBs')).toBeInTheDocument()
    expect(screen.getByText('portfolio-website')).toBeInTheDocument()
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
    mockedAxios.get
      .mockResolvedValueOnce({ data: mockRepos })
      .mockResolvedValue({
        data: [
          {
            commit: {
              author: {
                date: '2023-03-10T10:00:00Z',
              },
            },
          },
        ],
      })

    render(<Projects />)

    await waitFor(() => {
      expect(screen.getByText('TensorFlowNBs')).toBeInTheDocument()
    })

    // Check repository details
    expect(
      screen.getByText('TensorFlow Training notebooks')
    ).toBeInTheDocument()

    // Check stats - use getAllByText for numbers that might appear multiple times
    const starCounts = screen.getAllByText('10')
    expect(starCounts.length).toBeGreaterThan(0)

    const forkCounts = screen.getAllByText('3')
    expect(forkCounts.length).toBeGreaterThan(0)
  })

  it('renders Unity projects section correctly', async () => {
    mockedAxios.get
      .mockResolvedValueOnce({ data: mockRepos })
      .mockResolvedValue({
        data: [
          {
            commit: {
              author: {
                date: '2023-03-10T10:00:00Z',
              },
            },
          },
        ],
      })

    render(<Projects />)

    // Wait for component to load
    await waitFor(() => {
      expect(screen.getByText('My Projects')).toBeInTheDocument()
    })

    // Check if Unity section is present
    expect(screen.getByText('Interactive Unity Projects')).toBeInTheDocument()

    // Should show the Unity project from mock data - use getAllByText for multiple occurrences
    const robocarElements = screen.getAllByText('robocar')
    expect(robocarElements.length).toBeGreaterThan(0)
  })

  it('renders Machine Learning projects section correctly', async () => {
    mockedAxios.get
      .mockResolvedValueOnce({ data: mockRepos })
      .mockResolvedValue({
        data: [
          {
            commit: {
              author: {
                date: '2023-03-10T10:00:00Z',
              },
            },
          },
        ],
      })

    render(<Projects />)

    await waitFor(() => {
      expect(screen.getByText('My Projects')).toBeInTheDocument()
    })

    // Check if ML section is present
    expect(screen.getByText('Machine Learning Projects')).toBeInTheDocument()

    // Should show the ML project from mock data
    expect(screen.getByText('TensorFlowNBs')).toBeInTheDocument()
  })

  it('renders Frontend projects section correctly', async () => {
    mockedAxios.get
      .mockResolvedValueOnce({ data: mockRepos })
      .mockResolvedValue({
        data: [
          {
            commit: {
              author: {
                date: '2023-03-10T10:00:00Z',
              },
            },
          },
        ],
      })

    render(<Projects />)

    await waitFor(() => {
      expect(screen.getByText('My Projects')).toBeInTheDocument()
    })

    // Check if Frontend section is present
    expect(screen.getByText('Frontend Projects')).toBeInTheDocument()

    // Should show the Frontend project from mock data
    expect(screen.getByText('portfolio-website')).toBeInTheDocument()
  })

  it('filters out private and forked repositories', async () => {
    const reposWithPrivateAndFork = [
      ...mockRepos,
      {
        id: 4,
        name: 'private-repo',
        private: true,
        fork: false,
        description: 'This is private',
        topics: ['machine-learning'],
      },
      {
        id: 5,
        name: 'forked-repo',
        private: false,
        fork: true,
        description: 'This is a fork',
        topics: ['frontend'],
      },
    ]

    mockedAxios.get
      .mockResolvedValueOnce({ data: reposWithPrivateAndFork })
      .mockResolvedValue({
        data: [
          {
            commit: {
              author: {
                date: '2023-03-10T10:00:00Z',
              },
            },
          },
        ],
      })

    render(<Projects />)

    await waitFor(() => {
      expect(screen.getByText('TensorFlowNBs')).toBeInTheDocument()
    })

    // Should not show private or forked repos
    expect(screen.queryByText('private-repo')).not.toBeInTheDocument()
    expect(screen.queryByText('forked-repo')).not.toBeInTheDocument()
  })

  it('handles empty Unity projects correctly', async () => {
    // Mock data without Unity projects
    const reposWithoutUnity = mockRepos.filter(
      repo => !repo.topics.includes('unity')
    )
    mockedAxios.get
      .mockResolvedValueOnce({ data: reposWithoutUnity })
      .mockResolvedValue({
        data: [
          {
            commit: {
              author: {
                date: '2023-03-10T10:00:00Z',
              },
            },
          },
        ],
      })

    render(<Projects />)

    await waitFor(() => {
      expect(screen.getByText('My Projects')).toBeInTheDocument()
    })

    expect(
      screen.getByText(
        'No Unity projects found. Add the "unity" topic to your GitHub repositories to display them here.'
      )
    ).toBeInTheDocument()
  })

  it('has external links with proper attributes', async () => {
    mockedAxios.get
      .mockResolvedValueOnce({ data: mockRepos })
      .mockResolvedValue({
        data: [
          {
            commit: {
              author: {
                date: '2023-03-10T10:00:00Z',
              },
            },
          },
        ],
      })

    render(<Projects />)

    await waitFor(() => {
      expect(screen.getByText('TensorFlowNBs')).toBeInTheDocument()
    })

    const githubLinks = screen.getAllByText('View on GitHub')
    githubLinks.forEach(link => {
      expect(link.closest('a')).toHaveAttribute('target', '_blank')
      expect(link.closest('a')).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  it('displays last commit date instead of updated date', async () => {
    // Mock the initial API call and all subsequent commit calls
    mockedAxios.get
      .mockResolvedValueOnce({ data: mockRepos })
      .mockResolvedValue({
        data: [
          {
            commit: {
              author: {
                date: '2023-03-10T10:00:00Z',
              },
            },
          },
        ],
      })

    render(<Projects />)

    await waitFor(() => {
      expect(screen.getByText('My Projects')).toBeInTheDocument()
    })

    // Wait for async operations to complete and check that "Last commit" text appears
    await waitFor(
      () => {
        // Check that text contains "Last commit" instead of "Updated"
        // Use getAllByText since there are multiple instances (Unity and repository cards)
        const commitTexts = screen.getAllByText(/Last commit/)
        expect(commitTexts.length).toBeGreaterThan(0)
      },
      { timeout: 3000 }
    )
  })
})
