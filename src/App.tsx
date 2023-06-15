import { useState } from "react";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import GlobalStyles from "./styles/global";
import Header from "./components/Header";
import SignIn from "./Views/SignIn";
import SignUp from "./Views/Signup";
import { AuthProvider, useAuth } from "./Contexts/AuthContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Views/Dashboard";
import AuthenticatedRoute from "./components/AuthenticatedRoute";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <AuthProvider>
         
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route
              path="dashboard"
              element={<AuthenticatedRoute e={<Dashboard />} />}
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
