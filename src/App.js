import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss'; //import the SCSS file where Bootstrap is included.
import Layout from './layouts/Layout';
import Book from './pages/Book';
import Books from './pages/Books';
import Cart from './pages/Cart';
import UserDashBoard from './pages/restricted-pages/dashboard-pages/UserDashBoard';
import AdminDashBoard from './pages/restricted-pages/dashboard-pages/AdminDashBoard';
import ManagerDashBoard from './pages/restricted-pages/dashboard-pages/ManagerDashBoard';
import ProtectedRoute from './layouts/ProtectedRoute';
import Login from './pages/auth-pages/Login';
import Register from './pages/auth-pages/Register';
import UserPasswordReset from './pages/auth-pages/UserPasswordReset';
import OrderConfirmation from './pages/restricted-pages/dashboard-pages/common-restricted-pages/order/OrderConfirmation';

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
            <Route path="/orderConfirmation" element={<OrderConfirmation />} />
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
