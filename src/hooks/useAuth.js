import { useSelector, shallowEqual } from "react-redux";

export const useAuth = () => {
  return useSelector(
    (state) => ({
      isAuth: state.isAuth,
      user: state.user,
    }),
    shallowEqual
  );
};
