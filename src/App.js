import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss'; //import the SCSS file where Bootstrap is included.
import Layout from './layouts/Layout';
import Book from './pages/Book';
import Books from './pages/Books';
import Cart from './pages/Cart';
import UserDashBoard from './pages/restrictedPages/dashboard/UserDashBoard';
import AdminDashBoard from './pages/restrictedPages/dashboard/AdminDashBoard';
import ManagerDashBoard from './pages/restrictedPages/dashboard/ManagerDashBoard';
import ProtectedRoute from './layouts/ProtectedRoute';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import UserPasswordReset from './pages/auth/UserPasswordReset';

function App() {
  return (
    //Include components of the app
    <BrowserRouter>
      <Routes>

        {/* Common layout*/}
        <Route path="/" element={<Layout />}>
        
          {/* Access is unauthenticated */}
          <Route path="/" element={<Books />} />
          <Route path="/book/:id" element={<Book />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<UserPasswordReset />} />



          {/* Access is authenticated */}
          <Route element={<ProtectedRoute />}>
            <Route path="/userDashBoard" element={<UserDashBoard />} />
            <Route path="/adminDashboard" element={<AdminDashBoard />} />
            <Route path="/managerDashboard" element={<ManagerDashBoard />} />
          </Route>

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
