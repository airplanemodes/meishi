import React from 'react';
import PageHeader from './common/page-header';
import { useForm } from 'react-hook-form';
import { requestMethod, serverAddress } from '../services/api';
import '../css/login.css';



function Login(props) {

    /* Submit with Axios request to the server-side */
    const onSubForm = async(formData) => { 
      //console.log(formData);
      try {
        let url = serverAddress+"/users/login/";
        let data = await requestMethod(url, "POST", formData);
        console.log(data); // token is here
        localStorage.setItem('tok', data.token); // saving token on the client-side (in the browser)
        
      } catch (error) {
        console.log(error);
      }
    };


  
    /* React-Hook-Form settings */
    let {register, handleSubmit, formState: {errors} } = useForm();
    
    let emailRef = register("email", {
        required: true,
        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    });

    let passwordRef = register("password", {required: true, minLength: 6});



    return (
        <div className="container ubuntu">
          <div className="text-center pt-4 mb-3">
              <PageHeader title="Login"/>
          </div>
          <form onSubmit={handleSubmit(onSubForm)} className="col-lg-4 mx-auto border border-dark rounded shadow p-3">
            <div>
              <label>Email:</label>
              <input {...emailRef} type="text" className="form-control" />
              {errors.email && <span className="text-danger"><small>Enter valid e-mail address</small></span>}
            </div>
            <div>
              <label>Password:</label>
              <input {...passwordRef} type="password" className="form-control" />
              {errors.password && <span className="text-danger"><small>Password must be at least 6 chars</small></span>}
            </div>
              <button className="btn text-white w-100 mt-3">Enter the system</button>
            </form>
        </div> 
    );
};

export default Login;