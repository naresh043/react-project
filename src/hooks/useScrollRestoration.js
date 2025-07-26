import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function useScrollRestoration(storageKey = "scroll-position") {
  const location = useLocation();

  // Restore scroll position on page load or when navigating back
  useEffect(() => {
    const scrollY = sessionStorage.getItem(storageKey);
    if (scrollY !== null) {
      window.scrollTo(0, parseInt(scrollY));
      sessionStorage.removeItem(storageKey);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.key, storageKey]);

  // Save scroll position before leaving
  useEffect(() => {
    const saveScroll = () => {
      sessionStorage.setItem(storageKey, window.scrollY);
    };

    window.addEventListener("beforeunload", saveScroll);
    return () => {
      saveScroll(); // save on unmount
      window.removeEventListener("beforeunload", saveScroll);
    };
  }, [storageKey]);
}
