import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSavedArticles } from '../context/SavedArticlesContext';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();
  const { savedArticles } = useSavedArticles();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth(); // Get user and logout function

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  const handleLogout = () => {
    logout();
    handleNavCollapse();
    navigate('/login');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchText.trim()) {
      navigate(`/search/${searchText}`);
      setSearchText('');
      setIsNavCollapsed(true);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark app-navbar">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">NewsApp</Link>
        <button className="navbar-toggler" type="button" onClick={handleNavCollapse} aria-expanded={!isNavCollapsed} aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>

        <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link className="nav-link" to="/" onClick={handleNavCollapse}>Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/technology" onClick={handleNavCollapse}>Technology</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/sports" onClick={handleNavCollapse}>Sports</Link></li>
            {user && ( // Only show Saved link if user is logged in
              <li className="nav-item">
                <Link className="nav-link" to="/saved" onClick={handleNavCollapse}>
                  Saved <span className="badge bg-secondary">{savedArticles.length}</span>
                </Link>
              </li>
            )}
          </ul>
          
          <div className="d-flex align-items-center">
            <ul className="navbar-nav">
              {user ? (
                <li className="nav-item">
                  <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                      <Link className="nav-link" to="/login" onClick={handleNavCollapse}>Login</Link>
                  </li>
                  <li className="nav-item">
                      <Link className="nav-link" to="/signup" onClick={handleNavCollapse}>Signup</Link>
                  </li>
                </>
              )}
            </ul>
            
            <form className="d-flex mx-3" onSubmit={handleSearchSubmit}>
                <input className="form-control me-2" type="search" placeholder="Search News..." aria-label="Search" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>

            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" role="switch" id="themeSwitch" onClick={toggleTheme} checked={theme === 'light'} readOnly />
                <label className="form-check-label" htmlFor="themeSwitch">{theme === 'light' ? '💡' : '🌙'}</label>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}