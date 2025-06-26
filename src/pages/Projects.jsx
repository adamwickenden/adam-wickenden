import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Github, ExternalLink, Star, GitFork, Eye, Play } from 'lucide-react'
import githubService from '../services/githubService'
import './Projects.css'

const Projects = () => {
  const [repositories, setRepositories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeUnityProject, setActiveUnityProject] = useState(0)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  const fetchGitHubRepositories = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const repositories = await githubService.fetchRepositories({
        per_page: 20,
      })

      setRepositories(repositories)
    } catch (err) {
      console.error('Error fetching repositories:', err)
      setError(err.message || 'Failed to fetch GitHub repositories')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchGitHubRepositories()
  }, [fetchGitHubRepositories])

  // Helper function to format date
  const formatDate = dateString => {
    return new Date(dateString).toLocaleDateString()
  }

  // Filter functions for different sections
  const getUnityProjects = () => {
    return (
      repositories?.filter(
        repo => repo.topics && repo.topics.includes('unity')
      ) || []
    )
  }

  const getMachineLearningProjects = () => {
    return (
      repositories?.filter(
        repo => repo.topics && repo.topics.includes('machine-learning')
      ) || []
    )
  }

  const getFrontendProjects = () => {
    return (
      repositories?.filter(
        repo => repo.topics && repo.topics.includes('frontend')
      ) || []
    )
  }

  // Touch handlers for swipe navigation
  const handleTouchStart = e => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = e => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = projects => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe && activeUnityProject < projects.length - 1) {
      setActiveUnityProject(activeUnityProject + 1)
    }
    if (isRightSwipe && activeUnityProject > 0) {
      setActiveUnityProject(activeUnityProject - 1)
    }
  }

  // Unity Project Component with Navigation (for GitHub repositories)
  const UnityProjectViewer = ({ projects, activeIndex, onProjectChange }) => {
    if (!projects || projects.length === 0) {
      return (
        <div className="unity-embed">
          <div className="unity-placeholder">
            <div className="unity-placeholder-content">
              <Play size={48} />
              <h4>Unity Projects</h4>
              <p>
                No Unity projects found. Add the &quot;unity&quot; topic to your
                GitHub repositories to display them here.
              </p>
            </div>
          </div>
        </div>
      )
    }

    const currentProject = projects[activeIndex]

    return (
      <div
        className="unity-embed"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={() => handleTouchEnd(projects)}
      >
        <div className="unity-header">
          <h4>{currentProject.name}</h4>
          <p>{currentProject.description || 'No description available'}</p>
        </div>

        {/* Project Navigation */}
        <div className="unity-navigation">
          {projects.map((project, index) => (
            <button
              key={project.id}
              className={`unity-nav-btn ${index === activeIndex ? 'active' : ''}`}
              onClick={() => onProjectChange(index)}
              title={project.name}
            >
              {project.name.length > 12
                ? `${project.name.substring(0, 12)}...`
                : project.name}
            </button>
          ))}
        </div>

        <div className="unity-placeholder">
          <div className="unity-placeholder-content">
            <Play size={48} />
            <h4>Unity WebGL Build</h4>
            <p>This Unity project can be embedded here once built for WebGL</p>
            <div className="unity-tech-stack">
              {currentProject.techStack.map((tech, index) => (
                <span key={index} className="tech-tag">
                  {tech}
                </span>
              ))}
            </div>
            <div className="unity-stats">
              <div className="stat">
                <Star size={16} />
                <span>{currentProject.stargazers_count}</span>
              </div>
              <div className="stat">
                <GitFork size={16} />
                <span>{currentProject.forks_count}</span>
              </div>
              <div className="stat">
                <span>
                  Last commit {formatDate(currentProject.last_commit_date)}
                </span>
              </div>
            </div>
            <a
              href={currentProject.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="view-source-btn"
            >
              <Github size={20} />
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    )
  }

  UnityProjectViewer.propTypes = {
    projects: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
        html_url: PropTypes.string.isRequired,
        techStack: PropTypes.arrayOf(PropTypes.string).isRequired,
        stargazers_count: PropTypes.number.isRequired,
        forks_count: PropTypes.number.isRequired,
        last_commit_date: PropTypes.string.isRequired,
      })
    ).isRequired,
    activeIndex: PropTypes.number.isRequired,
    onProjectChange: PropTypes.func.isRequired,
  }

  // Repository Card Component
  const RepositoryCard = ({ repo }) => (
    <div className="repository-card">
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
          Last commit {formatDate(repo.last_commit_date)}
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
  )

  RepositoryCard.propTypes = {
    repo: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,

      type: PropTypes.string,
      stargazers_count: PropTypes.number.isRequired,
      forks_count: PropTypes.number.isRequired,
      watchers_count: PropTypes.number.isRequired,
      techStack: PropTypes.arrayOf(PropTypes.string).isRequired,
      last_commit_date: PropTypes.string.isRequired,
      html_url: PropTypes.string.isRequired,
    }).isRequired,
  }

  if (loading) {
    return (
      <div className="projects">
        <div className="projects-container">
          <div className="loading-spinner">
            <div className="spinner"></div>
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

  const unityProjects = getUnityProjects()
  const machineLearningProjects = getMachineLearningProjects()
  const frontendProjects = getFrontendProjects()

  return (
    <div className="projects">
      <div className="projects-container">
        <header className="projects-header">
          <h1>My Projects</h1>
          <p>
            A collection of my software development projects, from Unity games
            to machine learning and web applications.
          </p>
        </header>

        {/* Interactive Unity Projects Section */}
        <section className="unity-section">
          <h2 className="section-title">
            <Play size={24} />
            Interactive Unity Projects
          </h2>
          <div className="unity-projects">
            <UnityProjectViewer
              projects={unityProjects}
              activeIndex={Math.min(
                activeUnityProject,
                Math.max(0, unityProjects.length - 1)
              )}
              onProjectChange={setActiveUnityProject}
            />
          </div>
        </section>

        {/* Machine Learning Projects Section */}
        <section className="repositories-section">
          <h2 className="section-title">
            <Github size={24} />
            Machine Learning Projects
          </h2>
          {machineLearningProjects.length > 0 ? (
            <div className="repositories-grid">
              {machineLearningProjects.map(repo => (
                <RepositoryCard key={repo.id} repo={repo} />
              ))}
            </div>
          ) : (
            <div className="no-projects-message">
              <p>
                No machine learning projects found. Add the
                &quot;machine-learning&quot; topic to your GitHub repositories
                to display them here.
              </p>
            </div>
          )}
        </section>

        {/* Frontend Projects Section */}
        <section className="repositories-section">
          <h2 className="section-title">
            <ExternalLink size={24} />
            Frontend Projects
          </h2>
          {frontendProjects.length > 0 ? (
            <div className="repositories-grid">
              {frontendProjects.map(repo => (
                <RepositoryCard key={repo.id} repo={repo} />
              ))}
            </div>
          ) : (
            <div className="no-projects-message">
              <p>
                No frontend projects found. Add the &quot;frontend&quot; topic
                to your GitHub repositories to display them here.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default Projects
