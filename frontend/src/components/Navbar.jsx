import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  const linkStyle = (path) => ({
    color: isActive(path) ? '#f97316' : '#374151',
    fontWeight: isActive(path) ? 700 : 500,
    padding: '0.4rem 0.75rem',
    borderRadius: '6px',
    background: isActive(path) ? '#fff7ed' : 'transparent',
    transition: 'all 0.2s',
    fontSize: '0.9rem',
  });

  return (
    <nav className="nav">
      {/* Logo */}
      <Link to="/" style={{ textDecoration: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{
            background: 'linear-gradient(135deg, #f97316, #ea580c)',
            color: '#fff', borderRadius: '8px',
            width: '32px', height: '32px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1rem', fontWeight: 800, flexShrink: 0,
          }}>S</span>
          <span className="nav-logo" style={{ fontSize: '1.2rem' }}>SYNC EVENTS</span>
        </div>
      </Link>

      {/* Nav links */}
      <div className="nav-links">
        {user ? (
          <>
            <span style={{ color: '#6b7280', fontSize: '0.88rem', fontWeight: 500 }}>
              👋 {user.name}
            </span>
            <Link
              to={user.role === 'ROLE_ADMIN' ? '/admin' : '/student'}
              style={linkStyle(user.role === 'ROLE_ADMIN' ? '/admin' : '/student')}
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              style={{
                background: 'transparent', color: '#ef4444',
                border: '1.5px solid #ef4444', padding: '0.4rem 1rem',
                borderRadius: '8px', cursor: 'pointer', fontWeight: 600,
                fontSize: '0.88rem', transition: 'all 0.2s',
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={linkStyle('/login')}>Login</Link>
            <Link to="/register">
              <button style={{
                background: 'linear-gradient(135deg, #f97316, #ea580c)',
                color: '#fff', border: 'none',
                padding: '0.5rem 1.2rem', borderRadius: '8px',
                fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(249,115,22,0.3)',
              }}>
                Register
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
