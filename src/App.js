import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { Form } from './components/form/Form';
import "bootstrap/dist/css/bootstrap.min.css";
import { Home } from './components/home/Home';
import { Header } from './components/header/Header';
import { Context } from './components/context/Context';
import { isOwner } from './components/contract_methods/owner';

const WrapperComp = ({ children }) => {
  const [owner, setOwner] = useState(false);

  useEffect(() => {
    ownerCheck();
  }, []);

  const ownerCheck = async () => {
    let { success } = await isOwner();
    console.log("ownercheck",success);
    setOwner(success);
  }

  return (
    <div>
      {owner && children}
    </div>
  )
}

function App() {
  
  return (
    <Context className="App">
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mintnft" element={<WrapperComp><Form /></WrapperComp>} />
        </Routes>
      </BrowserRouter>
    </Context>
  );
}

export default App;
