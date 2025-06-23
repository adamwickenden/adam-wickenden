import React, { useState, useEffect } from 'react'
import { Briefcase, GraduationCap, Calendar, MapPin, ExternalLink, Award, Code } from 'lucide-react'
import './Experience.css'

const Experience = () => {
  const [experienceData, setExperienceData] = useState({
    jobs: [
      {
        id: 1,
        title: 'Software Developer',
        company: 'Technology Solutions Ltd',
        location: 'United Kingdom',
        duration: '2023 - Present',
        type: 'Full-time',
        description: 'Developing innovative software solutions with focus on machine learning integration and web development. Leading projects in Python, React, and cloud technologies.',
        achievements: [
          'Developed machine learning models for predictive analytics',
          'Built responsive web applications using React and Node.js',
          'Implemented CI/CD pipelines and automated testing',
          'Collaborated with cross-functional teams to deliver high-quality software'
        ],
        technologies: ['Python', 'React', 'Node.js', 'TensorFlow', 'AWS', 'Docker']
      },
      {
        id: 2,
        title: 'Junior Developer',
        company: 'Tech Innovations',
        location: 'United Kingdom',
        duration: '2022 - 2023',
        type: 'Full-time',
        description: 'Gained hands-on experience in software development, working on various projects including web applications and mobile apps.',
        achievements: [
          'Contributed to multiple web development projects',
          'Learned and applied modern development frameworks',
          'Participated in code reviews and agile development processes',
          'Developed skills in database design and optimization'
        ],
        technologies: ['JavaScript', 'HTML/CSS', 'SQL', 'Git', 'Agile']
      }
    ],
    education: [
      {
        id: 1,
        degree: 'Bachelor of Science in Computer Science',
        institution: 'University of Technology',
        location: 'United Kingdom',
        duration: '2019 - 2022',
        grade: 'First Class Honours',
        description: 'Comprehensive study of computer science fundamentals including algorithms, data structures, software engineering, and artificial intelligence.',
        modules: [
          'Artificial Intelligence & Machine Learning',
          'Software Engineering',
          'Data Structures & Algorithms',
          'Database Systems',
          'Computer Networks',
          'Human-Computer Interaction'
        ]
      }
    ],
    certifications: [
      {
        id: 1,
        name: 'TensorFlow Developer Certificate',
        issuer: 'Google',
        date: '2023',
        description: 'Demonstrates proficiency in using TensorFlow to solve deep learning and ML problems.',
        credentialUrl: '#'
      },
      {
        id: 2,
        name: 'AWS Certified Cloud Practitioner',
        issuer: 'Amazon Web Services',
        date: '2023',
        description: 'Foundational understanding of AWS Cloud services and architecture.',
        credentialUrl: '#'
      }
    ],
    skills: {
      'Programming Languages': ['Python', 'JavaScript', 'C#', 'SQL', 'HTML/CSS'],
      'Frameworks & Libraries': ['React', 'Node.js', 'TensorFlow', 'Unity', 'Express.js'],
      'Tools & Technologies': ['Git', 'Docker', 'AWS', 'Firebase', 'MongoDB', 'PostgreSQL'],
      'Soft Skills': ['Problem Solving', 'Team Collaboration', 'Project Management', 'Communication']
    }
  })

  // In a real application, you would fetch this data from LinkedIn API and CV
  useEffect(() => {
    const fetchExperienceData = async () => {
      try {
        // This would integrate with LinkedIn API and parse CV data
        // For now, we'll use the static data above
        console.log('Experience data would be fetched from LinkedIn API and CV here')
      } catch (error) {
        console.error('Error fetching experience data:', error)
      }
    }

    fetchExperienceData()
  }, [])

  const TimelineItem = ({ item, type }) => (
    <div className="timeline-item">
      <div className="timeline-marker">
        {type === 'job' ? <Briefcase size={20} /> : <GraduationCap size={20} />}
      </div>
      <div className="timeline-content">
        <div className="timeline-header">
          <h3 className="timeline-title">
            {type === 'job' ? item.title : item.degree}
          </h3>
          <span className="timeline-duration">{item.duration}</span>
        </div>
        
        <div className="timeline-subtitle">
          <span className="company-name">
            {type === 'job' ? item.company : item.institution}
          </span>
          {item.type && <span className="job-type">{item.type}</span>}
          {item.grade && <span className="grade">{item.grade}</span>}
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
            <div className="modules-grid">
              {item.modules.map((module, index) => (
                <span key={index} className="module-tag">{module}</span>
              ))}
            </div>
          </div>
        )}
        
        {item.technologies && (
          <div className="technologies">
            <h4>Technologies Used:</h4>
            <div className="tech-tags">
              {item.technologies.map((tech, index) => (
                <span key={index} className="tech-tag">{tech}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className="experience">
      <div className="experience-container">
        <header className="experience-header">
          <h1>Professional Experience</h1>
          <p>My journey in software development, education, and continuous learning.</p>
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
            {experienceData.jobs.map((job) => (
              <TimelineItem key={job.id} item={job} type="job" />
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
            {experienceData.education.map((edu) => (
              <TimelineItem key={edu.id} item={edu} type="education" />
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
            {experienceData.certifications.map((cert) => (
              <div key={cert.id} className="certification-card">
                <div className="cert-header">
                  <h3>{cert.name}</h3>
                  <span className="cert-date">{cert.date}</span>
                </div>
                <p className="cert-issuer">Issued by {cert.issuer}</p>
                <p className="cert-description">{cert.description}</p>
                <a 
                  href={cert.credentialUrl}
                  className="cert-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink size={16} />
                  View Credential
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section className="experience-section">
          <h2 className="section-title">
            <Code size={24} />
            Skills & Technologies
          </h2>
          <div className="skills-categories">
            {Object.entries(experienceData.skills).map(([category, skills]) => (
              <div key={category} className="skill-category">
                <h3 className="category-title">{category}</h3>
                <div className="skills-list">
                  {skills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Experience 