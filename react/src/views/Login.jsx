import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {

  const emailRef = useRef();
  const passwordRef = useRef();

  const [errors, setErrors] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const payload = {
      username: emailRef.current.value,
      password_confirmation: passwordRef.current.value
    }

    console.log(payload);
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
