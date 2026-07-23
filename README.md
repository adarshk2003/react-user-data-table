# Minimalist React User Directory (Axios API Table)

A modern, highly polished, minimalistic React web application built with **Vite** and **Axios** that presents user data in an interactive table with sorting, real-time search, filters, pagination, profile view modals, and simulated CRUD operations.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.3-blue)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF)
![Axios](https://img.shields.io/badge/Axios-1.7-purple)

---

## ✨ Features

- **⚡ Minimalistic Aesthetic**: Clean, modern dark/light mode UI built with CSS custom design tokens, smooth micro-interactions, and custom Google Fonts (*Plus Jakarta Sans* & *Inter*).
- **📡 Axios API Layer**: Custom Axios instance with interceptors, request execution timer, unified error handling, and API source switcher (`JSONPlaceholder` / `DummyJSON`).
- **📊 Minimalist KPI Stats**: Live summary badges showing total users, active status ratios, department count, and locations.
- **🔍 Instant Search & Multi-Filters**: Search across name, username, email, company, and city. Filter by department and active status.
- **↕️ Sortable Columns**: Click table headers to sort by Name, Email, Department, Location, or Status (Ascending/Descending).
- **📝 Slide-Over Modals & Form Validation**:
  - View full user details in a slide-over modal.
  - Create and edit user profiles via Axios `POST` and `PUT` requests.
  - Delete users via Axios `DELETE` calls.
- **📄 Export to CSV**: One-click export of currently filtered user data to a `.csv` file.
- **📱 Responsive Layout**: Seamless design across desktop, tablet, and mobile displays.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/react-user-data-table.git
   cd react-user-data-table
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start local development server:**
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:3000`

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 📂 Project Structure

```text
├── src/
│   ├── assets/          # Static assets
│   ├── components/      # Modular UI components
│   │   ├── Header.jsx           # App navbar & theme toggle
│   │   ├── UserStats.jsx        # Minimalist KPI metrics
│   │   ├── TableControls.jsx    # Search bar & filter dropdowns
│   │   ├── UserTable.jsx        # Data table & action menu
│   │   ├── SkeletonLoader.jsx   # Shimmer loading state
│   │   ├── UserDetailModal.jsx  # Profile detail modal
│   │   ├── UserFormModal.jsx    # Add / Edit user form
│   │   ├── Pagination.jsx       # Pagination controls
│   │   └── ToastNotification.jsx# Floating API alerts
│   ├── services/
│   │   └── api.js       # Axios client setup & interceptors
│   ├── App.jsx          # Main application & state manager
│   ├── main.jsx         # React DOM entrypoint
│   └── index.css        # Minimalist CSS design system tokens
├── index.html           # HTML template with Google Fonts
├── vite.config.js       # Vite configuration
└── package.json         # Project dependencies & scripts
```

---

## 🛠️ Built With

- **[React](https://react.dev/)** — UI Library
- **[Vite](https://vitejs.dev/)** — Next Generation Frontend Tooling
- **[Axios](https://axios-http.com/)** — Promise-based HTTP Client
- **[Lucide React](https://lucide.dev/)** — Minimalist Icon Library

---

## 📄 License

This project is licensed under the MIT License.
