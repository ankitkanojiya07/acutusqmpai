import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/login";
import Fetchsupplier from "./components/fetchsupplier/fetchsupplier";
import Fetchinfo from "./components/fetchInfo/fetchInfo";
import SurveyReporting from "./components/Reporting/reporting";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        {isAuthenticated && <Navbar onLogout={handleLogout} />}
        <Routes>
          <Route
            path="/login"
            element={
              !isAuthenticated ? (
                <Login onLogin={() => setIsAuthenticated(true)} />
              ) : (
                <Navigate to="/" />
              )
            }
          />

          <Route
            path="*"
            element={
              isAuthenticated ? (
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/fetchsupplier" element={<Fetchsupplier />} />
                  <Route path="/reporting" element={<SurveyReporting />} />
                  <Route path="/fetchInfo" element={<Fetchinfo />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
