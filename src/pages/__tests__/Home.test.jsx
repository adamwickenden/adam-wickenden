import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Home from '../Home'

describe('Home Component', () => {
  it('renders personal information correctly', () => {
    render(<Home />)

    expect(screen.getByText('Adam Wickenden')).toBeInTheDocument()
    expect(
      screen.getByText('Software Developer & Technology Enthusiast')
    ).toBeInTheDocument()
    expect(screen.getByText('United Kingdom')).toBeInTheDocument()
  })

  it('renders contact information', () => {
    render(<Home />)

    expect(screen.getByText('contact@adamwickenden.com')).toBeInTheDocument()
    expect(screen.getByText('United Kingdom')).toBeInTheDocument()
  })

  it('renders social links with correct URLs', () => {
    render(<Home />)

    const linkedinLink = screen.getByRole('link', { name: /linkedin/i })
    const githubLink = screen.getByRole('link', { name: /github/i })
    const cvLink = screen.getByRole('link', { name: /view cv/i })

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

  it('renders technical skills section', () => {
    render(<Home />)

    expect(screen.getByText('Technical Skills')).toBeInTheDocument()

    // Check for some key skills
    expect(screen.getByText('Python')).toBeInTheDocument()
    expect(screen.getByText('JavaScript')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TensorFlow')).toBeInTheDocument()
  })

  it('renders about section', () => {
    render(<Home />)

    expect(screen.getByText('About Me')).toBeInTheDocument()
    // Use getAllByText for text that appears multiple times
    const passionateTexts = screen.getAllByText(
      /passionate software developer/i
    )
    expect(passionateTexts.length).toBeGreaterThan(0)
  })

  it('has proper semantic structure', () => {
    render(<Home />)

    const homeContainer = document.querySelector('.home')
    expect(homeContainer).toBeInTheDocument()

    const headings = screen.getAllByRole('heading')
    expect(headings.length).toBeGreaterThan(0)
  })

  it('renders profile image placeholder', () => {
    render(<Home />)

    const profilePlaceholder = document.querySelector('.profile-placeholder')
    expect(profilePlaceholder).toBeInTheDocument()
  })

  it('has all social links open in new tab', () => {
    render(<Home />)

    const externalLinks = screen
      .getAllByRole('link')
      .filter(link => link.getAttribute('href')?.startsWith('http'))

    externalLinks.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  it('renders bio text', () => {
    render(<Home />)

    // Check for multiple instances of these terms
    const passionateTexts = screen.getAllByText(
      /passionate software developer/i
    )
    const machineLearningTexts = screen.getAllByText(/machine learning/i)
    const roboticsTexts = screen.getAllByText(/robotics/i)

    expect(passionateTexts.length).toBeGreaterThan(0)
    expect(machineLearningTexts.length).toBeGreaterThan(0)
    expect(roboticsTexts.length).toBeGreaterThan(0)
  })
})
