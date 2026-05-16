import React, { useContext } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Chatbot from './components/Chatbot';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import { AuthContext } from './context/AuthContext';

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return (
    <div style={{
      minHeight:'100vh', display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'center', background:'#f8f8f6',
      gap:'1rem',
    }}>
      <div style={{
        width:'48px', height:'48px', borderRadius:'50%',
        border:'4px solid #ffedd5', borderTopColor:'#f97316',
        animation:'spin 0.8s linear infinite',
      }} />
      <p style={{ color:'#9ca3af', fontSize:'0.9rem', fontWeight:500 }}>Loading Sync Events…</p>
      <style>{`@keyframes spin { to { transform:rotate(360deg); } }`}</style>
    </div>
  );
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  return children;
};

function App() {
  const location = useLocation();
  const isAuthPage = ['/login', '/register'].includes(location.pathname);

  return (
    <div className="App">
      {!isAuthPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/admin"
          element={<ProtectedRoute role="ROLE_ADMIN"><AdminDashboard /></ProtectedRoute>}
        />
        <Route
          path="/student"
          element={<ProtectedRoute role="ROLE_STUDENT"><StudentDashboard /></ProtectedRoute>}
        />
      </Routes>
      {!isAuthPage && <Chatbot />}
    </div>
  );
}

export default App;

