export default function MoviesCounter({ moviesArray }) {
  return (
    <p className="num-results">
      Found <strong>{moviesArray.length}</strong> results
    </p>
  );
}
