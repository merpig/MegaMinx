//import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import MegaMinx from './components/MegaMinx/MegaMinx';
import Navbar from './components/Navbar/Navbar';
import ColorsProvider from './contexts/colors';

const App = () => {
  const [,setReset] = useState(0);

  return (
    <div className="App">
      <ColorsProvider>
        <Navbar/>
        <MegaMinx reset={setReset}/>
      </ColorsProvider>
    </div>
  );
}

export default App;
