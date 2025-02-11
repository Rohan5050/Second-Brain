import { Navigate, Outlet } from "react-router";

const ProtectedRoute  = () => {
    const isAuthenticated = localStorage.getItem("token")
    return isAuthenticated? <Outlet/> : <Navigate to={"/signup"} />
}
export default ProtectedRoute;