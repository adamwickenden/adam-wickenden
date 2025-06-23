import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Experience from '../Experience'

describe('Experience Component', () => {
  it('renders page header correctly', () => {
    render(<Experience />)

    expect(screen.getByText('Professional Experience')).toBeInTheDocument()
    expect(
      screen.getByText(/my journey in software development/i)
    ).toBeInTheDocument()
  })

  it('renders CV download link', () => {
    render(<Experience />)

    const cvLink = screen.getByRole('link', { name: /view full cv/i })
    expect(cvLink).toHaveAttribute(
      'href',
      expect.stringContaining('docs.google.com')
    )
    expect(cvLink).toHaveAttribute('target', '_blank')
    expect(cvLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders work experience section', () => {
    render(<Experience />)

    expect(screen.getByText('Work Experience')).toBeInTheDocument()
    expect(screen.getByText('Software Developer')).toBeInTheDocument()
    expect(screen.getByText('Technology Solutions Ltd')).toBeInTheDocument()
    expect(screen.getByText('2023 - Present')).toBeInTheDocument()
  })

  it('renders education section', () => {
    render(<Experience />)

    expect(screen.getByText('Education')).toBeInTheDocument()
    expect(
      screen.getByText('Bachelor of Science in Computer Science')
    ).toBeInTheDocument()
    expect(screen.getByText('University of Technology')).toBeInTheDocument()
  })

  it('renders certifications section', () => {
    render(<Experience />)

    expect(screen.getByText('Certifications')).toBeInTheDocument()
    expect(
      screen.getByText('TensorFlow Developer Certificate')
    ).toBeInTheDocument()
    expect(
      screen.getByText('AWS Certified Cloud Practitioner')
    ).toBeInTheDocument()
  })

  it('renders skills section with categories', () => {
    render(<Experience />)

    expect(screen.getByText('Skills & Technologies')).toBeInTheDocument()
    expect(screen.getByText('Programming Languages')).toBeInTheDocument()
    expect(screen.getByText('Frameworks & Libraries')).toBeInTheDocument()
    expect(screen.getByText('Tools & Technologies')).toBeInTheDocument()
    expect(screen.getByText('Soft Skills')).toBeInTheDocument()
  })

  it('displays job achievements correctly', () => {
    render(<Experience />)

    expect(
      screen.getByText(/developed machine learning models/i)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/built responsive web applications/i)
    ).toBeInTheDocument()
  })

  it('displays education modules', () => {
    render(<Experience />)

    expect(
      screen.getByText('Artificial Intelligence & Machine Learning')
    ).toBeInTheDocument()
    expect(screen.getByText('Software Engineering')).toBeInTheDocument()
  })

  it('displays technology tags for jobs', () => {
    render(<Experience />)

    // Check for technology tags - use getAllByText for technologies that appear in multiple sections
    const pythonElements = screen.getAllByText('Python')
    expect(pythonElements.length).toBeGreaterThan(0)

    const reactElements = screen.getAllByText('React')
    expect(reactElements.length).toBeGreaterThan(0)

    const tensorFlowElements = screen.getAllByText('TensorFlow')
    expect(tensorFlowElements.length).toBeGreaterThan(0)
  })

  it('shows timeline markers for experience items', () => {
    render(<Experience />)

    // Check for timeline elements
    const timelineItems = document.querySelectorAll('.timeline-item')
    expect(timelineItems.length).toBeGreaterThan(0)

    const timelineMarkers = document.querySelectorAll('.timeline-marker')
    expect(timelineMarkers.length).toBeGreaterThan(0)
  })

  it('displays duration information', () => {
    render(<Experience />)

    expect(screen.getByText('2023 - Present')).toBeInTheDocument()
    expect(screen.getByText('2022 - 2023')).toBeInTheDocument()
    expect(screen.getByText('2019 - 2022')).toBeInTheDocument()
  })

  it('shows location information', () => {
    render(<Experience />)

    // Use getAllByText for locations that appear multiple times
    const ukLocations = screen.getAllByText('United Kingdom')
    expect(ukLocations.length).toBeGreaterThan(0)
  })

  it('renders certification details correctly', () => {
    render(<Experience />)

    expect(screen.getByText('Issued by Google')).toBeInTheDocument()
    expect(
      screen.getByText('Issued by Amazon Web Services')
    ).toBeInTheDocument()
    // Use getAllByText for dates that appear multiple times
    const dates2023 = screen.getAllByText('2023')
    expect(dates2023.length).toBeGreaterThan(0)
  })

  it('has proper semantic structure with headings', () => {
    render(<Experience />)

    // Check for proper heading hierarchy
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    const h2Headings = screen.getAllByRole('heading', { level: 2 })
    expect(h2Headings.length).toBeGreaterThan(0)
  })

  it('renders skill categories with multiple skills', () => {
    render(<Experience />)

    // Programming Languages - use getAllByText for technologies that appear multiple times
    const pythonElements = screen.getAllByText('Python')
    expect(pythonElements.length).toBeGreaterThan(0)

    const jsElements = screen.getAllByText('JavaScript')
    expect(jsElements.length).toBeGreaterThan(0)

    // Frameworks - use getAllByText for technologies that appear in multiple sections
    const nodeJsElements = screen.getAllByText('Node.js')
    expect(nodeJsElements.length).toBeGreaterThan(0)

    const tensorFlowElements = screen.getAllByText('TensorFlow')
    expect(tensorFlowElements.length).toBeGreaterThan(0)

    // Tools - use getAllByText for tools that appear in multiple sections
    const gitElements = screen.getAllByText('Git')
    expect(gitElements.length).toBeGreaterThan(0)

    const dockerElements = screen.getAllByText('Docker')
    expect(dockerElements.length).toBeGreaterThan(0)

    // Soft Skills
    expect(screen.getByText('Problem Solving')).toBeInTheDocument()
    expect(screen.getByText('Team Collaboration')).toBeInTheDocument()
  })
})
