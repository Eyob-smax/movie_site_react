import { useEffect } from "react";
export function useKey(key, callback) {
  useEffect(() => {
    const escape = (e) => {
      if (e.code.toLowerCase() === key.toLowerCase()) {
        callback?.();
      }
    };
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("keydown", escape);
    };
  }, [key, callback]);
}
