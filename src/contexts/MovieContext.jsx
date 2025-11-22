import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Carrega do localStorage na montagem
  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  // Salva sempre que mudar
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (movie) => {
    setFavorites((prev) => {
      if (prev.some((m) => m.id === movie.id)) return prev; // evita duplicatas
      return [...prev, movie];
    });
  };

  const removeFavorite = (movieId) => {
    setFavorites((prev) => prev.filter((m) => m.id !== movieId));
  };

  const value = {
    favorites,
    addFavorite,      // ← nomes corrigidos
    removeFavorite,   // ← nomes corrigidos
  };

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
};