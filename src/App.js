import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import News from './components/News';
import BackToTopButton from './components/BackToTopButton';
import { SavedArticlesProvider } from './context/SavedArticlesContext';
import { ThemeProvider } from './context/ThemeContext'; // <-- Import ThemeProvider
import SavedArticles from './components/SavedArticles'; 

function App() {
  return (
    <ThemeProvider> {/* <-- Wrap with ThemeProvider */}
      <SavedArticlesProvider>
        <Router>
          <Navbar />
          <Routes>
            {/* ... your routes ... */}
            <Route exact path="/" element={<News key="general" category="general" />} />
            <Route exact path="/business" element={<News key="business" category="business" />} />
            <Route exact path="/entertainment" element={<News key="entertainment" category="entertainment" />} />
            <Route exact path="/health" element={<News key="health" category="health" />} />
            <Route exact path="/science" element={<News key="science" category="science" />} />
            <Route exact path="/sports" element={<News key="sports" category="sports" />} />
            <Route exact path="/technology" element={<News key="technology" category="technology" />} />
            <Route exact path="/search/:query" element={<News key="search" />} />
            <Route exact path="/saved" element={<SavedArticles />} />
          </Routes>
          <BackToTopButton />
        </Router>
      </SavedArticlesProvider>
    </ThemeProvider>
  );
}

export default App;