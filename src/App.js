import './App.css';
import { Form } from './components/form/Form';
import "bootstrap/dist/css/bootstrap.min.css";
import { Home } from './components/home/Home';

function App() {
  return (
    <div className="App">
      <Home />
      <Form />
    </div>
  );
}

export default App;
