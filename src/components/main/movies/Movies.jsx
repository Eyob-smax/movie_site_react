export default function Movies({ movie, onSelect }) {
  return (
    <li onClick={() => onSelect(movie?.id)} key={movie?.id}>
      <img src={movie?.poster_path} alt={`${movie?.title} poster`} />
      <h3>{movie?.title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie?.release_date}</span>
        </p>
      </div>
    </li>
  );
}
