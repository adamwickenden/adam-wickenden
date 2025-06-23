import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { fireEvent } from '@testing-library/react'
import Home from '../Home'

// Mock the CV service
vi.mock('../../services/cvService', () => ({
  default: {
    fetchProfile: vi.fn().mockResolvedValue({
      profile: {
        name: 'Adam Wickenden',
        title: 'Senior Data Scientist',
        location: 'London',
        email: 'adamwickenden94@gmail.com',
        summary:
          'Passionate software developer with experience in machine learning, robotics, and full-stack development.',
      },
    }),
  },
}))

describe('Home Component', () => {
  it('renders loading state initially', () => {
    render(<Home />)

    expect(document.querySelector('.loading-spinner')).toBeInTheDocument()
  })

  it('renders personal information correctly after loading', async () => {
    render(<Home />)

    await waitFor(() => {
      expect(screen.getByText('Adam Wickenden')).toBeInTheDocument()
    })

    expect(screen.getByText('Senior Data Scientist')).toBeInTheDocument()
    expect(screen.getByText('London')).toBeInTheDocument()
  })

  it('renders contact information', async () => {
    render(<Home />)

    await waitFor(() => {
      expect(screen.getByText('adamwickenden94@gmail.com')).toBeInTheDocument()
    })

    expect(screen.getByText('London')).toBeInTheDocument()
  })

  it('renders social links with correct URLs', async () => {
    render(<Home />)

    await waitFor(() => {
      expect(screen.getByText('Adam Wickenden')).toBeInTheDocument()
    })

    const linkedinLink = screen.getByRole('link', { name: /linkedin/i })
    const githubLink = screen.getByRole('link', { name: /github/i })
    const cvLink = screen.getByRole('link', { name: /download cv/i })

    expect(linkedinLink).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/adam-wickenden/'
    )
    expect(githubLink).toHaveAttribute(
      'href',
      'https://github.com/adamwickenden'
    )
    expect(cvLink).toHaveAttribute(
      'href',
      expect.stringContaining('docs.google.com')
    )
  })

  it('renders publications section instead of skills', async () => {
    render(<Home />)

    await waitFor(() => {
      expect(screen.getByText('Publications')).toBeInTheDocument()
    })

    // Check for publication details
    expect(
      screen.getByText(
        'Tracking Rapid Permafrost thaw Through Time: Exploring the Potential of Convolutional Neural Network based Models'
      )
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Felix Rustemeyer.*Adam Wickenden/)
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'IEEE International Symposium on Geoscience and Remote Sensing (IGARSS)'
      )
    ).toBeInTheDocument()
    expect(screen.getByText('2022')).toBeInTheDocument()
  })

  it('renders publication card with interactive elements', async () => {
    render(<Home />)

    await waitFor(() => {
      expect(screen.getByText('Publications')).toBeInTheDocument()
    })

    const publicationCard = document.querySelector('.publication-card')
    expect(publicationCard).toBeInTheDocument()
    expect(publicationCard).toHaveStyle('cursor: pointer')

    // Check for keywords
    expect(screen.getByText('CNN')).toBeInTheDocument()
    expect(screen.getByText('Permafrost')).toBeInTheDocument()
    expect(screen.getByText('Remote Sensing')).toBeInTheDocument()
    expect(screen.getByText('Sentinel-2')).toBeInTheDocument()

    // Check for "View Publication" link
    expect(screen.getByText('View Publication')).toBeInTheDocument()
  })

  it('opens publication link when clicked', async () => {
    // Mock window.open
    const mockOpen = vi.fn()
    vi.stubGlobal('open', mockOpen)

    render(<Home />)

    await waitFor(() => {
      expect(screen.getByText('Publications')).toBeInTheDocument()
    })

    const publicationCard = document.querySelector('.publication-card')
    fireEvent.click(publicationCard)

    expect(mockOpen).toHaveBeenCalledWith(
      'https://cris.maastrichtuniversity.nl/en/publications/tracking-rapid-permafrost-thaw-through-time-exploring-the-potenti',
      '_blank'
    )

    vi.unstubAllGlobals()
  })

  it('renders about section with updated content', async () => {
    render(<Home />)

    await waitFor(() => {
      expect(screen.getByText('About Me')).toBeInTheDocument()
    })

    // Check for the new bio content - use getAllByText for text that appears multiple times
    const seniorDataScientistElements = screen.getAllByText(
      /Senior Data Scientist/
    )
    expect(seniorDataScientistElements.length).toBeGreaterThan(0)

    // Use getAllByText for text that appears multiple times in different sections
    const mlSolutionsElements = screen.getAllByText(
      /machine learning solutions/
    )
    expect(mlSolutionsElements.length).toBeGreaterThan(0)

    expect(screen.getByText(/Radio Frequency analysis/)).toBeInTheDocument()
    expect(screen.getByText(/AWS, Azure, GCP/)).toBeInTheDocument()
  })

  it('has proper semantic structure', async () => {
    render(<Home />)

    await waitFor(() => {
      expect(screen.getByText('Adam Wickenden')).toBeInTheDocument()
    })

    const homeContainer = document.querySelector('.home')
    expect(homeContainer).toBeInTheDocument()

    const headings = screen.getAllByRole('heading')
    expect(headings.length).toBeGreaterThan(0)
  })

  it('renders profile image placeholder', async () => {
    render(<Home />)

    await waitFor(() => {
      expect(screen.getByText('Adam Wickenden')).toBeInTheDocument()
    })

    const profilePlaceholder = document.querySelector('.profile-placeholder')
    expect(profilePlaceholder).toBeInTheDocument()
  })

  it('has all external links open in new tab', async () => {
    render(<Home />)

    await waitFor(() => {
      expect(screen.getByText('Adam Wickenden')).toBeInTheDocument()
    })

    const externalLinks = screen
      .getAllByRole('link')
      .filter(link => link.getAttribute('href')?.startsWith('http'))

    externalLinks.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  it('handles CV service error gracefully', async () => {
    // Mock CV service to throw an error
    const cvService = await import('../../services/cvService')
    vi.mocked(cvService.default.fetchProfile).mockRejectedValueOnce(
      new Error('API Error')
    )

    render(<Home />)

    await waitFor(() => {
      expect(
        screen.getByText('Failed to load profile data. Please try again later.')
      ).toBeInTheDocument()
    })

    // Should still show fallback data
    expect(screen.getByText('Using fallback data...')).toBeInTheDocument()
  })
})
