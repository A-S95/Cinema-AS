const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL || "https://api.themoviedb.org/3";
const LANGUAGE = import.meta.env.VITE_LANGUAGE || "pt-BR";

export const getPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=${LANGUAGE}`);
  return (await response.json()).results;
};

export const searchMovies = async (query) => {
  const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=${LANGUAGE}&query=${encodeURIComponent(query)}`);
  return (await response.json()).results;
};

export const getMovieDetails = async (movieId) => {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=${LANGUAGE}&append_to_response=credits,videos`
  );
  const data = await response.json();

  // Pega o trailer oficial do YouTube (prioridade: Trailer Oficial → Trailer → Teaser)
  const trailer = data.videos?.results?.find(
    video => video.site === "YouTube" && (video.type === "Trailer" || video.type === "Teaser")
  );

  const director = data.credits?.crew?.find(c => c.job === "Director")?.name || "Não informado";
  const writer = data.credits?.crew?.find(c => c.department === "Writing")?.name || "Não informado";

  return {
    ...data,
    trailerKey: trailer?.key || null, // ex: "dQw4w9WgXcQ"
    director,
    writer,
    genres: data.genres?.map(g => g.name).join(", ") || "Não informado",
    voteAverage: data.vote_average ? data.vote_average.toFixed(1) : "N/A",
    overview: data.overview || "Sinopse não disponível.",
    titlePT: data.title,
    titleOriginal: data.original_title,
  };
};