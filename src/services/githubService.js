import axios from 'axios'

class GitHubService {
  constructor() {
    // Use Firebase Functions proxy instead of direct GitHub API
    this.baseURL = this.getProxyBaseURL()
    this.username = 'adamwickenden'

    // Create axios instance for proxy requests
    this.api = axios.create({
      baseURL: this.baseURL,
      headers: {
        Accept: 'application/json',
      },
    })
  }

  /**
   * Get the base URL for the Firebase Functions proxy
   * @returns {string} Proxy base URL
   */
  getProxyBaseURL() {
    // Check if we're in development mode
    if (import.meta.env.DEV) {
      return 'http://localhost:5001/adam-wickenden/us-central1/githubProxy'
    }
    
    // Production URLs - adjust based on your Firebase project
    const hostname = window.location.hostname
    if (hostname.includes('staging')) {
      return 'https://us-central1-adam-wickenden-dev.cloudfunctions.net/githubProxy'
    } else {
      return 'https://us-central1-adam-wickenden.cloudfunctions.net/githubProxy'
    }
  }

  /**
   * Make a request through the Firebase Functions proxy
   * @param {string} path - GitHub API path
   * @param {Object} params - Query parameters
   * @returns {Promise} Axios response
   */
  async proxyRequest(path, params = {}) {
    try {
      const response = await this.api.get('', {
        params: {
          path,
          ...params
        }
      })
      return response
    } catch (error) {
      // Enhanced error handling for proxy requests
      if (error.response?.status === 500 && error.response?.data?.error === 'GitHub token not configured') {
        throw new Error('GitHub token not configured on server. Please contact the administrator.')
      }
      throw error
    }
  }

  /**
   * Fetch user repositories
   * @param {Object} options - Options for fetching repositories
   * @returns {Promise<Array>} Array of repositories
   */
  async fetchRepositories(options = {}) {
    try {
      const {
        per_page = 20,
        sort = 'updated',
        direction = 'desc',
        type = 'owner',
      } = options

      const response = await this.proxyRequest(`users/${this.username}/repos`, {
        per_page,
        sort,
        direction,
        type,
      })

      // Filter out private repos and forks
      const repos = response.data.filter(repo => !repo.private && !repo.fork)

      // Fetch additional data for each repository
      const reposWithDetails = await Promise.all(
        repos.map(async repo => {
          try {
            // Fetch latest commit
            const commitData = await this.fetchLatestCommit(
              repo.owner.login,
              repo.name
            )

            return {
              ...repo,
              type: this.getProjectType(repo),
              techStack: this.getTechStack(repo),
              last_commit_date:
                commitData?.commit?.author?.date || repo.pushed_at,
            }
          } catch (error) {
            console.warn(
              `Failed to fetch commit data for ${repo.name}:`,
              error.message
            )
            // Fallback to basic repo data
            return {
              ...repo,
              type: this.getProjectType(repo),
              techStack: this.getTechStack(repo),
              last_commit_date: repo.pushed_at,
            }
          }
        })
      )

      // Sort by last commit date (most recent first)
      return reposWithDetails.sort(
        (a, b) => new Date(b.last_commit_date) - new Date(a.last_commit_date)
      )
    } catch (error) {
      console.error('Error fetching repositories:', error)

      // Check if it's a rate limit error
      if (
        error.response?.status === 403 &&
        error.response?.headers['x-ratelimit-remaining'] === '0'
      ) {
        const resetTime = new Date(
          error.response.headers['x-ratelimit-reset'] * 1000
        )
        throw new Error(
          `GitHub API rate limit exceeded. Resets at ${resetTime.toLocaleTimeString()}.`
        )
      }

      throw new Error(
        'Failed to fetch GitHub repositories. Please try again later.'
      )
    }
  }

  /**
   * Fetch latest commit for a repository
   * @param {string} owner - Repository owner
   * @param {string} repo - Repository name
   * @returns {Promise<Object>} Latest commit data
   */
  async fetchLatestCommit(owner, repo) {
    try {
      const response = await this.proxyRequest(`repos/${owner}/${repo}/commits`, {
        per_page: 1,
      })
      return response.data[0]
    } catch (error) {
      console.warn(`Failed to fetch latest commit for ${repo}:`, error.message)
      return null
    }
  }

  /**
   * Get project type based on repository topics and language
   * @param {Object} repo - Repository object
   * @returns {string} Project type
   */
  getProjectType(repo) {
    const topics = repo.topics || []
    const language = repo.language?.toLowerCase() || ''

    if (topics.includes('unity')) return 'Unity'
    if (topics.includes('machine-learning') || topics.includes('ml'))
      return 'Machine Learning'
    if (topics.includes('frontend') || topics.includes('web')) return 'Frontend'
    if (topics.includes('rpi') || topics.includes('raspberry-pi'))
      return 'Raspberry Pi'
    if (
      topics.includes('mobile') ||
      topics.includes('android') ||
      topics.includes('ios')
    )
      return 'Mobile'
    if (topics.includes('backend') || topics.includes('api')) return 'Backend'

    // Fallback based on language
    if (['javascript', 'typescript', 'html', 'css'].includes(language))
      return 'Frontend'
    if (['python', 'java', 'go', 'rust'].includes(language)) return 'Backend'
    if (language === 'c#') return 'Unity'

    return 'Other'
  }

  /**
   * Get tech stack based on repository language and topics
   * @param {Object} repo - Repository object
   * @returns {Array<string>} Array of technologies
   */
  getTechStack(repo) {
    const stack = []
    const topics = repo.topics || []
    const name = repo.name.toLowerCase()
    const language = repo.language

    // Add primary language
    if (language) stack.push(language)

    // Add technologies based on topics
    const techMapping = {
      react: 'React',
      vue: 'Vue.js',
      angular: 'Angular',
      nodejs: 'Node.js',
      express: 'Express',
      unity: 'Unity',
      tensorflow: 'TensorFlow',
      pytorch: 'PyTorch',
      firebase: 'Firebase',
      mongodb: 'MongoDB',
      postgresql: 'PostgreSQL',
      mysql: 'MySQL',
      redis: 'Redis',
      docker: 'Docker',
      kubernetes: 'Kubernetes',
      aws: 'AWS',
      gcp: 'Google Cloud',
      azure: 'Azure',
    }

    // Check topics for technologies
    topics.forEach(topic => {
      if (techMapping[topic]) {
        stack.push(techMapping[topic])
      }
    })

    // Check repository name for common patterns
    Object.entries(techMapping).forEach(([key, value]) => {
      if (name.includes(key)) {
        stack.push(value)
      }
    })

    // Language-specific additions
    if (language === 'Python') stack.push('Python')
    if (language === 'JavaScript') stack.push('JavaScript')
    if (language === 'TypeScript') stack.push('TypeScript')
    if (language === 'C#') stack.push('C#')

    // Remove duplicates and return
    return [...new Set(stack)]
  }

  /**
   * Get current rate limit status
   * @returns {Promise<Object>} Rate limit information
   */
  async getRateLimit() {
    try {
      const response = await this.proxyRequest('rate_limit')
      return response.data
    } catch (error) {
      console.error('Error fetching rate limit:', error)
      return null
    }
  }
}

// Export singleton instance
export default new GitHubService()
