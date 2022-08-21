import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './components/home';
import AddEmployee from './components/add_employee';
import ListEmployee from './components/list_employee';
import Footer from './components/footer';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/add-employee" exact element={<AddEmployee />} />
          <Route path="/list-employees" exact element={<ListEmployee />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
