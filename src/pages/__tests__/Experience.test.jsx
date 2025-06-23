import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Experience from '../Experience'

// Mock the CV service
vi.mock('../../services/cvService', () => ({
  default: {
    fetchProfile: vi.fn().mockResolvedValue({
      workExperience: [
        {
          title: 'Senior Data Scientist',
          company: 'Faculty.ai',
          startDate: '2021-11-01',
          endDate: null,
          duration: '2+ years',
          location: 'London, UK',
          achievements: [
            'Led drone classification projects using transformer models',
            'Developed signal processing algorithms for radar waveform analysis',
          ],
        },
        {
          title: 'Data Scientist/Software Engineer',
          company: 'Accenture',
          startDate: '2019-03-01',
          endDate: '2021-11-01',
          duration: '2 years 8 months',
          location: 'London, UK',
          achievements: [
            'Built machine learning models for environmental research',
            'Developed full-stack applications for client projects',
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
        },
      ],
      certifications: [
        {
          title: 'Machine Learning Course',
          issuer: 'Coursera - Stanford University (Andrew Ng)',
          issueDate: '2021-02-01',
          credentialId: 'ML-STANFORD-2021',
        },
      ],
    }),
  },
}))

describe('Experience Component', () => {
  it('renders loading state initially', () => {
    render(<Experience />)

    expect(
      screen.getByText('Loading professional experience data...')
    ).toBeInTheDocument()
  })

  it('renders page header correctly after loading', async () => {
    render(<Experience />)

    await waitFor(() => {
      expect(screen.getByText('Professional Experience')).toBeInTheDocument()
    })

    expect(
      screen.getByText(
        /My journey in software development, education, and continuous learning/i
      )
    ).toBeInTheDocument()
  })

  it('renders CV download link', async () => {
    render(<Experience />)

    await waitFor(() => {
      expect(screen.getByText('Professional Experience')).toBeInTheDocument()
    })

    const cvLink = screen.getByRole('link', { name: /view full cv/i })
    expect(cvLink).toHaveAttribute(
      'href',
      expect.stringContaining('docs.google.com')
    )
    expect(cvLink).toHaveAttribute('target', '_blank')
    expect(cvLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders work experience section', async () => {
    render(<Experience />)

    await waitFor(() => {
      expect(screen.getByText('Work Experience')).toBeInTheDocument()
    })

    expect(screen.getByText('Faculty.ai')).toBeInTheDocument()
    expect(screen.getByText('Senior Data Scientist')).toBeInTheDocument()
    // The component displays duration, not date range
    // expect(screen.getByText('Nov 2021 - Present')).toBeInTheDocument()
    expect(screen.getByText('Accenture')).toBeInTheDocument()
    expect(
      screen.getByText('Data Scientist/Software Engineer')
    ).toBeInTheDocument()
  })

  it('renders education section', async () => {
    render(<Experience />)

    await waitFor(() => {
      expect(screen.getByText('Education')).toBeInTheDocument()
    })

    expect(screen.getByText('University of Birmingham')).toBeInTheDocument()
    expect(screen.getByText('MSci Physics')).toBeInTheDocument()
    expect(screen.getByText('1st Class with Honours')).toBeInTheDocument()
  })

  it('renders certifications section', async () => {
    render(<Experience />)

    await waitFor(() => {
      expect(screen.getByText('Certifications')).toBeInTheDocument()
    })

    expect(screen.getByText('Machine Learning Course')).toBeInTheDocument()
    expect(
      screen.getByText(/Coursera - Stanford University/)
    ).toBeInTheDocument()
  })

  it('displays job achievements correctly', async () => {
    render(<Experience />)

    await waitFor(() => {
      expect(screen.getByText('Work Experience')).toBeInTheDocument()
    })

    expect(
      screen.getByText(/Led drone classification projects/i)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Built machine learning models/i)
    ).toBeInTheDocument()
  })

  it('shows timeline markers for experience items', async () => {
    render(<Experience />)

    await waitFor(() => {
      expect(screen.getByText('Professional Experience')).toBeInTheDocument()
    })

    // Check for timeline elements
    const timelineItems = document.querySelectorAll('.timeline-item')
    expect(timelineItems.length).toBeGreaterThan(0)

    const timelineMarkers = document.querySelectorAll('.timeline-marker')
    expect(timelineMarkers.length).toBeGreaterThan(0)
  })

  it('displays duration information', async () => {
    render(<Experience />)

    await waitFor(() => {
      expect(screen.getByText('2+ years')).toBeInTheDocument()
    })

    expect(screen.getByText('2 years 8 months')).toBeInTheDocument()
    expect(screen.getByText('4 years')).toBeInTheDocument()
  })

  it('shows location information', async () => {
    render(<Experience />)

    await waitFor(() => {
      expect(screen.getByText('Professional Experience')).toBeInTheDocument()
    })

    // Use getAllByText for locations that appear multiple times
    const londonLocations = screen.getAllByText('London, UK')
    expect(londonLocations.length).toBeGreaterThan(0)
  })

  it('renders certification details correctly', async () => {
    render(<Experience />)

    await waitFor(() => {
      expect(screen.getByText('Certifications')).toBeInTheDocument()
    })

    expect(
      screen.getByText(/Coursera - Stanford University/)
    ).toBeInTheDocument()
    expect(screen.getByText(/Issued: February 2021/)).toBeInTheDocument()
  })

  it('has proper semantic structure with headings', async () => {
    render(<Experience />)

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    })

    const h2Headings = screen.getAllByRole('heading', { level: 2 })
    expect(h2Headings.length).toBeGreaterThan(0)
  })

  it('handles CV service error gracefully', async () => {
    // Mock CV service to throw an error
    const cvService = await import('../../services/cvService')
    vi.mocked(cvService.default.fetchProfile).mockRejectedValueOnce(
      new Error('API Error')
    )

    render(<Experience />)

    await waitFor(() => {
      expect(
        screen.getByText(
          'Failed to load experience data. Please try again later.'
        )
      ).toBeInTheDocument()
    })

    // Should still show retry button
    expect(screen.getByText('Retry')).toBeInTheDocument()
  })
})
