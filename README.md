# Ethara Team Task Manager

A modern full-stack task and project management platform built to streamline collaboration, project tracking, and productivity for teams.

Ethara Team Task Manager enables users to securely manage projects, organize tasks, and monitor team progress through an intuitive dashboard experience.

---

## Live Demo

🌐 Frontend: **[https://etharateamtaskmanager.onrender.com]**  

---

## Features

### Authentication System
- Secure user registration and login
- JWT-based authentication
- Protected routes
- Persistent login session

### Dashboard
- Productivity overview
- Project and task insights
- Centralized workspace

### Project Management
- Create and manage projects
- Track project progress
- Organize workflow efficiently

### Task Management
- Create and assign tasks
- Track task status
- Organize priorities
- Monitor completion progress

### Modern UI/UX
- Responsive interface
- Clean navigation system
- User-friendly dashboard experience

### Security
- Password hashing using bcrypt
- Protected API endpoints
- JWT token authorization

---

## Tech Stack

### Frontend
- React.js
- Vite
- React Router DOM
- Axios
- React Hot Toast
- React Icons
- Recharts

### Backend
- Node.js
- Express.js
- JWT Authentication
- bcryptjs

### Database
- MongoDB
- Mongoose

### Deployment
- Render (Frontend + Backend)

---

## Project Structure

```bash
EtharaTeamTaskManager/
│
├── client/                    # React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── public/
│   └── package.json
│
├── server/                    # Node.js Backend
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## Application Flow

```text
User Authentication
        ↓
Dashboard Access
        ↓
Project Creation & Management
        ↓
Task Assignment & Tracking
        ↓
Progress Monitoring
```

---

## Local Setup

### 1. Clone Repository

```bash
git clone https://github.com/your-username/EtharaTeamTaskManager.git

cd EtharaTeamTaskManager
```

---

## Backend Setup

Navigate to server:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create `.env` file inside `server/`

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

Run backend:

```bash
npm run dev
```

Backend will run on:

```text
http://localhost:5000
```

---

## Frontend Setup

Open a second terminal:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Create `.env` file inside `client/`

```env
VITE_API_URL=http://localhost:5000/api
```

Run frontend:

```bash
npm run dev
```

Frontend will run on:

```text
http://localhost:5173
```

---

## Environment Variables

### Backend (`server/.env`)

```env
MONGO_URI=
JWT_SECRET=
PORT=5000
```

### Frontend (`client/.env`)

```env
VITE_API_URL=
```

---

## Render Deployment

### Backend Deployment (Web Service)

#### Root Directory

```text
server
```

#### Build Command

```bash
npm install
```

#### Start Command

```bash
npm start
```

#### Environment Variables

```env
MONGO_URI=
JWT_SECRET=
```

---

### Frontend Deployment (Static Site)

#### Root Directory

```text
client
```

#### Build Command

```bash
npm install && npm run build
```

#### Publish Directory

```text
dist
```

#### Environment Variable

```env
VITE_API_URL=https://your-backend.onrender.com/api
```

---

## Challenges Solved

- Implemented secure JWT authentication flow
- Managed protected frontend routes
- Built frontend-backend API integration
- Structured scalable MERN architecture
- Configured deployment for separate frontend and backend services on Render

---

## Future Improvements

- Team member collaboration
- Role-based access control
- Notifications system
- Kanban board
- Real-time updates
- File attachments
- Analytics dashboard

---

## Author

### Nayani Paul

Computer Science Engineering Student  
Full Stack Developer | Web Development | AI Projects

📧 Email: nayanipaul27@gmail.com

---

## License

This project is built for educational, portfolio, and demonstration purposes.
