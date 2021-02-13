import React from 'react';
import Header from './components/Header';
import Characters from './components/Characters';
import ThemeContext from './components/Context/ThemeContext';

import './App.css';

function App() {
  return (
    <ThemeContext.Provider value= 'lightgreen'>
        <div className="App">
          <Header />
          <Characters />
        </div>
    </ThemeContext.Provider>
  );
}

export default App;
