import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axiosInstance from "./config/axiosConfig";
import { addAuth } from "./Redux/features/authSlice";
import { addUser } from "./Redux/features/userSlice";

export default function AppInitializer({ children }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const initAuth = async () => {
      try {
        const res = await axiosInstance.get("/api/auth/me");

        if (!cancelled) {
          dispatch(addAuth(res.data.authenticated));
          dispatch(addUser(res.data.user));
        }
      } catch (error) {
        if (error.response?.status === 401) {
          if (!cancelled) {
            dispatch(addAuth(false));
            dispatch(addUser(null));
          }
        } else {
          console.error("Auth init failed", error);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    initAuth();

    return () => {
      cancelled = true;
    };
  }, [dispatch]);

  // ✅ Block app rendering until auth is resolved
  if (loading) return null; // or <Loading />

  return children;
}
