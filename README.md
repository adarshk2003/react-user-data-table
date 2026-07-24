# Full-Stack MVC & REST API User Directory Application

A production-grade full-stack web application following strict **MVC (Model-View-Controller)** pattern and **REST API Best Practices**.

- **Frontend (`client/`)**: React 18, Vite, Axios, and Minimalist CSS Design System structured with pure Views, Custom Hook Controller, Domain Models, and REST HTTP Service.
- **Backend (`server/`)**: Node.js & Express REST API Server implementing standard HTTP methods (`GET`, `POST`, `PUT`, `DELETE`), RESTful HTTP status codes (`200 OK`, `201 Created`, `204 No Content`, `400`, `404`, `500`), and JSON resource formatting.

---

## 🏛️ Full-Stack MVC Architecture

```text
├── client/                      # REACT FRONTEND (UI MVC)
│   ├── src/
│   │   ├── models/              # MODEL: Domain Entity, Validation & DTO Mappers
│   │   │   └── UserModel.js
│   │   ├── controllers/         # CONTROLLER: Hook managing business logic & state
│   │   │   └── useUserController.js
│   │   ├── views/               # VIEW: Presentational UI Components
│   │   │   ├── components/      # TableView, StatsView, ControlsView, Modals, Pagination
│   │   │   └── UserDirectoryView.jsx # Primary View
│   │   ├── services/            # SERVICE: Axios REST API Client & HTTP Interceptors
│   │   │   ├── httpClient.js    # Base Axios setup & HTTP headers
│   │   │   └── userRestService.js# Resource endpoints (GET, POST, PUT, DELETE)
│   │   ├── App.jsx
│   │   └── index.css            # Minimalist CSS tokens & themes
│   └── package.json
│
└── server/                      # NODE.JS EXPRESS BACKEND (REST API MVC)
    ├── controllers/             # CONTROLLER: Request/Response & HTTP status codes
    │   └── userController.js
    ├── models/                  # MODEL: Data layer & resource operations
    │   └── userModel.js
    ├── routes/                  # ROUTER: RESTful Endpoint mapping (/api/users)
    │   └── userRoutes.js
    ├── server.js                # Express app entrypoint & CORS middleware
    └── package.json
```

---

## 🛰️ REST API Endpoints

| HTTP Verb | Endpoint | Action | Success Status |
| :--- | :--- | :--- | :--- |
| **`GET`** | `/api/users` | Fetch list of users | `200 OK` |
| **`GET`** | `/api/users/:id` | Fetch single user by ID | `200 OK` |
| **`POST`** | `/api/users` | Create new user resource | `201 Created` |
| **`PUT`** | `/api/users/:id` | Replace / Update existing user | `200 OK` |
| **`DELETE`** | `/api/users/:id` | Delete user resource | `200 OK` / `204 No Content` |

---

## 🚀 Running the Project

### 1. Install Dependencies
```bash
npm run install:all
```

### 2. Start Express REST API Server (Port 5000)
```bash
npm run dev:server
```

### 3. Start React Frontend Client (Port 3000)
```bash
npm run dev:client
```
Open **`http://localhost:3000`** in your browser.
