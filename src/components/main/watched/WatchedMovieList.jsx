import InfoList from "../InfoList.jsx";

export default function WatchedMovieList({ watched, OnDeleteMovie }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <li key={movie.id}>
          <img src={movie.poster_path} alt={`${movie.title} poster`} />
          <h3>{movie.title}</h3>
          <div>
            <InfoList icon={"⭐️"} info={movie.imbd_rating} />
            <InfoList icon={"🌟"} info={movie.user_rating} />
            <InfoList icon={"⏳"} info={movie.runtime} />
          </div>
          <button
            onClick={() => OnDeleteMovie(movie.id)}
            className="btn-delete"
          >
            <span style={{ fontSize: "14px" }}>X</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
