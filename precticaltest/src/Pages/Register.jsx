import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert'
function Register() {

  const [formvalue,setFormvalue] = useState({
    "name":"",
    "email":"",
    "password":"",
  })

  
  function changehandel(e){
    const {name,value}=e.target;
    setFormvalue({...formvalue,[name]:value})

  }
  const navigate=useNavigate();
  function submithandel(e)
  {
      e.preventDefault();
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDpPAoKzYsJqK-5Kt-QSIocDY74H1z93w4', {
      method: 'POST',
      body: JSON.stringify(formvalue),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if(data)
        {
          if (data.localId) {
            fetch(`https://loan-calculator-795ea-default-rtdb.firebaseio.com/Register/${data.localId}.json`, {
                method: "PUT",
                body: JSON.stringify(formvalue),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            })
            .then((response) => response.json())
            .then((data) => {
              if(data){
                swal({
                  title: "Success",
                  text: "Register Success",
                  icon: "success",
                });
                  navigate('/');
              }
              else{
                swal({
                  title: data.error.message,
                  text: data.error.message,
                  icon: "error",
                });
              }
            })
          } 
          else 
          {
             
          }
          setFormvalue({name:"",email:"",password:""});
          console.log(data.localId)
        }
      });
  }

  return (
    <div>
         <div className='container border p-5  rounded mt-5'>
            <h1 className="heading display-4 pb-3 text-center">Register Here</h1>
        <form >
    
    <div className="mb-3">
      <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
      <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  name='name' value={formvalue.name} onChange={changehandel}/>
      
    </div>
    <div className="mb-3">
      <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
      <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  name='email' value={formvalue.email} onChange={changehandel}/>
      <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div className="mb-3">
      <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
      <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={formvalue.password} onChange={changehandel}/>
    </div>
    <button type="submit" className="btn btn-dark" onClick={submithandel}>Submit</button>
  </form>



</div>
    </div>
  )
}

export default Register