import './App.css';
import Navbar from './components/header/Navbar';
import Newnav from './components/newnavbaar/Newnav';
import Maincomp from './components/home/Maincomp';
import Footer from './components/footer/Footer';
import SignUp from './components/signup_sign/SignUp';
import { Routes, Route } from "react-router-dom";
import Signin from './components/signup_sign/Signin';
import Cart from './components/cart/Cart';
import Buynow from './components/buynow/Buynow';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from 'react';


function App() {

  const [data, setData] = useState(false);


  useEffect(() => {
    setTimeout(() => {
      setData(true)
    }, 3000)
  }, [])

  return (
    <>
      {
        data ? (
          <>
            <Navbar />
            <Newnav />
            <Routes>
              <Route path="/" element={<Maincomp />} />
              <Route path="/login" element={<Signin />} />
              <Route path="/getproductsone/:id" element={<Cart />} />
              <Route path="/register" element={<SignUp />} />
              <Route path="/buynow" element={<Buynow />} />
            </Routes>
            <Footer />
          </>
        ) : (
          <div className='circle'>
            <CircularProgress />
            <h2>Loading...</h2>
          </div>
        )
      }

    </>
  );
}

export default App;




