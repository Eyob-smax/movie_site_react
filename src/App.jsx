import { useEffect, useRef, useState } from "react";
import Box from "./components/main/Box.jsx";
import Nav from "./components/nav/Nav.jsx";
import MainView from "./components/main/MainView.jsx";
import MoviesList from "./components/main/movies/MoviesList.jsx";
import WatchedSummary from "./components/main/watched/WatchedSummary.jsx";
import WatchedMovieList from "./components/main/watched/WatchedMovieList.jsx";
import Search from "./components/nav/Search.jsx";
import MoviesCounter from "./components/nav/MoviesCounter.jsx";
import MovieDetails from "./components/main/movies/MovieDetails.jsx";
import { Loader, ErrorElement } from "./components/Util.jsx";

const apiKey = "21d63f70af9ef597fdeb1bb793050970";
const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=`;
const posterUl = "https://image.tmdb.org/t/p/w500";

const arr = [1, 2, 3, 4, 5];

const upcomingUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=${String(
  arr[Math.floor(Math.random() * arr.length)]
)}`;

export default function App() {
  const [moviesArray, setMoviesArray] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const timeOutId = useRef(null);

  function debouncedSearch(fn, delay = 1000) {
    clearTimeout(timeOutId.current);
    timeOutId.current = setTimeout(() => {
      fn();
    }, delay);
  }

  function closeDetails() {
    setSelectedMovie(null);
  }

  function handleDeleteMovie(id) {
    setWatched((prev) => prev.filter((movie) => movie.id !== id));
  }

  function handleSelectMovie(id) {
    const movie = moviesArray.find((item) => item.id === id);
    setSelectedMovie(movie);
  }

  useEffect(() => {
    const escape = () => {
      if (selectedMovie) {
        setSelectedMovie(null);
      }
    };
    document.addEventListener("keypress", escape);
    return () => {
      document.removeEventListener("keypress", escape);
    };
  }, [selectedMovie]);

  useEffect(() => {
    setIsLoading(true);
    setError("");
    const controller = new AbortController();

    const fetchData = async () => {
      setSelectedMovie(null);
      try {
        const response = await Promise.race([
          fetch((query ? url : upcomingUrl) + query, {
            signal: controller.signal,
          }),
          new Promise((_, reject) =>
            setTimeout(
              () => reject(new Error("Slow Internet: Request timed out")),
              30000
            )
          ),
        ]);

        const data = response instanceof Error ? [] : await response.json();
        if (!data?.results.length) {
          setError("Can't find any movies");
          return;
        }
        setMoviesArray(
          data.results.map((item) => ({
            ...item,
            poster_path: `${posterUl}${item.poster_path}`,
          }))
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    setError("");
    debouncedSearch(fetchData);
    return () => {
      controller.abort();
      clearTimeout(timeOutId.current);
    };
  }, [query]);

  return (
    <>
      <Nav>
        <Search query={query} setQuery={setQuery} />
        <MoviesCounter moviesArray={moviesArray} />
      </Nav>
      <MainView>
        <Box>
          {error ? (
            <ErrorElement message={error} />
          ) : isLoading ? (
            <Loader />
          ) : (
            <MoviesList movies={moviesArray} onSelect={handleSelectMovie} />
          )}
        </Box>
        <Box>
          {selectedMovie ? (
            <MovieDetails
              movie={selectedMovie}
              onClose={closeDetails}
              onSetWatched={setWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                OnDeleteMovie={handleDeleteMovie}
              />
            </>
          )}
        </Box>
      </MainView>
    </>
  );
}
