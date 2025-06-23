import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Briefcase,
  GraduationCap,
  Calendar,
  MapPin,
  ExternalLink,
  Award,
  Code,
} from 'lucide-react'
import './Experience.css'

const Experience = () => {
  const [experienceData, _setExperienceData] = useState({
    workExperience: [
      {
        title: 'Software Developer',
        company: 'Technology Solutions Ltd',
        duration: '2023 - Present',
        type: 'Full-time',
        location: 'United Kingdom',
        description:
          'Developing innovative software solutions and machine learning applications.',
        achievements: [
          'Developed machine learning models using TensorFlow and Python',
          'Built responsive web applications using React and Node.js',
          'Collaborated with cross-functional teams on multiple projects',
          'Implemented CI/CD pipelines and automated testing frameworks',
        ],
        technologies: [
          'Python',
          'React',
          'Node.js',
          'TensorFlow',
          'AWS',
          'Docker',
        ],
      },
      {
        title: 'Junior Software Developer',
        company: 'Tech Innovations Inc',
        duration: '2022 - 2023',
        type: 'Full-time',
        location: 'United Kingdom',
        description:
          'Contributed to various software development projects and gained experience in full-stack development.',
        achievements: [
          'Assisted in developing web applications using modern frameworks',
          'Participated in code reviews and agile development processes',
          'Gained experience in database design and optimization',
        ],
        technologies: ['JavaScript', 'React', 'Python', 'SQL', 'Git'],
      },
    ],
    education: [
      {
        degree: 'Bachelor of Science in Computer Science',
        institution: 'University of Technology',
        duration: '2019 - 2022',
        location: 'United Kingdom',
        grade: 'First Class Honours',
        modules: [
          'Artificial Intelligence & Machine Learning',
          'Software Engineering',
          'Data Structures & Algorithms',
          'Computer Graphics',
          'Database Systems',
        ],
      },
    ],
    certifications: [
      {
        title: 'TensorFlow Developer Certificate',
        issuer: 'Google',
        date: '2023',
        credentialId: 'TF-2023-001',
      },
      {
        title: 'AWS Certified Cloud Practitioner',
        issuer: 'Amazon Web Services',
        date: '2023',
        credentialId: 'AWS-CCP-2023',
      },
    ],
    skills: {
      programmingLanguages: ['Python', 'JavaScript', 'C#', 'SQL', 'HTML/CSS'],
      frameworks: ['React', 'Node.js', 'TensorFlow', 'Unity', 'Express.js'],
      tools: ['Git', 'Docker', 'AWS', 'Firebase', 'MongoDB', 'PostgreSQL'],
      softSkills: [
        'Problem Solving',
        'Team Collaboration',
        'Project Management',
        'Communication',
      ],
    },
  })

  useEffect(() => {
    // In a real application, you would fetch data from LinkedIn API or your backend
    // For now, we're using static data
    // setExperienceData(fetchedData)
  }, [])

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
        {item.technologies && (
          <div className="technologies">
            <h4>Technologies:</h4>
            <div className="tech-tags">
              {item.technologies.map((tech, index) => (
                <span key={index} className="tech-tag">
                  {tech}
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
      achievements: PropTypes.arrayOf(PropTypes.string),
      modules: PropTypes.arrayOf(PropTypes.string),
      technologies: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    type: PropTypes.oneOf(['work', 'education']).isRequired,
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

        <section className="experience-section">
          <h2 className="section-title">
            <Award size={24} />
            Certifications
          </h2>
          <div className="certifications-grid">
            {experienceData.certifications.map((cert, index) => (
              <div key={index} className="certification-card">
                <h3>{cert.title}</h3>
                <p className="cert-issuer">Issued by {cert.issuer}</p>
                <span className="cert-date">{cert.date}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="experience-section">
          <h2 className="section-title">
            <Code size={24} />
            Skills & Technologies
          </h2>
          <div className="skills-categories">
            <div className="skill-category">
              <h3>Programming Languages</h3>
              <div className="skill-tags">
                {experienceData.skills.programmingLanguages.map(
                  (skill, index) => (
                    <span key={index} className="skill-tag">
                      {skill}
                    </span>
                  )
                )}
              </div>
            </div>
            <div className="skill-category">
              <h3>Frameworks & Libraries</h3>
              <div className="skill-tags">
                {experienceData.skills.frameworks.map((skill, index) => (
                  <span key={index} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="skill-category">
              <h3>Tools & Technologies</h3>
              <div className="skill-tags">
                {experienceData.skills.tools.map((skill, index) => (
                  <span key={index} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="skill-category">
              <h3>Soft Skills</h3>
              <div className="skill-tags">
                {experienceData.skills.softSkills.map((skill, index) => (
                  <span key={index} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Experience
