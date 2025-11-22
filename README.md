# 🎬 Cinema-AS

**Cinema-AS** is a modern web application built with **React**, designed to provide users with an engaging movie browsing and exploration experience. The application focuses on a dynamic and interactive interface to present detailed information about movies, leveraging data from **The Movie Database (TMDB) API**.

---

## ✨ Key Features

* **Home Page:** Displays a main listing of movies, utilizing data from the TMDB.
* **Movie Details:** Detailed viewing of information for each movie (synopsis, rating, trailer, etc.).
* **Favorites:** A dedicated page for the user to save and manage their list of favorite movies.
* **Quick Navigation:** `NavBar` component for easy access between different sections.
* **Centralized State Management:** Use of `MovieContext` for efficient state management.

---

## 🛠️ Technologies and Dependencies

### 💻 Tech Stack

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | React | Primary library for building the user interface. |
| **API** | Themoviedb API | External data source for movie information and images. |
| **Tool** | Vite | Fast bundler for the development environment. |

### 📦 Essential Dependencies

This project uses the following key dependencies:

* `react`: 18.3.1
* `react-dom`: 18.3.1
* `react-router-dom`: 6.28.0 (For routing and navigation)

---

## 📂 Project Structure
```
The file and directory structure is organized for clarity and modularity:
.
├── src
│   ├── components
│   │   ├── MovieCard.jsx
│   │   └── NavBar.jsx
│   ├── contexts
│   │   └── MovieContext.jsx
│   ├── css
│   ├── pages
│   │   ├── Favorites.jsx
│   │   └── Home.jsx
│   ├── services
│   │   └── api.js
│   ├── App.jsx
│   └── main.jsx
└── ...
```
