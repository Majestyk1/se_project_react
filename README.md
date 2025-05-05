# WTWR Frontend 🌤️

The frontend application for WTWR (What to Wear), a weather-based clothing recommendation system built with React.

## 🎯 Features

- Real-time weather data visualization
- Interactive clothing recommendation interface
- User authentication and profile management
- Responsive design for all devices
- Modern, intuitive UI/UX

## 🛠️ Tech Stack

- React 18
- React Router v6 for navigation
- Vite for build tooling and development
- Modern ES6+ JavaScript
- Responsive CSS with modern design principles

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. Navigate to the frontend directory:

```bash
cd se_project_react
```

2. Install dependencies:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at http://localhost:5173

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
se_project_react/
├── src/                   # Source files
│   ├── components/       # React components
│   ├── contexts/        # React contexts
│   ├── hooks/          # Custom hooks
│   ├── utils/          # Utility functions
│   └── App.jsx         # Main application component
├── public/             # Static files
├── index.html         # Entry HTML file
└── package.json       # Project dependencies
```

## 🔧 Development Guidelines

### Code Style

- Follow ESLint configuration
- Use functional components with hooks
- Implement proper error handling
- Write meaningful component and function names

### Best Practices

- Keep components small and focused
- Use proper prop types
- Implement proper error boundaries
- Follow React hooks rules
- Use proper state management

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following variables:

```
VITE_API_URL=http://localhost:3001
```

## 🤝 Contributing

1. Create your feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
3. Push to the branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

## ⚙️ Backend repo

The backend API for this project can be found here:  
[WTWR Backend Repository](https://github.com/majestyk1/se_project_express)

## 📝 License

This project is licensed under the ISC License.
