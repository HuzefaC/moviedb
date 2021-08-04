import React from 'react';

// Routing
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Header from './components/Header/Header.component';
import Home from './pages/Home/Home';

// Styles
import { GlobalStyle } from './GlobalStyle';
import Movie from './components/Movie';
import NotFound from './components/NotFound';

const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:movieId" element={<Movie />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
    <GlobalStyle />
  </Router>
);
export default App;
