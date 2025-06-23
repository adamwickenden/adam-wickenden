# Adam Wickenden - Portfolio Website

A modern, responsive portfolio website built with React and Vite, featuring GitHub integration, Unity WebGL support, and professional CI/CD pipeline.

## 🚀 Live Website

Visit the live website: [https://adam-wickenden.web.app](https://adam-wickenden.web.app)

## ✨ Features

- **Modern React Application**: Built with React 18 and Vite for fast development and optimal performance
- **Responsive Design**: Mobile-first approach with beautiful gradients and animations
- **GitHub Integration**: Automatically fetches and displays repositories from GitHub API
- **Unity WebGL Support**: Ready to embed Unity games and interactive projects
- **Professional CI/CD**: Automated testing, linting, and deployment pipeline
- **LinkedIn API Ready**: Prepared for LinkedIn profile data integration
- **Firebase Hosting**: Fast, reliable hosting with custom domain support

## 🛠️ Tech Stack

- **Frontend**: React 18, React Router DOM
- **Build Tool**: Vite
- **Styling**: CSS3 with custom properties and animations
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Hosting**: Firebase Hosting
- **Testing**: Vitest, Testing Library
- **Code Quality**: ESLint, Prettier
- **CI/CD**: GitHub Actions

## 📋 Development Workflow

### Prerequisites

- Node.js 18+ and npm
- Firebase CLI (for deployment)
- Git

### Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd adam-website

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm run test

# Run linting and formatting
npm run ci
```

### Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build

# Testing
npm run test             # Run tests in watch mode
npm run test:run         # Run tests once
npm run test:coverage    # Run tests with coverage report
npm run test:ui          # Run tests with UI interface

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues automatically
npm run format           # Format code with Prettier
npm run format:check     # Check if code is formatted
npm run ci               # Run all quality checks (lint + format + test)

# Deployment
npm run deploy           # Build and deploy to Firebase
npm run clean            # Clean build artifacts
npm run reinstall        # Clean install dependencies
```

## 🧪 Testing

The project includes comprehensive testing setup:

- **Unit Tests**: Component and function testing with Vitest
- **Integration Tests**: Full application flow testing
- **Coverage Reports**: Detailed coverage analysis with configurable thresholds
- **Test Utilities**: Custom test helpers and mocks

### Running Tests

```bash
# Run all tests
npm run test:run

# Run with coverage
npm run test:coverage

# Run in watch mode during development
npm run test
```

### Coverage Thresholds

- Branches: 70%
- Functions: 70%
- Lines: 70%
- Statements: 70%

## 🔧 Code Quality

### ESLint Configuration

- React-specific rules and best practices
- Prettier integration for consistent formatting
- PropTypes validation for component props
- Import/export organization
- Accessibility guidelines

### Prettier Configuration

- Single quotes, no semicolons
- 2-space indentation
- 80-character line length
- Trailing commas in ES5-compatible locations

## 🚀 CI/CD Pipeline

### Automated Workflows

1. **Pull Request Checks**
   - Code linting and formatting validation
   - Unit test execution with coverage
   - Build verification
   - Bundle size analysis

2. **Main Branch Deployment**
   - All quality checks
   - Automatic deployment to Firebase
   - Deployment status notifications

### Setting Up CI/CD

See [docs/CICD_SETUP.md](docs/CICD_SETUP.md) for detailed setup instructions.

## 📁 Project Structure

```
adam-website/
├── public/                 # Static assets
│   ├── images/            # Image assets
│   └── unity/             # Unity WebGL builds
├── src/
│   ├── components/        # Reusable React components
│   │   └── __tests__/     # Component tests
│   ├── pages/             # Page components
│   │   └── __tests__/     # Page tests
│   ├── test/              # Test configuration
│   └── __tests__/         # Integration tests
├── .github/
│   └── workflows/         # GitHub Actions workflows
├── docs/                  # Documentation
└── dist/                  # Production build output
```

## 🎨 Customization

### Personal Information

Update the following files with your information:

1. **src/pages/Home.jsx**: Personal details, contact information, skills
2. **src/pages/Experience.jsx**: Work experience, education, certifications
3. **src/pages/Projects.jsx**: GitHub username, featured projects
4. **public/index.html**: Page title, meta descriptions
5. **firebase.json**: Hosting configuration

### GitHub Integration

The Projects page automatically fetches repositories from GitHub. Update the username in:

```javascript
// src/pages/Projects.jsx
const response = await axios.get(
  'https://api.github.com/users/YOUR_USERNAME/repos'
)
```

### Unity Projects

To add Unity WebGL builds:

1. Build your Unity project for WebGL
2. Upload the build files to `public/unity/[project-name]/`
3. Update the Unity projects configuration in `src/pages/Projects.jsx`

### Styling

The website uses CSS custom properties for easy theming:

```css
/* src/index.css */
:root {
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --text-primary: #2d3748;
  --background: #ffffff;
  /* ... other variables */
}
```

## 🔒 Environment Variables

For production deployment, you may need:

- `FIREBASE_TOKEN`: For CI/CD deployment (GitHub secret)
- LinkedIn API credentials (when implementing LinkedIn integration)

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Bundle Size**: Optimized with code splitting
- **Loading Time**: Fast initial load with progressive enhancement
- **SEO**: Optimized meta tags and semantic HTML

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and add tests
4. Ensure all quality checks pass: `npm run ci`
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [documentation](docs/)
2. Search existing [GitHub issues](../../issues)
3. Create a new issue with detailed information

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite for the lightning-fast build tool
- Firebase for reliable hosting
- Lucide for beautiful icons
- The open-source community for inspiration and tools
