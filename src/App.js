import React from 'react';

// Components
import Header from './components/Header/Header.component';
import Home from './pages/Home/Home';

// Styles
import { GlobalStyle } from './GlobalStyle';

function App() {
  return (
    <div className="App">
      <Header />
      <Home />
      <GlobalStyle />
    </div>
  );
}

export default App;
