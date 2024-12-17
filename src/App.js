import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss'; //import the SCSS file where Bootstrap is included.
import Layout from './layouts/Layout';
import Book from './pages/Book';
import Books from './pages/Books';
import Cart from './pages/Cart';
import User from './pages/User';
import AdminDashBoard from './pages/AdminDashBoard';
import ManagerDashBoard from './pages/ManagerDashBoard';

function App() {
  return (
    //Include components of the app
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Books />} />
          <Route path="/book/:id" element={<Book />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/user" element={<User />} />
          <Route path="/adminDashBoarad" element={<AdminDashBoard />} />
          <Route path="/managerDashBoarad" element={<ManagerDashBoard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
