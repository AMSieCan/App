import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'semantic-ui-react';
import axios from 'axios';

function App() {
  const [text, setText] = useState('');

  useEffect(() => {
    async function fetchData() {
      const data = await axios.get('http://localhost:8000/');
      setText(data.data);
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

        <Button>{text}</Button>
      </header>
    </div>
  );
}

export default App;
