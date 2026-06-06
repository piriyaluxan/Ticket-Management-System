# Ticket Management System

A full-stack role-based ticket management system built with the MERN stack.

## 📋 System Overview

The Ticket Management System is a comprehensive solution for organizing, tracking, and managing customer support requests, IT helpdesk tickets, and internal task assignments. This application streamlines communication between users, support agents, and administrators through an intuitive interface with real-time updates, status tracking, and assignment management.

## 🎯 Purpose & Key Objectives

This application is designed to:

- **Centralize Support Operations:** Consolidate all customer and internal support requests in one unified platform
- **Enhance Efficiency:** Reduce response times and improve ticket resolution with organized workflows
- **Enable Collaboration:** Facilitate seamless communication between support agents and customers through comments and status updates
- **Manage Resources:** Distribute workload effectively by assigning tickets to appropriate agents
- **Track Performance:** Monitor ticket metrics, response times, and resolution statistics through comprehensive dashboards
- **Control Access:** Implement role-based permissions ensuring users access only relevant information

## 👥 Who Should Use This?

- **Organizations with Support Teams:** Companies needing to manage customer support requests
- **IT Departments:** Internal teams handling IT helpdesk and troubleshooting requests
- **Service Providers:** Businesses delivering services and managing client requests
- **Project Teams:** Teams coordinating internal tasks and issue tracking

## ⭐ Key Features & Benefits

| Feature                       | Benefit                                                          |
| ----------------------------- | ---------------------------------------------------------------- |
| **Role-Based Access Control** | Different views and permissions for Admin, Agent, and User roles |
| **Real-Time Dashboard**       | Quick insights into ticket statistics and team performance       |
| **Ticket Assignment**         | Efficiently distribute workload among support agents             |
| **Status Tracking**           | Monitor ticket progress from creation to resolution              |
| **Comment System**            | Enable direct communication between agents and users             |
| **Advanced Filtering**        | Quickly find tickets by status, priority, category, or assignee  |
| **User Management**           | Admin controls to activate/deactivate users and manage accounts  |
| **Responsive Design**         | Seamless experience across desktop, tablet, and mobile devices   |

## Live Links

- **Frontend:** https://ticket-management-system-vert.vercel.app/
- **Backend:** https://ticket-api-kappa.vercel.app
- **GitHub:** https://github.com/piriyaluxan/Ticket-Management-System.git

## Test Credentials

| Role  | Email            | Password  |
| ----- | ---------------- | --------- |
| Admin | admin@qtechy.com | Admin@123 |
| Agent | agent@qtechy.com | Agent@123 |
| User  | user@qtechy.com  | User@123  |

## Tech Stack

- **Frontend:** React, Redux Toolkit, Axios, React Router, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Auth:** JWT
- **Database:** MongoDB Atlas
- **Deployment:** Vercel (frontend), Render (backend)

## Features

- Role-based access control (Admin, Agent, User)
- JWT authentication with protected routes
- Ticket creation, listing, filtering, sorting, pagination
- Ticket status updates with history tracking
- Ticket assignment to agents
- Comment system on tickets
- Dashboard with statistics and category breakdown
- User management (admin only)

## Local Setup

### Prerequisites

- Node.js v18+
- MongoDB Atlas account

### Backend

```bash
cd server
npm install
```

Create a `.env` file in `server/`:

```
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
```

```bash
npm run dev
```

### Frontend

```bash
cd client
npm install
```

Create a `.env` file in `client/`:

```
VITE_API_URL=http://localhost:5000/api
```

```bash
npm run dev
```

## API Summary

| Method | Endpoint                  | Access       | Description        |
| ------ | ------------------------- | ------------ | ------------------ |
| POST   | /api/auth/register        | Public       | Register user      |
| POST   | /api/auth/login           | Public       | Login              |
| GET    | /api/auth/me              | Auth         | Get current user   |
| GET    | /api/tickets              | Auth         | List tickets       |
| POST   | /api/tickets              | Auth         | Create ticket      |
| GET    | /api/tickets/:id          | Auth         | Get ticket         |
| PUT    | /api/tickets/:id          | Auth         | Update ticket      |
| DELETE | /api/tickets/:id          | Admin        | Delete ticket      |
| PATCH  | /api/tickets/:id/status   | Admin, Agent | Update status      |
| PATCH  | /api/tickets/:id/assign   | Admin        | Assign ticket      |
| POST   | /api/tickets/:id/comments | Auth         | Add comment        |
| GET    | /api/users                | Admin        | List users         |
| GET    | /api/users/agents         | Admin        | List agents        |
| PATCH  | /api/users/:id/status     | Admin        | Toggle user status |
| GET    | /api/dashboard            | Auth         | Get stats          |

## Environment Variables

### Backend

| Variable     | Description                     |
| ------------ | ------------------------------- |
| PORT         | Server port (5000)              |
| MONGO_URI    | MongoDB Atlas connection string |
| JWT_SECRET   | Secret key for JWT signing      |
| FRONTEND_URL | Deployed frontend URL for CORS  |

### Frontend

| Variable     | Description          |
| ------------ | -------------------- |
| VITE_API_URL | Backend API base URL |

## Folder Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── api/            # Axios API files
│   │   ├── app/            # Redux store and slices
│   │   ├── components/     # Reusable components
│   │   └── pages/          # Page components
└── server/                 # Node.js backend
    ├── config/             # Database config
    ├── controllers/        # Request handlers
    ├── middleware/         # Auth and error middleware
    ├── models/             # Mongoose models
    ├── routes/             # Express routes
    ├── services/           # Business logic
    └── utils/              # Helper functions
```
