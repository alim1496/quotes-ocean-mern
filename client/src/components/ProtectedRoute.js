import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
    return window.user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
