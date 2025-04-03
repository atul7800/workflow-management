import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProvideContext } from "../src/context/Context";
import { LoginForm } from "./components/LoginForm";
// import PrivateRoute from './components/auth/PrivateRoute';
// import LoginPage from './pages/LoginPage';
import WorkflowList from "./components/WorkflowList";
import CreateNewWorkflow from "./components/CreateNewWorkflow";
// import NotFoundPage from './pages/NotFoundPage';
// import './styles/main.css';

export default function App() {
  return (
    <ProvideContext>
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />

          <Route path="/workflows" element={<WorkflowList />} />

          <Route path="/createWorkflow" element={<CreateNewWorkflow />} />
        </Routes>
      </Router>
    </ProvideContext>
  );
}
