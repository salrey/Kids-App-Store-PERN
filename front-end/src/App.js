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
import Reviews from "./Components/FormatReviews";

import { useState } from "react";


function App() {
    //useState at the parent level to capture updates on the total
    const [update, setUpdate] = useState()

  return (
    <>
      <NavBar update={update} />
      <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route path="/apps" element={<Index parentCallBack={setUpdate} />}/>
        <Route path="/apps/:id" element={<Show />}/>
        {/* <Route path="/apps/:id" element={<Show parentCallBackCart={setCart} cart={cart}/>}/> */}
        <Route path="/apps/new" element={<New />}/>
        <Route path="/apps/:id/edit" element={<Edit />}/>
        <Route path="/apps/:id/reviews" element={<Reviews apps={update} />}/>
        <Route path="*" element={<Reload />}/>
      </Routes>
    </>
    
  );
}

export default App;
