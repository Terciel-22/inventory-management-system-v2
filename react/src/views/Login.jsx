import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../AxiosClient';
import { useStateContext } from '../contexts/ContextProvider';

export default function Login() {

  const emailRef = useRef();
  const passwordRef = useRef();

  const {setUser,setToken} = useStateContext();

  const [errors, setErrors] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(null);
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value
    }

    axiosClient.post("/login", payload)
      .then(({data})=>{
        setUser(data.user);
        setToken(data.token);
      })
      .catch(error=>{
        const response = error.response;
        if(response && response.status === 422) {
          if(response.data.errors)
          {
            setErrors(response.data.errors);
          } else {
            setErrors({
              email: [response.data.message]
            });
          }
        }
      })
  }

  return (
    <div id="form-container">
      <h1>Login into your account</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        {errors && 
          <div className="error-message">
            {Object.keys(errors).map(key=>{
              return <p key={key}>{errors[key][0]}</p>
            })}
          </div>
        }
        <input ref={emailRef} type="email" placeholder="Email Address"/>
        <input ref={passwordRef} type="password" placeholder="Password"/>
        <Link to="/resetpassword">Forgot password?</Link>
        <button type="submit">Login</button>
        <p>Not a member? <Link to="/signup">Sign up</Link></p>
      </form>
    </div>
  ) 
}
