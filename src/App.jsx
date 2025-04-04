import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProvideContext } from "../src/context/Context";
import { LoginForm } from "./components/LoginForm";
import WorkflowList from "./components/WorkflowList";
import CreateNewWorkflow from "./components/CreateNewWorkflow";
import { SignupForm } from "./components/SignupForm";
import ProtectedRoute from "./components/shared/ProtectedRoute";
import AuthRedirectRoute from "./components/shared/AuthRedirectRoute";

export default function App() {
  return (
    <ProvideContext>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <AuthRedirectRoute>
                <LoginForm />
              </AuthRedirectRoute>
            }
          />
          <Route
            path="/workflows"
            element={
              <ProtectedRoute>
                <WorkflowList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/createWorkflow"
            element={
              <ProtectedRoute>
                <CreateNewWorkflow />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthRedirectRoute>
                <SignupForm />
              </AuthRedirectRoute>
            }
          />
        </Routes>
      </Router>
    </ProvideContext>
  );
}
