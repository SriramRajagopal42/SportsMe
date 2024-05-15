import React from 'react'
import {useState} from 'react'
import './LoginSignup.css'
import password_icon from '../Assets/password.png'
import user_icon from '../Assets/person.png'
import email_icon from '../Assets/email.png'
import axios from 'axios';

export const LoginSignup = () => {

  const[action, setAction] = useState("Login");
  const[password, setPassword] = useState("");
  const[email, setEmail] = useState("");
  const[status, setStatus] = useState("");
  async function validateUser() {
    
    await axios.post('http://localhost:5000/login', {
      'email': email,
      'password': password
    },
  {
    headers: {
      'Content-Type': 'application/json'
    }
  }
)
    .then(response => {
      if(response['data']['success']) {
        setStatus("");
        //navigate to main page
      }
      else {
        setStatus(response['data']['message']);
      }
    })
    .catch(e => {
      console.log(e);
    });
  }


  async function addUser() {
    
    await axios.post('http://localhost:5000/register', {
      'email': email,
      'password': password
    },
  {
    headers: {
      'Content-Type': 'application/json'
    }
  }
)
    .then(response => {
      if(response['data']['success']) {
        setStatus("");
        //navigate to main page
      }
      else {
        setStatus(response['data']['message']);
      }
    })
    .catch(e => {
      console.log(e);
    });
  }



  return (
    <div className='container'>
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
        <div className = "status">{status}</div>
      </div>
      <div className="inputs">
        {action === "Login"?<div></div>:<div className="input">
          <img src={user_icon} alt="" />
          <input type="text" placeholder='Username' />
        </div>}
        <div className="input">
          <img src={email_icon} alt="" />
          <input type="email" placeholder='Email' onChange = {(e) => { setEmail(e.target.value)}} />
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input type="password" placeholder='Password' onChange = {(e) => { setPassword(e.target.value)}} />
        </div>
      </div>
      {action ==="Sign Up"?<div></div>:<div className='forgot-password'>Forgot Password? <span>Click Here</span></div>}
      <div className='submit-container'>
        <div className={action=== "Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign Up"); addUser();}}>Sign Up</div>
        <div className={action==="Sign Up"?"submit gray":"submit"} onClick={()=>{setAction("Login"); validateUser();}}>Login</div>
      </div>
    </div>
  )
}


export default LoginSignup