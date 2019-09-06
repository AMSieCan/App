import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'semantic-ui-react';
import axios from 'axios';
import CounterView from './CounterView';

function App() {
  const [text, setText] = useState('');
  const [counter, setCounter] = useState(0);

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
        <CounterView counter={counter} />
        <CounterView counter={counter} />
        <Button onClick={() => setCounter(counter + 1)}>Plus 1</Button>
      </header>
    </div>
  );
}

export default App;
