import React, { useState, useEffect } from 'react'
import { Mail, Phone, MapPin, Github, Linkedin, Download } from 'lucide-react'
import './Home.css'

const Home = () => {
  const [profileData, setProfileData] = useState({
    name: 'Adam Wickenden',
    title: 'Software Developer & Technology Enthusiast',
    location: 'United Kingdom',
    email: 'contact@adamwickenden.com',
    bio: 'Passionate software developer with experience in machine learning, robotics, and full-stack development. I enjoy creating innovative solutions and exploring new technologies.',
    skills: ['Python', 'JavaScript', 'React', 'TensorFlow', 'Unity', 'C#', 'Firebase', 'Machine Learning'],
    linkedin: 'https://www.linkedin.com/in/adam-wickenden/',
    github: 'https://github.com/adamwickenden'
  })

  // In a real application, you would fetch this data from LinkedIn API
  // For now, we'll use static data that represents typical LinkedIn profile information
  useEffect(() => {
    // Simulate API call
    const fetchLinkedInData = async () => {
      // This would be replaced with actual LinkedIn API integration
      // Due to LinkedIn API restrictions, we'll use static data
      try {
        // Placeholder for LinkedIn API integration
        console.log('LinkedIn profile data would be fetched here')
      } catch (error) {
        console.error('Error fetching LinkedIn data:', error)
      }
    }

    fetchLinkedInData()
  }, [])

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
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.nextSibling.style.display = 'flex'
                  }}
                />
                <div className="profile-placeholder" style={{ display: 'none' }}>
                  AW
                </div>
              </div>
            </div>
            
            <div className="hero-text">
              <h1 className="hero-title">{profileData.name}</h1>
              <h2 className="hero-subtitle">{profileData.title}</h2>
              <p className="hero-bio">{profileData.bio}</p>
              
              <div className="contact-info">
                <div className="contact-item">
                  <MapPin size={18} />
                  <span>{profileData.location}</span>
                </div>
                <div className="contact-item">
                  <Mail size={18} />
                  <span>{profileData.email}</span>
                </div>
              </div>

              <div className="social-links">
                <a 
                  href={profileData.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link linkedin"
                >
                  <Linkedin size={20} />
                  LinkedIn
                </a>
                <a 
                  href={profileData.github} 
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
                I'm a passionate software developer with a strong interest in machine learning, 
                robotics, and innovative technology solutions. My journey in tech spans across 
                various domains, from developing TensorFlow models to creating interactive Unity 
                applications and building responsive web applications.
              </p>
              <p>
                I believe in continuous learning and enjoy tackling complex problems with 
                creative solutions. When I'm not coding, you can find me exploring the latest 
                tech trends, contributing to open-source projects, or working on personal 
                robotics projects.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home 