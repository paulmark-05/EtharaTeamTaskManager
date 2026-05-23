import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import AuthProvider from "./context/AuthContext";

import ThemeProvider from "./context/ThemeContext";

import ProtectedRoute from "./components/ProtectedRoute";

import Navbar from "./components/Navbar";

import Login from "./pages/Login";

import Signup from "./pages/Signup";

import Dashboard from "./pages/Dashboard";

import Projects from "./pages/Projects";

import Tasks from "./pages/Tasks";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public */}
            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/signup"
              element={<Signup />}
            />

            {/* Protected */}
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <>
                    <Navbar />

                    <main className="main-page">
                      <Routes>
                        <Route
                          path="/"
                          element={
                            <Navigate to="/dashboard" />
                          }
                        />

                        <Route
                          path="/dashboard"
                          element={
                            <Dashboard />
                          }
                        />

                        <Route
                          path="/projects"
                          element={
                            <Projects />
                          }
                        />

                        <Route
                          path="/tasks"
                          element={
                            <Tasks />
                          }
                        />
                      </Routes>
                    </main>
                  </>
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;