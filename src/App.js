import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Userdetails from './components/Userdetails';


function App() {
  return (
    <Router>
    <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/user/:username' element={<Userdetails />} />
    </Routes>
    </Router>
  );
}

export default App;
