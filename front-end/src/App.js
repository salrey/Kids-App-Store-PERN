//Dependencies
import { Routes, Route } from "react-router-dom"
//Components
import NavBar from './Components/NavBar'

//Pages
import Home from "./Pages/Home";
import Index from "./Pages/Index";
import Show from "./Pages/Show";
import New from "./Pages/New";
import Edit from "./Pages/Edit";
import Reload from "./Pages/Reload";


function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route path="/apps" element={<Index />}/>
        <Route path="/apps/:id" element={<Show />}/>
        <Route path="/apps/new" element={<New />}/>
        <Route path="/apps/:id/edit" element={<Edit />}/>
        <Route path="*" element={<Reload />}/>
      </Routes>
    </>
    
  );
}

export default App;
