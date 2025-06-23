import React, { useState, useEffect } from 'react'
import { MapPin, Mail, Linkedin, Github, Download } from 'lucide-react'
import './Home.css'

const Home = () => {
  const [profileData, _setProfileData] = useState({
    skills: [
      'Python',
      'JavaScript',
      'React',
      'TensorFlow',
      'Unity',
      'C#',
      'Firebase',
      'Machine Learning',
    ],
    linkedin: {
      name: 'Adam Wickenden',
      headline: 'Software Developer & Technology Enthusiast',
      location: 'United Kingdom',
      email: 'contact@adamwickenden.com',
      bio: 'Passionate software developer with experience in machine learning, robotics, and full-stack development. I enjoy creating innovative solutions and exploring new technologies.',
    },
  })

  useEffect(() => {
    // In a real application, you would fetch this data from LinkedIn API
    // For now, we'll use the static data above
    // setProfileData(fetchedData)
  }, [])

  const handleImageError = e => {
    e.target.style.display = 'none'
    e.target.nextElementSibling.style.display = 'flex'
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
              <h1 className="hero-title">{profileData.linkedin.name}</h1>
              <h2 className="hero-subtitle">{profileData.linkedin.headline}</h2>
              <p className="hero-bio">{profileData.linkedin.bio}</p>

              <div className="contact-info">
                <div className="contact-item">
                  <MapPin size={18} />
                  <span>{profileData.linkedin.location}</span>
                </div>
                <div className="contact-item">
                  <Mail size={18} />
                  <span>{profileData.linkedin.email}</span>
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
                  href="https://docs.google.com/document/d/1kmsXrstfrHF06BXpY6L8Hkc06zWEioAV/edit?usp=sharing&ouid=108070107721304247482&rtpof=true&sd=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link cv"
                >
                  <Download size={20} />
                  View CV
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="skills-section">
          <div className="section-content">
            <h3 className="section-title">Technical Skills</h3>
            <div className="skills-grid">
              {profileData.skills.map((skill, index) => (
                <div key={index} className="skill-tag">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="about-section">
          <div className="section-content">
            <h3 className="section-title">About Me</h3>
            <div className="about-content">
              <p>
                I&apos;m a passionate software developer with a strong interest
                in machine learning, robotics, and innovative technology
                solutions. My journey in tech spans across various domains, from
                developing TensorFlow models to creating interactive Unity
                applications and building responsive web applications.
              </p>
              <p>
                I believe in continuous learning and enjoy tackling complex
                problems with creative solutions. When I&apos;m not coding, you
                can find me exploring the latest tech trends, contributing to
                open-source projects, or working on personal robotics projects.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home
