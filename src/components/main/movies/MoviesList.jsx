import Movies from "./Movies.jsx";

export default function MoviesList({ movies, onSelect }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movies key={movie?.id} movie={movie} onSelect={onSelect} />
      ))}
    </ul>
  );
}
