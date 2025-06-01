import { useEffect } from "react";
export function useKey(selectedMovie, callback) {
  useEffect(() => {
    const escape = (e) => {
      if (selectedMovie && e.code === "Escape") {
        callback?.();
      }
    };
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("keydown", escape);
    };
  }, [selectedMovie, callback]);
}
