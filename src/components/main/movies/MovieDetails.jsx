import { useEffect, useState } from "react";
import StarRating from "../StarRating";
const apiKey = "21d63f70af9ef597fdeb1bb793050970";
const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;
export default function MovieDetails({
  onClose,
  movie,
  onSetWatched,
  watched,
}) {
  const [genre, setGenere] = useState(null);
  const [userRating, setUserRating] = useState(0);

  const isWatched = watched.find((item) => item.id === movie.id);
  function handleAddWatched() {
    const watchedMovie = {
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      user_rating: userRating,
      imbd_rating: Number(movie.popularity.toFixed(1)),
      runtime: 210,
    };
    onSetWatched((prev) => [...prev, watchedMovie]);
    onClose();
  }

  useEffect(() => {
    localStorage.setItem("watched_movies", JSON.stringify[watched]);
  }, [watched]);

  useEffect(() => {
    if (!movie) return;
    document.title = `Watch | ${movie.title}`;
    return () => {
      document.title = "usePopcorn";
    };
  }, [movie]);

  useEffect(() => {
    const fetchedGenre = async () => {
      try {
        const response = await fetch(genreUrl);
        const data = await response.json();
        const moviesGenre = movie.genre_ids;
        const genreIds = data.genres
          .filter((genre) => {
            return moviesGenre.some((item) => item === genre.id);
          })
          .slice(0, 3);
        setGenere(genreIds);
      } catch (err) {
        console.error(err);
      }
    };
    fetchedGenre();
    return () => {};
  }, [movie]);

  return (
    <div className="details">
      <header>
        <button onClick={() => onClose()} className="btn-back">
          &larr;
        </button>
        <img src={movie?.poster_path} alt={movie.title} />

        <div className="details-overview">
          <h2>{movie?.title}</h2>
          <p>{movie?.release_date} &bull; </p>
          <p>
            {genre && genre.map(({ id, name }) => <span key={id}>{name}</span>)}
          </p>
          <p>
            <span>⭐</span> {movie.vote_average.toFixed(1)} IMDB Rating
          </p>
        </div>
      </header>

      <section>
        {!isWatched ? (
          <div className="rating">
            <StarRating key={movie.id} size={24} onSetRating={setUserRating} />
            <button onClick={handleAddWatched} className="btn-add">
              + Add to list
            </button>
          </div>
        ) : (
          <p className="rating" style={{ textAlign: "center" }}>
            You rated this movie{" "}
            {watched.find((m) => m.id === movie.id).user_rating}⭐
          </p>
        )}
        <p>
          <em>{movie.overview}</em>
        </p>
      </section>
    </div>
  );
}
