import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Auth from './pages/Auth';
import ProtectedRoute from './components/ProtectedRoute/indext';
import DashboardRoutes from './pages/Dashboard/DashboardRoutes';

function App() {
  return (
    <Router>
      <Routes>
        {/* TODO: Create 404 page */}
        <Route path="*" element={<h1>Not Found</h1>} />
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <DashboardRoutes />
            </ProtectedRoute>
          }
          errorElement={<h1>Something went wrong</h1>}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
