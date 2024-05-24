import React from 'react'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import './LoginSignup.css'
import password_icon from '../Assets/password.png'
import user_icon from '../Assets/person.png'
import email_icon from '../Assets/email.png'
import axios from 'axios';

export const LoginSignup = () => {

  const[action, setAction] = useState("Login");
  const[password, setPassword] = useState("");
  const[email, setEmail] = useState("");
  const[user, setUser] = useState("");
  const[status, setStatus] = useState("");
  const navigate = useNavigate();
  
  async function validateUser() {
      if (action !== "Login") {
        setEmail("");
        setPassword("");
        return ;
      }
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
          navigate('/home');
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
    if (action !== "Sign Up") {
      setEmail("");
      setPassword("");
      return ;
    }
    
    await axios.post('http://localhost:5000/register', {
      'email': email,
      'password': password,
      'user' : user
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
        navigate('/home');
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
            <input type="text" placeholder='Username' onChange = {(e) => { setUser(e.target.value)}} />
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
          <div className={action=== "Login"?"submit gray":"submit"} onClick={()=>{addUser(); setAction("Sign Up"); }}>Sign Up</div>
          <div className={action==="Sign Up"?"submit gray":"submit"} onClick={()=>{ validateUser(); setAction("Login");}}>Login</div>
        </div>
      </div>
    
  )
}


export default LoginSignup