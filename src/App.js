import './App.css';
import {BrowserRouter} from 'react-router-dom';
import Header from './components/Header';
import Mid from './components/Mid';
import Footer from './components/Footer';


function App() {
  return (
    <div>
      <BrowserRouter>
      <Header></Header>
      <Mid></Mid>
      {/* <Footer></Footer> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
