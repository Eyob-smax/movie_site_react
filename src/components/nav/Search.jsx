import { useEffect, useRef } from "react";
export default function Search({ query, setQuery }) {
  const inputEl = useRef(null);
  useEffect(() => {
    inputEl.current.focus();
  });

  useEffect(() => {
    const callBack = (e) => {
      if (e.code !== "Enter") return;
      if (document.activeElement === inputEl.current) return;
      inputEl.current.focus();
      setQuery("");
    };

    document.addEventListener("keydown", callBack);

    return () => document.removeEventListener("keydown", callBack);
  }, [setQuery]);

  return (
    <input
      ref={inputEl}
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
