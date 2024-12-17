import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss'; //import the SCSS file where Bootstrap is included.
import Layout from './layouts/Layout';

function App() {
  return (
    //Include components of the app
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
