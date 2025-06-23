# Adam Wickenden - Portfolio Website

A modern, responsive portfolio website built with React and Vite, showcasing my projects, experience, and skills in software development.

## 🌟 Features

- **Modern Design**: Clean, professional layout with beautiful gradients and animations
- **Responsive**: Fully responsive design that works on all devices
- **Interactive**: Dynamic content loading from GitHub API
- **Unity Support**: Ready for Unity WebGL project embeds
- **Performance**: Built with Vite for optimal performance
- **Accessibility**: WCAG compliant with proper focus states and semantic HTML

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite
- **Routing**: React Router DOM
- **Styling**: CSS3 with custom properties and modern layout techniques
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Deployment**: Firebase Hosting

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/adamwickenden/adam-website.git
cd adam-website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## 🚀 Deployment

### Firebase Hosting

1. Install Firebase CLI globally:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Build the project:
```bash
npm run build
```

4. Deploy to Firebase:
```bash
firebase deploy
```

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Upload the `dist` folder to your hosting provider

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navigation.jsx   # Main navigation component
│   └── Navigation.css   # Navigation styles
├── pages/              # Page components
│   ├── Home.jsx        # Home page with personal info
│   ├── Home.css        # Home page styles
│   ├── Projects.jsx    # Projects showcase
│   ├── Projects.css    # Projects styles
│   ├── Experience.jsx  # Professional experience
│   └── Experience.css  # Experience styles
├── utils/              # Utility functions
├── hooks/              # Custom React hooks
├── App.jsx             # Main App component
├── App.css             # Global styles
├── main.jsx            # App entry point
└── index.css           # Base styles
```

## 🎨 Customization

### Colors
Update the CSS custom properties in `src/index.css`:
```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  /* ... other colors */
}
```

### Content
- **Personal Info**: Update the profile data in `src/pages/Home.jsx`
- **Projects**: The app fetches from GitHub API automatically
- **Experience**: Update the experience data in `src/pages/Experience.jsx`

### Unity Projects
To add Unity WebGL builds:
1. Build your Unity project for WebGL
2. Place the build folder in `public/unity/[project-name]/`
3. Update the `unityProjects` array in `src/pages/Projects.jsx`
4. Set `isPlayable: true` for the project

## 🔧 API Integration

### GitHub API
The portfolio automatically fetches repository data from GitHub. No API key required for public repositories.

### LinkedIn Integration
Currently uses static data. To integrate with LinkedIn API:
1. Register your app with LinkedIn
2. Obtain API credentials
3. Update the data fetching logic in `src/pages/Home.jsx` and `src/pages/Experience.jsx`

### Google Drive CV
The CV link points to a Google Drive document. Make sure the document is publicly accessible.

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

- **LinkedIn**: [https://www.linkedin.com/in/adam-wickenden/](https://www.linkedin.com/in/adam-wickenden/)
- **GitHub**: [https://github.com/adamwickenden](https://github.com/adamwickenden)
- **CV**: [View CV](https://docs.google.com/document/d/1kmsXrstfrHF06BXpY6L8Hkc06zWEioAV/edit?usp=sharing&ouid=108070107721304247482&rtpof=true&sd=true)

---

Built with ❤️ using React and Vite
