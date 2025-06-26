const { onRequest } = require('firebase-functions/v2/https')
const { setGlobalOptions } = require('firebase-functions/v2')
const { defineSecret } = require('firebase-functions/params')
const admin = require('firebase-admin')
const axios = require('axios')
const cors = require('cors')

admin.initializeApp()

// Set global options for 2nd gen functions
setGlobalOptions({ maxInstances: 10 })

// Define the secret
const githubTokenSecret = defineSecret('GITHUB_TOKEN')

// Configure CORS to allow requests from your domain
const corsHandler = cors({
  origin: [
    'http://localhost:5173',
    'https://adam-wickenden-dev.web.app',
    'https://adam-wickenden.web.app',
  ],
  credentials: true,
})

// GitHub API proxy function (2nd gen)
exports.githubProxy = onRequest(
  {
    secrets: [githubTokenSecret],
  },
  (req, res) => {
    return corsHandler(req, res, async () => {
      try {
        // Only allow GET requests
        if (req.method !== 'GET') {
          return res.status(405).json({ error: 'Method not allowed' })
        }

        // Get the GitHub token from secrets (server-side only)
        const githubToken = githubTokenSecret.value()

        if (!githubToken) {
          console.error('GitHub token not configured')
          return res.status(500).json({
            error: 'GitHub token not configured',
            message:
              'Please set the GITHUB_TOKEN environment variable in Firebase Functions',
          })
        }

        // Extract the GitHub API path from query parameters
        const { path, ...queryParams } = req.query

        if (!path) {
          return res.status(400).json({ error: 'Missing path parameter' })
        }

        // Validate that the path is for GitHub API
        if (!path.startsWith('users/') && !path.startsWith('repos/')) {
          return res.status(400).json({ error: 'Invalid GitHub API path' })
        }

        // Construct the GitHub API URL
        const githubUrl = `https://api.github.com/${path}`

        // Make the request to GitHub API with authentication
        const response = await axios.get(githubUrl, {
          headers: {
            Authorization: `token ${githubToken}`,
            Accept: 'application/vnd.github.v3+json',
          },
          params: queryParams,
        })

        // Return the response data
        return res.json(response.data)
      } catch (error) {
        console.error(
          'GitHub API proxy error:',
          error.response?.data || error.message
        )

        if (error.response) {
          // GitHub API error
          return res.status(error.response.status).json({
            error: error.response.data?.message || 'GitHub API error',
            status: error.response.status,
          })
        } else {
          // Network or other error
          return res.status(500).json({
            error: 'Internal server error',
            message: error.message,
          })
        }
      }
    })
  }
)

// Health check endpoint (2nd gen)
exports.healthCheck = onRequest((req, res) => {
  return corsHandler(req, res, () => {
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      message: 'Firebase Functions are running',
    })
  })
})
