// https://www.youtube.com/watch?v=9F8bzIlgJ4g
import { useState, useEffect } from "react";
import { BrowserRouter as Router,Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import './App.scss';
import Header from "./components/header";
import LeftNav from "./components/leftNav";
import Main from "./components/main";
import Admin from "./components/admin/Admin";
import EmployeeView from "./components/EmployeeView";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<EmployeeView/>} />
          <Route path='/admin' element={<Admin/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
