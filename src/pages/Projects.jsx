import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Github, ExternalLink, Star, GitFork, Eye, Play } from 'lucide-react'
import axios from 'axios'
import './Projects.css'

const Projects = () => {
  const [repositories, setRepositories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeUnityProject, setActiveUnityProject] = useState(0)

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
          type: getProjectType(repo),
          techStack: getTechStack(repo),
        }))
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))

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

  // Helper function to categorize projects based on topics only
  const getProjectType = repo => {
    const topics = repo.topics || []

    if (topics.includes('unity')) return 'Unity'
    if (topics.includes('machine-learning')) return 'Machine Learning'
    if (topics.includes('frontend')) return 'Frontend'
    if (topics.includes('rpi')) return 'Raspberry Pi'
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

  // Filter functions for different sections
  const getUnityProjects = () => {
    return repositories.filter(
      repo => repo.topics && repo.topics.includes('unity')
    )
  }

  const getMachineLearningProjects = () => {
    return repositories.filter(
      repo => repo.topics && repo.topics.includes('machine-learning')
    )
  }

  const getFrontendProjects = () => {
    return repositories.filter(
      repo => repo.topics && repo.topics.includes('frontend')
    )
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
      <div className="unity-embed">
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
            >
              {project.name}
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
                <span>Updated {formatDate(currentProject.updated_at)}</span>
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
        updated_at: PropTypes.string.isRequired,
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
      updated_at: PropTypes.string.isRequired,
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
