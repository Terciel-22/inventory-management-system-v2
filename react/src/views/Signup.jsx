import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../AxiosClient';
import { useStateContext } from '../contexts/ContextProvider';

export default function Signup() {

  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const cpasswordRef = useRef();
  
  const {setUser,setToken} = useStateContext();

  const [errors, setErrors] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: cpasswordRef.current.value
    }

    axiosClient.post("/signup", payload)
      .then(({data})=>{
        setUser(data.user);
        setToken(data.token);
      })
      .catch(error=>{
        const response = error.response;
        if(response && response.status === 422) {
          setErrors(response.data.errors);
        }
      })
  }

  return (
    <div id="form-container">
      <h1>Register for free</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        {errors && 
          <div className="error-message">
            {Object.keys(errors).map(key=>{
              return <p key={key}>{errors[key][0]}</p>
            })}
          </div>
        }
        <input ref={usernameRef} type="text" placeholder="Username"/>
        <input ref={emailRef} type="email" placeholder="Email Address"/>
        <input ref={passwordRef} type="password" placeholder="Password"/>
        <input ref={cpasswordRef} type="password" placeholder="Password Confirmation"/>
        <button type="submit">Sign up</button>
        <p>Already registered? <Link to="/login">Sign in</Link></p>
      </form>
    </div>
  )
}
