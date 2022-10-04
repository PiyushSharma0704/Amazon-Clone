import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Login.css";   
import { auth } from "./firebase";


function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = e => {
      e.preventDefault();

      auth
       .signInWithEmailAndPassword( email, password)
       .then(auth => {
          navigate('/')
      })
      .catch(error => alert(error.message))

    }

     
    const register = e => {
      e.preventDefault();

      auth
      .createUserWithEmailAndPassword( email, password)
      .then((auth) => {
        //it created a user with new email and password
        if (auth) {
          navigate('/')
        } 
      })
      .catch(error => alert(error.message))
   //firebase register

    }

  return (
    <div className='login'>
        <Link to="/">
        <img className='login__logo'
        src="https://thumbs.dreamstime.com/b/simple-vector-filled-flat-amazon-icon-logo-solid-black-pictogram-isolated-white-background-amazon-logo-159029074.jpg" />
        </Link>

        <div className='login__container'>
            <h1>Sign-in</h1>
            <form>
                <h5>E-mail</h5>
                <input type='text' value={email} placeholder='Enter your email' onChange={e => setEmail(e.target.value)} />

                <h5>Password</h5>
                <input type='password' value={password} placeholder='Enter your password' onChange={e => setPassword(e.target.value)} />
                
                <button type='submit' onClick={signIn} className='login__signInButton'>Sign in</button>
                <p>By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.
                </p>


            </form>

       </div>
       <p className='login__newUser'>New to Amazon?</p>
       <button onClick={register} className='login__registerButton'>Create Your Amazon Account</button>


    </div>
  )
}

export default Login 