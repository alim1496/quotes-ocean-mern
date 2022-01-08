import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Auth from "../utils/auth";

const ProtectedRoute = () => {
    return Auth.isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
