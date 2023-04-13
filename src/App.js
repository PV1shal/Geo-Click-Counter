import './App.css';
import { Routes, Route } from "react-router-dom";
import Counter from './Components/counter';
import GeoClicks from './Components/GeoClicks';


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Counter />} />
        <Route path='/geoCount' element={<GeoClicks />} />
      </Routes>
    </div >
  );
}

export default App;
