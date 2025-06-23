import React, { useState, useEffect } from 'react'
import { Github, ExternalLink, Star, GitFork, Eye, Play } from 'lucide-react'
import axios from 'axios'
import './Projects.css'

const Projects = () => {
  const [repositories, setRepositories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Unity projects that can be embedded
  const unityProjects = [
    {
      name: 'Solar System',
      description: 'Interactive 3D solar system simulation built with Unity',
      embedUrl: '/unity/solarsystem/index.html', // Would need to be built and hosted
      repository: 'solarsystem',
      screenshot: '/images/solarsystem-screenshot.png',
      isPlayable: false // Set to true when Unity build is available
    }
  ]

  useEffect(() => {
    fetchGitHubRepositories()
  }, [])

  const fetchGitHubRepositories = async () => {
    try {
      setLoading(true)
      const response = await axios.get('https://api.github.com/users/adamwickenden/repos', {
        params: {
          sort: 'updated',
          per_page: 20
        }
      })

      // Filter out forks and private repos, and add additional project information
      const filteredRepos = response.data
        .filter(repo => !repo.fork && !repo.private)
        .map(repo => ({
          ...repo,
          // Add custom project information based on repository name
          project_type: getProjectType(repo.name),
          tech_stack: getTechStack(repo.language, repo.topics),
          featured: isFeaturedProject(repo.name)
        }))
        .sort((a, b) => {
          // Sort featured projects first
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return new Date(b.updated_at) - new Date(a.updated_at)
        })

      setRepositories(filteredRepos)
    } catch (err) {
      setError('Failed to fetch GitHub repositories')
      console.error('Error fetching repositories:', err)
    } finally {
      setLoading(false)
    }
  }

  const getProjectType = (repoName) => {
    const name = repoName.toLowerCase()
    if (name.includes('unity') || name.includes('game') || name.includes('solar')) return 'Unity/Game'
    if (name.includes('tensor') || name.includes('ml') || name.includes('model')) return 'Machine Learning'
    if (name.includes('web') || name.includes('react') || name.includes('website')) return 'Web Development'
    if (name.includes('robot') || name.includes('iot')) return 'Robotics/IoT'
    return 'Software'
  }

  const getTechStack = (language, topics = []) => {
    const stack = []
    if (language) stack.push(language)
    
    // Add common tech stack items based on topics
    topics.forEach(topic => {
      const topicMap = {
        'react': 'React',
        'unity': 'Unity',
        'tensorflow': 'TensorFlow',
        'python': 'Python',
        'javascript': 'JavaScript',
        'csharp': 'C#',
        'firebase': 'Firebase',
        'machine-learning': 'ML'
      }
      if (topicMap[topic]) stack.push(topicMap[topic])
    })

    return [...new Set(stack)] // Remove duplicates
  }

  const isFeaturedProject = (repoName) => {
    const featuredProjects = ['robocar', 'tensorflownbs', 'solarsystem', 'modelinterp']
    return featuredProjects.includes(repoName.toLowerCase())
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const UnityEmbed = ({ project }) => {
    const [isLoading, setIsLoading] = useState(true)

    return (
      <div className="unity-embed">
        <div className="unity-header">
          <h4>{project.name}</h4>
          <p>{project.description}</p>
        </div>
        
        {project.isPlayable ? (
          <div className="unity-player">
            {isLoading && (
              <div className="unity-loading">
                <Play size={48} />
                <p>Loading Unity WebGL...</p>
              </div>
            )}
            <iframe
              src={project.embedUrl}
              width="100%"
              height="600"
              onLoad={() => setIsLoading(false)}
              style={{ display: isLoading ? 'none' : 'block' }}
            />
          </div>
        ) : (
          <div className="unity-placeholder">
            <div className="unity-placeholder-content">
              <Play size={48} />
              <h4>Unity WebGL Build</h4>
              <p>This Unity project can be embedded here once built for WebGL</p>
              <a 
                href={`https://github.com/adamwickenden/${project.repository}`}
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
          <p>A collection of my software development projects, from machine learning to web applications and Unity games.</p>
        </header>

        {/* Unity Projects Section */}
        {unityProjects.length > 0 && (
          <section className="unity-section">
            <h2 className="section-title">
              <Play size={24} />
              Interactive Unity Projects
            </h2>
            <div className="unity-projects">
              {unityProjects.map((project, index) => (
                <UnityEmbed key={index} project={project} />
              ))}
            </div>
          </section>
        )}

        {/* GitHub Repositories Section */}
        <section className="repositories-section">
          <h2 className="section-title">
            <Github size={24} />
            GitHub Repositories
          </h2>
          
          <div className="repositories-grid">
            {repositories.map((repo) => (
              <div key={repo.id} className={`repository-card ${repo.featured ? 'featured' : ''}`}>
                {repo.featured && <div className="featured-badge">Featured</div>}
                
                <div className="repo-header">
                  <h3 className="repo-name">{repo.name}</h3>
                  <span className="project-type">{repo.project_type}</span>
                </div>

                <p className="repo-description">
                  {repo.description || 'No description available'}
                </p>

                {repo.tech_stack.length > 0 && (
                  <div className="tech-stack">
                    {repo.tech_stack.map((tech, index) => (
                      <span key={index} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                )}

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

                <div className="repo-footer">
                  <span className="updated-date">
                    Updated {formatDate(repo.updated_at)}
                  </span>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="repo-link"
                  >
                    <ExternalLink size={16} />
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