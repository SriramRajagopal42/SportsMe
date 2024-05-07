import {useState} from 'react';


export default function LoginPage() {
    const [stuff, setStuff] = useState(null);

    let email;
    let password;

function authenticate() {
    setStuff(email + " " + password);
}

return (
    <>
    <label>
      Email:  <input name = "email" onChange = {(e) => { email = e.target.value;}}/>
    </label>
    <label>
      Password: <input name = "password" onChange = {(e) => {password = e.target.value; }}  />
    </label>
    <button onClick = {authenticate}>
        Log in
    </button>
    <label>
        {stuff}
    </label>
    


    </>);
  }
  
  
