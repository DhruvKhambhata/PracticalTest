import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import swal from 'sweetalert';

function Login() {

  const navigate=useNavigate();

  useEffect(() =>{
    if(localStorage.getItem('auth_token'))
    {
      navigate('/');
    }	
  })

  const [formvalue,setFormvalue]=useState({
    email:"",
    password:""
  })

  function changehandel(e)
  {
      const {name,value}=e.target;
      setFormvalue({...formvalue,[name]:value});
      
  }

  function submithandel(e)
  {
      e.preventDefault()
      fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDpPAoKzYsJqK-5Kt-QSIocDY74H1z93w4`, {
      method: 'POST',
      body: JSON.stringify(formvalue),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((data) =>{
        if(data.localId)
        {
          localStorage.setItem('auth_token',data.localId)
          localStorage.setItem('auth_name',data.email)
          

          swal({
            title: "Success",
            text: `Welcome ${data.email}`,
            icon: "success",
          });
          navigate('/calc');
          
        }
        else
        {
          swal({
            title: data.error.message,
            text: data.error.message,
            icon: "error",
          });
        }
      });
  }

  return (
   <div className='container border p-5 rounded mt-5'>
    <h1 className="heading display-5 pb-3">Login Here</h1>
  <form>
    
    <div className="mb-3">
      <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
      <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={formvalue.email} onChange={changehandel}/>
      <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div className="mb-3">
      <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
      <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={formvalue.password} onChange={changehandel}/>
    </div>
    
    <button type="submit" className="btn btn-dark float-left col-md-2" onClick={submithandel}>Submit</button>
    <Link to="register"><button type="submit" className="btn btn-dark ml-3 col-md-2">Register</button></Link>
  </form>



</div>
  )
}

export default Login