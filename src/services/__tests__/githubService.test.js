import { describe, it, expect } from 'vitest'
import githubService from '../githubService'

describe('GitHub Service', () => {
  it('should be mocked and return test data', async () => {
    const repositories = await githubService.fetchRepositories()

    expect(repositories).toBeDefined()
    expect(Array.isArray(repositories)).toBe(true)
    expect(repositories.length).toBeGreaterThan(0)

    // Check that we have the expected test repositories
    const repoNames = repositories.map(repo => repo.name)
    expect(repoNames).toContain('TensorFlowNBs')
    expect(repoNames).toContain('Unity-Game')
    expect(repoNames).toContain('React-Portfolio')
  })

  it('should return repositories with required properties', async () => {
    const repositories = await githubService.fetchRepositories()

    repositories.forEach(repo => {
      expect(repo).toHaveProperty('id')
      expect(repo).toHaveProperty('name')
      expect(repo).toHaveProperty('description')
      expect(repo).toHaveProperty('html_url')
      expect(repo).toHaveProperty('topics')
      expect(repo).toHaveProperty('stargazers_count')
      expect(repo).toHaveProperty('forks_count')
      expect(repo).toHaveProperty('last_commit_date')
    })
  })
})
