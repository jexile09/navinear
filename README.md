# **NAVINEAR**
## Navigation made easy!
This website is used to help you with your navigation needs for North Engineering here at the University of Toledo Engineering campus.

**naviNear** is a full-stack web application designed to assist students and faculty at the University of Toledo in navigating the North Engineering Building and managing professor office hour appointments. The system provides two core functionalities: an indoor route-finding interface powered by the Mappedin API, and an appointment scheduling platform that allows students to book meetings with professors based on their published availability.

The interactive map feature enables users to search for specific classrooms, labs, or faculty offices and view guided navigation paths within the building, making it easier to confidently move through complex layouts. The appointment system includes availability checking, conflict prevention by disabling already-booked time slots, and integration with a backend database for secure and reliable scheduling. Professors can manage their availability through a personalized dashboard, while students can filter appointments by course, reason for meeting, and date.

---

## 📚 Table of Contents

1. [Features](#features)
2. [🧰Tech Stack](#tech-stack)
3. [🗂️Repository Structure](#repository-structure)
4. [🔧Prerequisites](#prerequisites)
5. [🚀 Getting Started](#getting-started)
6. [API Reference](#api-reference)
7. [⚙️ Environment Variables](#environment-variables)
8. [📄License](#license)

---

## Features ✅

- **Interactive Campus Map** with building labels and accessibility features powered by Mappedin SDK
- **Role-based Authentication** for Students and Professors
- **Office Hours Booking**: Students can book 15-minute slots during professors' available times
- **Professor Dashboard**: View and filter upcoming appointments by date or course

---

## 🧰 Tech Stack

- **Backend**: Python, Flask, Flask-CORS, SQLite
- **Frontend**: Vite, React, TypeScript, React Router, React-DatePicker
- **Mapping**: `@mappedin/react-sdk`
- **Styling**: CSS

---

## 🗂️ Repository Structure

```
NAVINEAR/
│
├── backend/                     # Flask server + SQLite database
│   ├── app.py                   # API endpoints
│   └── campus_navigator.db      # SQLite database file
│
├── public/                      # Static assets served by Vite
│   └── images/                  # Logos, map tiles, etc.
│
├── src/                         # Front-end source
│   ├── components/              # Shared React components
│   │   ├── ColorScheme.ts
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── MapComponent.tsx
│   │   ├── MapComponent.css
│   │   ├── Navibar.tsx
│   │   ├── Navibar.css
│   │   └── ProtectedRoute.tsx
│   │
│   ├── pages/                   # Route-level views
│   │   ├── Login/
│   │   │   ├── ProfessorLogin.tsx
│   │   │   ├── ProfessorLogin.css
│   │   │   ├── StudentLogin.tsx
│   │   │   └── StudentLogin.css
│   │   ├── Home.tsx
│   │   ├── Home.css
│   │   ├── Maps.tsx
│   │   ├── Maps.css
│   │   ├── OfficeHours.tsx
│   │   ├── OfficeHours.css
│   │   ├── ProfessorDashboard.tsx
│   │   └── ProfessorDashboard.css
│   │
│   ├── App.tsx                  # Top-level router & layout
│   ├── index.css                # Global styles
│   └── main.tsx                 # React entry point
```
---

## 🔧 Prerequisites
```
• Node.js v16 or higher (required to run and build the frontend)
• npm (comes with Node.js, used to manage packages)
• Python 3.9 or higher (required for the Flask backend)
• A modern web browser (e.g., Chrome, Firefox, or Edge for app usage and testing)
```

---

## 🚀 Getting Started

### 1. Backend

```bash
cd backend
pip install Flask flask-cors        # Install Flask & dependencies
flask run                           # Start the API server (default: http://127.0.0.1:5000)
```

### 2. Frontend

```bash
npm install        # Install dependencies
npm run dev        # Start the dev server (default: http://localhost:5173)
```

### 3. Accessing the Webpage

Open your browser and navigate to [http://localhost:5173](http://localhost:5173) to view the application.  
Use the provided login credentials or create new ones in the database.

#### a. Professor Login
- **Username:** `eassaad`
- **Password:** `TheUniversityofToledo123`

#### b. Student Login
- **Username:** `sng`
- **Password:** `TheUniversityofToledo123`

---

## API Reference 📡

- `GET /api/professors` – Retrieve all professors  
- `GET /api/appointments/<professor_id>/<date>` – Get booked slots for a date  
- `POST /api/students` – Create a new appointment  
- `GET /api/appointments/professor/<professor_id>` – Get all appointments for a professor  
- `POST /api/login` – Authenticate user (student or professor)

---

## ⚙️ Environment Variables

```env
FLASK_APP=app.py
FLASK_ENV=development
DATABASE_URL=sqlite:///campus_navigator.db
CORS_ORIGINS=http://localhost:5173
```

---

## 📄 License

**MIT License**  
This project is licensed under the terms of the MIT License.
