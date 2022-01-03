import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import Authors from "./pages/Authors";
import Quotes from "./pages/Quotes";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => (
  <Router basename="admin">
    <Navbar />
    <Routes>
      <Route path="/login" exact element={<Login />} />
      <Route path="/" exact element={<ProtectedRoute />}>
        <Route path="/" exact element={<Dashboard />} />
      </Route>
      <Route path="/categories" exact element={<ProtectedRoute />}>
        <Route path="/categories" exact element={<Categories />} />
      </Route>
      <Route path="/authors" exact element={<ProtectedRoute />}>
        <Route path="/authors" exact element={<Authors />} />
      </Route>
      <Route path="/quotes" exact element={<ProtectedRoute />}>
        <Route path="/quotes" exact element={<Quotes />} />
      </Route>
    </Routes>
  </Router>
);

export default App;
