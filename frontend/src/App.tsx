import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Authenticated from "./layouts/Authenticated";
import HomePage from "./pages/HomePage";
import ResumeBuilder from "./pages/ResumeBuilder";
import ResumePreview from "./components/ResumePreview";
import LoginForm from "./pages/LoginForm";
import SignupForm from "./pages/SignupForm";
import { RootState } from "./store/store";

function App() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />

      {/* Protected Routes */}
      <Route element={<Authenticated />}>
        <Route path="/dashboard" element={<HomePage />} />
        <Route path="/builder" element={<ResumeBuilder />} />
        <Route path="/preview/:id" element={<ResumePreview />} />
      </Route>

      {/* Redirect Unauthenticated Users */}
      <Route path="*" element={isAuthenticated ? <HomePage /> : <LoginForm />} />
    </Routes>
  );
}

export default App;
