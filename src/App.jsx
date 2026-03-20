import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ManageNews from "./pages/ManageNews";
import FetchNews from "./pages/FetchNews";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/dashboard" element={
        <PrivateRoute><Dashboard /></PrivateRoute>
      } />

      <Route path="/news" element={
        <PrivateRoute><ManageNews /></PrivateRoute>
      } />

      <Route path="/fetch" element={
        <PrivateRoute><FetchNews /></PrivateRoute>
      } />

      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default App;