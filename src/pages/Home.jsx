import React, { useState, useEffect } from 'react'
import {
  MapPin,
  Mail,
  Linkedin,
  Github,
  Download,
  Loader,
  ExternalLink,
  Calendar,
  BookOpen,
} from 'lucide-react'
import cvService from '../services/cvService'
import './Home.css'

const Home = () => {
  const [profileData, setProfileData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch CV profile data
        const cvData = await cvService.fetchProfile()

        // Transform the data for the Home component
        setProfileData({
          profile: cvData.profile,
        })
      } catch (err) {
        console.error('Error fetching profile data:', err)
        setError('Failed to load profile data. Please try again later.')

        // Fallback to static data on error
        setProfileData({
          profile: {
            name: 'Adam Wickenden',
            title: 'Senior Data Scientist',
            location: 'London',
            email: 'adamwickenden94@gmail.com',
            summary:
              'Passionate software developer with experience in machine learning, robotics, and full-stack development.',
          },
        })
      } finally {
        setLoading(false)
      }
    }

    fetchProfileData()
  }, [])

  const publication = {
    title:
      'Tracking Rapid Permafrost thaw Through Time: Exploring the Potential of Convolutional Neural Network based Models',
    authors:
      'Felix Rustemeyer*, Julia Barrott, Matthew Fielding, Adam Wickenden, Gustaf Hugelius, Alexia Briassouli',
    year: '2022',
    journal:
      'IEEE International Symposium on Geoscience and Remote Sensing (IGARSS)',
    summary:
      'This research presents the use of convolutional neural network (CNN) models to remotely detect and monitor retrogressive thaw slumps in northern permafrost using Sentinel-2 satellite data. The study achieved strong model performance (precision, recall, and F1 scores > 0.8) and demonstrates the potential for automated monitoring of rapid environmental changes in permafrost regions, representing a crucial step toward understanding greenhouse gas emissions from permafrost thaw.',
    url: 'https://cris.maastrichtuniversity.nl/en/publications/tracking-rapid-permafrost-thaw-through-time-exploring-the-potenti',
    type: 'Conference Paper',
    keywords: [
      'CNN',
      'Permafrost',
      'Remote Sensing',
      'Sentinel-2',
      'Machine Learning',
    ],
  }

  const handleImageError = e => {
    e.target.style.display = 'none'
    e.target.nextElementSibling.style.display = 'flex'
  }

  if (loading) {
    return (
      <div className="home">
        <div className="home-container">
          <div className="loading-container">
            <Loader className="loading-spinner" size={48} />
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="home">
        <div className="home-container">
          <div className="error-container">
            <p className="error-message">{error}</p>
            <p className="error-fallback">Using fallback data...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!profileData) {
    return (
      <div className="home">
        <div className="home-container">
          <p>No profile data available.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="home">
      <div className="home-container">
        <section className="hero-section">
          <div className="hero-content">
            <div className="profile-image-container">
              <div className="profile-image">
                <img
                  src="/api/placeholder/200/200"
                  alt="Adam Wickenden"
                  onError={handleImageError}
                />
                <div
                  className="profile-placeholder"
                  style={{ display: 'none' }}
                >
                  AW
                </div>
              </div>
            </div>
            <div className="hero-text">
              <h1 className="hero-title">{profileData.profile.name}</h1>
              <h2 className="hero-subtitle">{profileData.profile.title}</h2>
              <p className="hero-bio">{profileData.profile.summary}</p>

              <div className="contact-info">
                <div className="contact-item">
                  <MapPin size={18} />
                  <span>{profileData.profile.location}</span>
                </div>
                <div className="contact-item">
                  <Mail size={18} />
                  <span>{profileData.profile.email}</span>
                </div>
              </div>

              <div className="social-links">
                <a
                  href="https://www.linkedin.com/in/adam-wickenden/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link linkedin"
                >
                  <Linkedin size={20} />
                  LinkedIn
                </a>
                <a
                  href="https://github.com/adamwickenden"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link github"
                >
                  <Github size={20} />
                  GitHub
                </a>
                <a
                  href="https://docs.google.com/document/d/1kmsXrstfrHF06BXpY6L8Hkc06zWEioAV/export?format=pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link cv"
                >
                  <Download size={20} />
                  Download CV
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="publications-section">
          <div className="section-content">
            <h3 className="section-title">Publications</h3>
            <div
              className="publication-card"
              onClick={() => window.open(publication.url, '_blank')}
            >
              <div className="publication-header">
                <div className="publication-icon">
                  <BookOpen size={24} />
                </div>
                <div className="publication-meta">
                  <span className="publication-type">{publication.type}</span>
                  <div className="publication-year">
                    <Calendar size={16} />
                    <span>{publication.year}</span>
                  </div>
                </div>
              </div>

              <div className="publication-content">
                <h4 className="publication-title">{publication.title}</h4>
                <p className="publication-authors">{publication.authors}</p>
                <p className="publication-journal">{publication.journal}</p>
                <p className="publication-summary">{publication.summary}</p>

                <div className="publication-keywords">
                  {publication.keywords.map((keyword, index) => (
                    <span key={index} className="keyword-tag">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              <div className="publication-footer">
                <div className="view-publication">
                  <ExternalLink size={18} />
                  <span>View Publication</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="about-section">
          <div className="section-content">
            <h3 className="section-title">About Me</h3>
            <div className="about-content">
              <p>
                I&apos;m a Senior Data Scientist with extensive experience
                delivering machine learning solutions across the public sector,
                defence, and heavy industry. I have led multiple machine
                learning projects in Radio Frequency analysis and driven the
                upskilling of colleagues in signal processing and data science.
              </p>
              <p>
                My expertise spans across all major cloud platforms (AWS, Azure,
                GCP) where I develop and deploy functional machine learning
                solutions. From drone classification systems to radar waveform
                analysis using transformer models, I enjoy tackling complex
                technical challenges with innovative approaches.
              </p>
              <p>
                When I&apos;m not working on professional projects, you can find
                me developing Unity games with compute shaders, building neural
                network projects, or exploring the latest advancements in AI and
                machine learning.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home
