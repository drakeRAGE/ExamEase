# ExamEase - Online Examination Platform

A comprehensive, full-stack web application designed to streamline the process of conducting online examinations. Built with modern web technologies and featuring a sleek, dark-themed interface.

## 🚀 Live Demo

[https://examease-x3uz.onrender.com](https://examease-x3uz.onrender.com)

## ✨ Features

- **User Authentication**: Secure registration and login system with JWT tokens
- **Exam Management**: Create and manage online examinations with ease
- **Question Bank**: Random question selection for unique exam experiences
- **Real-time Timer**: Built-in exam timer with visual alerts
- **Responsive Design**: Fully responsive interface that works on all devices
- **Dark Theme**: Modern, eye-friendly dark interface with gradient styling
- **Instant Results**: Immediate feedback and detailed exam results
- **Progress Tracking**: Visual indicators for answered/unanswered questions

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API communication
- **Tailwind CSS** - Utility-first CSS framework
- **React Icons** - Beautiful icon library
- **Vite** - Fast build tool and dev server

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14.0.0 or higher)
- MongoDB instance (local or cloud)
- npm or yarn package manager

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/drakeRAGE/ExamEase.git
   cd ExamEase
   ```

2. **Install dependencies**
   ```bash
   # Install server dependencies
   cd server && npm install

   # Install client dependencies
   cd ../client && npm install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the `server` directory:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/examease
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRE=1h
   NODE_ENV=development
   ```


   Create a `.env` file in the `client` directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Database Setup**
   ```bash
   cd server
   npm run seed
   ```

5. **Start Development Servers**
   ```bash
   # Terminal 1 - Backend
   cd server && npm run dev

   # Terminal 2 - Frontend
   cd client && npm run dev
   ```

### Production Deployment

#### Render Deployment (Recommended)

1. **Push your code to GitHub**

2. **Create a new Web Service on Render**
   - Connect your GitHub repository
   - Set the build command: `npm run build`
   - Set the start command: `npm start`
   - Add environment variables in the Render dashboard

3. **Environment Variables for Production**
   ```env
   PORT=10000
   MONGO_URI=your-mongodb-connection-string
   JWT_SECRET=your-production-jwt-secret
   JWT_EXPIRE=1h
   NODE_ENV=production
   VITE_API_URL=your_backend_url
   ```

## 🎯 Usage

### For Students
1. **Register** for a new account or **login** with existing credentials
2. **Start Exam** from the dashboard
3. **Answer Questions** with the intuitive interface
4. **Review Results** immediately after completion

### For Administrators
1. **Manage Questions** through the admin panel
2. **Monitor Performance** with detailed analytics
3. **Export Results** for further analysis

## 🏗️ Project Structure

```
ExamEase/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context providers
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # API service functions
│   │   └── utils/         # Utility functions
│   ├── public/            # Static assets
│   └── package.json
├── server/                # Express backend
│   ├── controllers/       # Route controllers
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── validators/       # Input validation
│   └── package.json
└── package.json          # Root package.json
```

## 📱 Screenshots

### Login Page
<img width="1920" height="724" alt="image" src="https://github.com/user-attachments/assets/69eecf26-4716-481d-ac86-186bc1201ff3" />


### Dashboard
<img width="1920" height="821" alt="image" src="https://github.com/user-attachments/assets/a24a0c2f-7190-45a6-9541-4d6e7d41d7a3" />


### Exam Interface
<img width="1732" height="892" alt="image" src="https://github.com/user-attachments/assets/f8b34477-10d0-490a-b5d9-591fd63ec8c0" />

### Results
<img width="1725" height="897" alt="image" src="https://github.com/user-attachments/assets/ff762a78-78c4-425f-bee4-b2b59854d17e" />


## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Exam Management
- `GET /api/exam/questions` - Get exam questions
- `POST /api/exam/submit` - Submit exam answers
- `GET /api/exam/result/:id` - Get exam results

## 🚀 Available Scripts

### Root Level
- `npm start` - Start production server
- `npm run dev` - Start development mode (both client & server)
- `npm run build` - Build for production
- `npm run install` - Install all dependencies

### Client
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Server
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

## 🧪 Testing

```bash
# Run client tests
npm test

# Run server tests
npm test
```

## 🐛 Troubleshooting

### Common Issues

1. **Build fails on Render**
   - Ensure all dependencies are properly listed in package.json
   - Check Node.js version compatibility
   - Use `--legacy-peer-deps` flag for dependency conflicts

2. **MongoDB connection issues**
   - Verify your MongoDB connection string
   - Ensure your IP is whitelisted in MongoDB Atlas
   - Check if MongoDB service is running locally

3. **CORS issues**
   - Ensure CORS is properly configured in the server
   - Check if frontend API URL matches backend URL

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## 👥 Contact

**Deepak Joshi** - [@drakeRAGE](https://github.com/drakeRAGE)

**Project Link**: [https://github.com/drakeRAGE/ExamEase](https://github.com/drakeRAGE/ExamEase)

## 🙏 Acknowledgments

- [React](https://reactjs.org/) for the amazing frontend framework
- [Express.js](https://expressjs.com/) for the robust backend framework
- [Tailwind CSS](https://tailwindcss.com/) for the beautiful styling
- [MongoDB](https://www.mongodb.com/) for the flexible database
- [Render](https://render.com/) for the free hosting service

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/drakeRAGE">Deepak Joshi</a></p>
  <p>⭐ Don't forget to star this repository if you find it helpful!</p>
</div>
        
