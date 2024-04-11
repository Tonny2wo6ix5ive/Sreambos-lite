import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Zoom from "./components/zoom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path='/zoom' Component={Zoom}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
