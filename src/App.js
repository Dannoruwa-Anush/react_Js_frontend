import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss'; //import the SCSS file where Bootstrap is included.
import Layout from './layouts/Layout';
import Book from './pages/Book';
import Books from './pages/Books';
import Cart from './pages/Cart';
import UserDashBoard from './pages/RestrictedPages/UserDashBoard';
import AdminDashBoard from './pages/RestrictedPages/AdminDashBoard';
import ManagerDashBoard from './pages/RestrictedPages/ManagerDashBoard';
import ProtectedRoute from './layouts/ProtectedRoute';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

function App() {
  return (
    //Include components of the app
    <BrowserRouter>
      <Routes>
        {/* Access is unauthenticated */}
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Books />} />
          <Route path="/book/:id" element={<Book />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
        </Route>

        {/* Access is authenticated */}
        <Route element={<ProtectedRoute />}>
          <Route path="/userDashBoard" element={<UserDashBoard />} />
          <Route path="/adminDashboard" element={<AdminDashBoard />} />
          <Route path="/managerDashboard" element={<ManagerDashBoard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
