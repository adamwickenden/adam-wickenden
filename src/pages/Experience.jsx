import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Briefcase,
  GraduationCap,
  Calendar,
  MapPin,
  ExternalLink,
  Award,
  Loader,
} from 'lucide-react'
import cvService from '../services/cvService'
import './Experience.css'

const Experience = () => {
  const [experienceData, setExperienceData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCVData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch all CV data
        const cvData = await cvService.fetchProfile()

        // Transform the data to match our component structure
        setExperienceData({
          workExperience: cvData.workExperience,
          education: cvData.education,
          certifications: cvData.certifications,
          skills: cvData.skills,
        })
      } catch (err) {
        console.error('Error fetching CV data:', err)
        setError('Failed to load experience data. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchCVData()
  }, [])

  // Helper function to format certification dates
  const formatCertificationDate = dateString => {
    if (!dateString) return 'No expiration'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    })
  }

  // Helper function to check if certification is expired
  const isCertificationExpired = expirationDate => {
    if (!expirationDate) return false
    return new Date(expirationDate) < new Date()
  }

  // Timeline item component
  const TimelineItem = ({ item, type }) => (
    <div className="timeline-item">
      <div className="timeline-marker">
        {type === 'work' ? (
          <Briefcase size={20} />
        ) : (
          <GraduationCap size={20} />
        )}
      </div>
      <div className="timeline-content">
        <div className="timeline-header">
          <h3 className="timeline-title">{item.title || item.degree}</h3>
          <span className="timeline-duration">{item.duration}</span>
        </div>
        <div className="timeline-subtitle">
          <span className="company-name">
            {item.company || item.institution}
          </span>
          {item.type && <span className="job-type">{item.type}</span>}
          {item.grade && <span className="grade">{item.grade}</span>}
          {item.gpa && <span className="gpa">GPA: {item.gpa}</span>}
        </div>
        <div className="timeline-location">
          <MapPin size={16} />
          <span>{item.location}</span>
        </div>
        <p className="timeline-description">{item.description}</p>
        {item.achievements && (
          <div className="achievements">
            <h4>Key Achievements:</h4>
            <ul>
              {item.achievements.map((achievement, index) => (
                <li key={index}>{achievement}</li>
              ))}
            </ul>
          </div>
        )}
        {item.modules && (
          <div className="modules">
            <h4>Key Modules:</h4>
            <div className="module-tags">
              {item.modules.map((module, index) => (
                <span key={index} className="module-tag">
                  {module}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )

  TimelineItem.propTypes = {
    item: PropTypes.shape({
      title: PropTypes.string,
      degree: PropTypes.string,
      company: PropTypes.string,
      institution: PropTypes.string,
      duration: PropTypes.string.isRequired,
      type: PropTypes.string,
      location: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      grade: PropTypes.string,
      gpa: PropTypes.string,
      achievements: PropTypes.arrayOf(PropTypes.string),
      modules: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    type: PropTypes.oneOf(['work', 'education']).isRequired,
  }

  if (loading) {
    return (
      <div className="experience">
        <div className="experience-container">
          <div className="loading-container">
            <Loader className="loading-spinner" size={48} />
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="experience">
        <div className="experience-container">
          <div className="error-container">
            <p className="error-message">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="retry-button"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!experienceData) {
    return (
      <div className="experience">
        <div className="experience-container">
          <p>No experience data available.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="experience">
      <div className="experience-container">
        <header className="experience-header">
          <h1>Professional Experience</h1>
          <p>
            My journey in software development, education, and continuous
            learning.
          </p>
          <div className="cv-download">
            <a
              href="https://docs.google.com/document/d/1kmsXrstfrHF06BXpY6L8Hkc06zWEioAV/edit?usp=sharing&ouid=108070107721304247482&rtpof=true&sd=true"
              target="_blank"
              rel="noopener noreferrer"
              className="cv-btn"
            >
              <ExternalLink size={20} />
              View Full CV
            </a>
          </div>
        </header>

        {/* Work Experience Section */}
        <section className="experience-section">
          <h2 className="section-title">
            <Briefcase size={24} />
            Work Experience
          </h2>
          <div className="timeline">
            {experienceData.workExperience.map((job, index) => (
              <TimelineItem key={index} item={job} type="work" />
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section className="experience-section">
          <h2 className="section-title">
            <GraduationCap size={24} />
            Education
          </h2>
          <div className="timeline">
            {experienceData.education.map((edu, index) => (
              <TimelineItem key={index} item={edu} type="education" />
            ))}
          </div>
        </section>

        {/* Certifications Section */}
        <section className="experience-section">
          <h2 className="section-title">
            <Award size={24} />
            Certifications
          </h2>
          <div className="certifications-grid">
            {experienceData.certifications.map((cert, index) => (
              <div key={index} className="certification-card">
                <div className="certification-header">
                  <h3 className="certification-title">{cert.title}</h3>
                  <span className="certification-issuer">
                    Issued by {cert.issuer}
                  </span>
                </div>
                <div className="certification-details">
                  <p className="certification-date">
                    Issued: {formatCertificationDate(cert.issueDate)}
                  </p>
                  {cert.expirationDate && (
                    <p
                      className={`certification-expiry ${isCertificationExpired(cert.expirationDate) ? 'expired' : ''}`}
                    >
                      {isCertificationExpired(cert.expirationDate)
                        ? 'Expired: '
                        : 'Expires: '}
                      {formatCertificationDate(cert.expirationDate)}
                    </p>
                  )}
                  {cert.credentialId && (
                    <p className="credential-id">
                      Credential ID: {cert.credentialId}
                    </p>
                  )}
                  {cert.description && (
                    <p className="certification-description">
                      {cert.description}
                    </p>
                  )}
                </div>
                {cert.credentialUrl && (
                  <div className="certification-actions">
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="certification-link"
                    >
                      <ExternalLink size={16} />
                      View Credential
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Experience
