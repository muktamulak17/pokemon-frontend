import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

interface Props {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const { username } = useSelector((state: RootState) => state.auth);
  return username ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
