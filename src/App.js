//import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import MegaMinx from './components/MegaMinx/MegaMinx';
import Navbar from './components/Navbar/Navbar';

const App = () => {
  const [reset,setReset] = useState(0);
  return (
    <div className="App">
      <Navbar/>
      <MegaMinx reset={setReset}/>
    </div>
  );
}

export default App;
