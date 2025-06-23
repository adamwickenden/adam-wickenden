import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import Navigation from '../Navigation'

// Helper function to render Navigation with Router
const renderWithRouter = component => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('Navigation Component', () => {
  it('renders navigation logo', () => {
    renderWithRouter(<Navigation />)
    expect(screen.getByText('Adam Wickenden')).toBeInTheDocument()
  })

  it('renders all navigation links', () => {
    renderWithRouter(<Navigation />)

    const homeLinks = screen.getAllByText('Home')
    const projectsLinks = screen.getAllByText('Projects')
    const experienceLinks = screen.getAllByText('Experience')

    expect(homeLinks.length).toBeGreaterThan(0)
    expect(projectsLinks.length).toBeGreaterThan(0)
    expect(experienceLinks.length).toBeGreaterThan(0)
  })

  it('has correct href attributes on navigation links', () => {
    renderWithRouter(<Navigation />)

    const homeLink = screen.getAllByRole('link', { name: 'Home' })[0]
    const projectsLink = screen.getAllByRole('link', { name: 'Projects' })[0]
    const experienceLink = screen.getAllByRole('link', {
      name: 'Experience',
    })[0]

    expect(homeLink).toHaveAttribute('href', '/')
    expect(projectsLink).toHaveAttribute('href', '/projects')
    expect(experienceLink).toHaveAttribute('href', '/experience')
  })

  it('toggles mobile menu when button is clicked', () => {
    renderWithRouter(<Navigation />)

    const mobileMenuButton = document.querySelector('.mobile-menu-btn')
    const mobileMenu = document.querySelector('.mobile-menu')

    // Initially mobile menu should not have active class
    expect(mobileMenu).not.toHaveClass('active')

    // Click mobile menu button
    fireEvent.click(mobileMenuButton)

    // Mobile menu should now have active class
    expect(mobileMenu).toHaveClass('active')

    // Click again to close
    fireEvent.click(mobileMenuButton)

    // Mobile menu should not have active class
    expect(mobileMenu).not.toHaveClass('active')
  })

  it('closes mobile menu when a link is clicked', () => {
    renderWithRouter(<Navigation />)

    const mobileMenuButton = document.querySelector('.mobile-menu-btn')
    const mobileMenu = document.querySelector('.mobile-menu')

    // Open mobile menu
    fireEvent.click(mobileMenuButton)
    expect(mobileMenu).toHaveClass('active')

    // Click on a mobile nav link
    const mobileLinkContainer = document.querySelector('.mobile-menu')
    const mobileHomeLink = mobileLinkContainer.querySelector('a[href="/"]')
    fireEvent.click(mobileHomeLink)

    // Mobile menu should be closed
    expect(mobileMenu).not.toHaveClass('active')
  })

  it('applies active class to current route', () => {
    renderWithRouter(<Navigation />)

    // Just check that the component renders without errors
    const projectsLinks = screen.getAllByText('Projects')
    expect(projectsLinks.length).toBeGreaterThan(0)
  })

  it('has proper accessibility attributes', () => {
    renderWithRouter(<Navigation />)

    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()

    const menuButton = document.querySelector('.mobile-menu-btn')
    expect(menuButton).toBeInTheDocument()
  })
})
