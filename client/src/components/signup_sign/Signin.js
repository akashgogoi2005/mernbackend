import React, { useContext,useState  } from 'react'
import "./signup.css"
import { NavLink } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginContext } from '../context/ContextProvider';
// import { BASE_URL } from '../../services/helper';

const Signin = () => {

  const [logdata, setData] = useState({
    email: "",
    password: ""
  });
  console.log(logdata);

  
  const { account, setAccount } = useContext(LoginContext);
  console.log(account)



  const adddata = (e) => {
    const { name, value } = e.target;

    setData(() => {
      return {
        ...logdata,
        [name]: value
      }
    })
  };

  const senddata = async (e) => {
    e.preventDefault();


    const { email, password } = logdata;

    const res = await fetch(`/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email, password
      })
    });


    const data = await res.json();
    console.log(data);

    if (res.status === 400 || !data) {
      console.log("invalid details");
      toast.warn("please provide full name", {
        position: "top-center",
      })
    } else {
      console.log("data are valid");
      setAccount(data);
      toast.success("user valid access", {
        position: "top-center",
      })
      setData({ ...logdata, email: "", password: "" })
    }
  }


  return (
    <section>
      <div className="sign_container">
        <div className="sign_header">
          <img src="./blacklogoamazon.png" alt="amazonlogo" />
        </div>
        <div className="sign_form">
          <form method='POST'>
            <h1>Sign-In</h1>
            <div className="form_data">
              <label htmlFor="email">Email</label>
              <input type="text"
                onChange={adddata}
                value={logdata.email}
                name="email" id="email" />
            </div>
            <div className="form_data">
              <label htmlFor="password">Password</label>
              <input type="password"
                onChange={adddata}
                value={logdata.password}
                name="password" placeholder='At least 6 character' id="password" />
            </div>
            <button className='signin_btn' onClick={senddata}>Continue</button>
          </form>
        </div>
        <div className="create_accountinfo">
          <p>New to Amazon</p>
          <NavLink to="/register"><button>Create Your amazon account</button></NavLink>
        </div>
      </div>
      <ToastContainer />
    </section>
  )
}

export default Signin




