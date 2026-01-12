import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./components/Login";

import {
  AboutSection,
  BlogManager,
  Dashboard,
  FAQ,
  Packages,
  Policies,
  UserManagement,
} from "./pages";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* PROTECTED LAYOUT */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="blog" element={<BlogManager />} />
          <Route path="policies" element={<Policies />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="packages" element={<Packages />} />
          <Route path="about" element={<AboutSection />} />
        </Route>
      </Routes>
    </Router>
  );
}
