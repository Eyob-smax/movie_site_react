export function Loader() {
  return <p className="loader">Loading...</p>;
}

export function ErrorElement({ message }) {
  return (
    <p className="error">
      <span>⛔</span>
      {message}
    </p>
  );
}
