import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Github, ExternalLink, Star, GitFork, Eye, Play } from 'lucide-react'
import axios from 'axios'
import './Projects.css'

const Projects = () => {
  const [repositories, setRepositories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchGitHubRepositories = useCallback(async () => {
    try {
      setLoading(true)
      const response = await axios.get(
        'https://api.github.com/users/adamwickenden/repos',
        {
          params: {
            per_page: 20,
          },
        }
      )

      const repos = response.data
        .filter(repo => !repo.private && !repo.fork)
        .map(repo => ({
          ...repo,
          featured: isFeaturedProject(repo.name),
          type: getProjectType(repo.name),
          techStack: getTechStack(repo),
        }))
        .sort((a, b) => {
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return new Date(b.updated_at) - new Date(a.updated_at)
        })

      setRepositories(repos)
      setError(null)
    } catch (err) {
      console.error('Error fetching repositories:', err)
      setError('Failed to fetch GitHub repositories')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchGitHubRepositories()
  }, [fetchGitHubRepositories])

  // Helper function to determine if a project is featured
  const isFeaturedProject = repoName => {
    const featuredProjects = [
      'robocar',
      'tensorflownbs',
      'solarsystem',
      'modelinterp',
    ]
    return featuredProjects.includes(repoName.toLowerCase())
  }

  // Helper function to categorize projects
  const getProjectType = repoName => {
    const name = repoName.toLowerCase()
    if (
      name.includes('unity') ||
      name.includes('game') ||
      name.includes('solar')
    )
      return 'Game/Unity'
    if (
      name.includes('tensor') ||
      name.includes('ml') ||
      name.includes('model')
    )
      return 'Machine Learning'
    if (
      name.includes('web') ||
      name.includes('react') ||
      name.includes('website')
    )
      return 'Web Development'
    if (name.includes('robot') || name.includes('iot')) return 'Robotics/IoT'
    return 'Software'
  }

  // Helper function to get tech stack from repository
  const getTechStack = repo => {
    const stack = []
    if (repo.language) stack.push(repo.language)

    // Add common technologies based on repository topics or name
    const topics = repo.topics || []
    const name = repo.name.toLowerCase()

    if (topics.includes('react') || name.includes('react')) stack.push('React')
    if (topics.includes('unity') || name.includes('unity')) stack.push('Unity')
    if (topics.includes('tensorflow') || name.includes('tensor'))
      stack.push('TensorFlow')
    if (topics.includes('python') || repo.language === 'Python')
      stack.push('Python')
    if (topics.includes('javascript') || repo.language === 'JavaScript')
      stack.push('JavaScript')
    if (topics.includes('csharp') || repo.language === 'C#') stack.push('C#')
    if (topics.includes('firebase') || name.includes('firebase'))
      stack.push('Firebase')

    return [...new Set(stack)]
  }

  // Helper function to format date
  const formatDate = dateString => {
    return new Date(dateString).toLocaleDateString()
  }

  // Unity Project Component
  const UnityProject = ({ project }) => (
    <div className="unity-embed">
      <div className="unity-header">
        <h4>{project.name}</h4>
        <p>{project.description}</p>
      </div>
      {project.isPlayable ? (
        <div className="unity-canvas">
          <iframe
            src={project.embedUrl}
            width="100%"
            height="400"
            title={project.name}
          />
        </div>
      ) : (
        <div className="unity-placeholder">
          <div className="unity-placeholder-content">
            <Play size={48} />
            <h4>Unity WebGL Build</h4>
            <p>This Unity project can be embedded here once built for WebGL</p>
            <a
              href={project.repository}
              target="_blank"
              rel="noopener noreferrer"
              className="view-source-btn"
            >
              <Github size={20} />
              View Source Code
            </a>
          </div>
        </div>
      )}
    </div>
  )

  UnityProject.propTypes = {
    project: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      isPlayable: PropTypes.bool,
      embedUrl: PropTypes.string,
      repository: PropTypes.string.isRequired,
    }).isRequired,
  }

  if (loading) {
    return (
      <div className="projects">
        <div className="projects-container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading projects from GitHub...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="projects">
        <div className="projects-container">
          <div className="error-message">
            <p>{error}</p>
            <button onClick={fetchGitHubRepositories} className="retry-btn">
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="projects">
      <div className="projects-container">
        <header className="projects-header">
          <h1>My Projects</h1>
          <p>
            A collection of my software development projects, from machine
            learning to web applications and Unity games.
          </p>
        </header>

        {/* Unity Projects Section */}
        <section className="unity-section">
          <h2 className="section-title">
            <Play size={24} />
            Interactive Unity Projects
          </h2>
          <div className="unity-projects">
            <UnityProject
              project={{
                name: 'Solar System',
                description:
                  'Interactive 3D solar system simulation built with Unity',
                isPlayable: false,
                repository: 'https://github.com/adamwickenden/solarsystem',
              }}
            />
          </div>
        </section>

        {/* GitHub Repositories Section */}
        <section className="repositories-section">
          <h2 className="section-title">
            <Github size={24} />
            GitHub Repositories
          </h2>
          <div className="repositories-grid">
            {repositories.map(repo => (
              <div
                key={repo.id}
                className={`repository-card ${repo.featured ? 'featured' : ''}`}
              >
                {repo.featured && (
                  <div className="featured-badge">Featured</div>
                )}
                <div className="repo-header">
                  <h3 className="repo-name">{repo.name}</h3>
                  <span className="repo-type">{repo.type}</span>
                </div>
                <p className="repo-description">
                  {repo.description || 'No description available'}
                </p>
                <div className="repo-stats">
                  <div className="stat">
                    <Star size={16} />
                    <span>{repo.stargazers_count}</span>
                  </div>
                  <div className="stat">
                    <GitFork size={16} />
                    <span>{repo.forks_count}</span>
                  </div>
                  <div className="stat">
                    <Eye size={16} />
                    <span>{repo.watchers_count}</span>
                  </div>
                </div>
                <div className="repo-tech">
                  {repo.techStack.map((tech, index) => (
                    <span key={index} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="repo-footer">
                  <span className="repo-updated">
                    Updated {formatDate(repo.updated_at)}
                  </span>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="repo-link"
                  >
                    <Github size={16} />
                    View on GitHub
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Projects
