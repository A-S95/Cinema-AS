import { useState } from 'react';
import { useMovieContext } from '../contexts/MovieContext';
import { getMovieDetails } from '../services/api';
import '../css/MovieCard.css';

function MovieCard({ movie }) {
  const { favorites, addFavorite, removeFavorite } = useMovieContext();
  const [showModal, setShowModal] = useState(false);
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const isFavorite = favorites.some(fav => fav.id === movie.id);

  const toggleFavorite = () => {
    isFavorite ? removeFavorite(movie.id) : addFavorite(movie);
  };

  const openModal = async () => {
    setLoading(true);
    try {
      const details = await getMovieDetails(movie.id);
      setMovieDetails(details);
      setShowModal(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setMovieDetails(null);
  };

  return (
    <>
      <div className="movie-card" onClick={openModal}>
        <div className="movie-poster">
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        </div>
        <div className="movie-info">
          <h3>{movie.title}</h3>
          <p>{movie.release_date?.slice(0, 4)}</p>
        </div>
        <button
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={(e) => { e.stopPropagation(); toggleFavorite(); }}
        >
          ♥
        </button>
      </div>

      {showModal && movieDetails && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <div className="modal-trailer">
              {movieDetails.trailerKey ? (
                <iframe
                  src={`https://www.youtube.com/embed/${movieDetails.trailerKey}?autoplay=1&mute=0&rel=0`}
                  title="Trailer"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
              )}
            </div>
            <div className="modal-info">
                {movieDetails.titlePT !== movieDetails.titleOriginal ? (
                <>
                    <h2>Original: {movieDetails.titleOriginal}</h2>
                    <h2>Traduzido: {movieDetails.titlePT}</h2>
                </>
                ) : (
                <h2>{movieDetails.titleOriginal}</h2>
                )}
              <p><strong>Género:</strong> {movieDetails.genres}</p>
              <p><strong>Avaliação:</strong> {movieDetails.voteAverage}/10</p>
              <p><strong>Data:</strong> {movieDetails.release_date}</p>
              <p><strong>Diretor:</strong> {movieDetails.director}</p>
              <p><strong>Sinopse:</strong> {movieDetails.overview}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MovieCard;