Form Builder
Project Structure

form-builder/
├── client/                     # Frontend (React, Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Register.jsx
│   │   │   ├── Form/
│   │   │   │   ├── FormBuilder.jsx
│   │   │   │   ├── FormList.jsx
│   │   │   │   ├── FormView.jsx
│   │   │   │   └── ResponseViewer.jsx
│   │   │   └── Layout/
│   │   │       └── Navbar.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Home.jsx
│   │   │   └── PublicForm.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
├── server/                     # Backend (Node.js, Express)
│   ├── config/
│   │   └── db.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── forms.js
│   │   └── responses.js
│   ├── socket.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── .env.example
└── README.md

client/: Frontend built with React, Vite, and Tailwind CSS.
server/: Backend built with Node.js, Express, and MongoDB.

Technologies

Frontend:
React, Vite, Tailwind CSS
react-router-dom, Axios, jwt-decode, socket.io-client


Backend:
Node.js, Express, MongoDB (Mongoose)
Socket.IO, jsonwebtoken, bcryptjs, cors, dotenv


Database: MongoDB Atlas
Tools: ESLint, PostCSS, Autoprefixer

Prerequisites

Node.js: v18 or higher
MongoDB Atlas: Account and database cluster
Git: For cloning the repository

Setup Instructions
1. Clone the Repository
git clone <repository-url>
cd form-builder

2. Backend Setup (server/)

Navigate to the backend directory:
cd server


Install dependencies:
npm install


Create a .env file based on .env.example:
cp .env.example .env

Update .env with:

MONGO_URI: Your MongoDB Atlas connection string.
JWT_SECRET: A secure secret for JWT (e.g., a random 32-character string).
PORT: Default is 5000.


Start the backend server:
npm run dev

The server runs at http://localhost:5000.


3. Frontend Setup (client/)

Navigate to the frontend directory:
cd ../client


Install dependencies:
npm install


Start the frontend development server:
npm run dev

The frontend runs at http://localhost:5173.


4. Test the Application

Open http://localhost:5173 in a browser.
Register a new user, log in, create a form, share it, and submit responses.
View real-time updates in the dashboard.

Environment Variables

Backend (server/.env):
MONGO_URI: MongoDB Atlas connection string.
JWT_SECRET: Secret for JWT authentication.
PORT: Server port (default: 5000).


Frontend: No .env required; API endpoints are hardcoded.

Notes

Ensure MongoDB Atlas is accessible and the backend is running before starting the frontend.
The frontend uses Vite for fast development and Tailwind CSS for responsive styling.
Socket.IO enables real-time response updates without page refresh.

