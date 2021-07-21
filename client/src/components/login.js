import React from 'react';
import PageHeader from './common/page-header';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { axiosRequest, serverAddress } from '../services/api';
import { updateUserData } from '../services/userdata';



function Login(props) {

    /* Submit with Axios request to the server-side */
    const onSubForm = async(formData) => { 
      //console.log(formData);
      try {
        let url = serverAddress+"/users/login/";
        let data = await axiosRequest(url, "POST", formData); // Axios request
        //console.log(data); // token is here
        localStorage.setItem('localToken', data.token); // saving token on the client-side (in the browser)
        await updateUserData(); // for a user data object
        enqueueSnackbar('Welcome to the system', {variant: 'success'}); // show success message
        history.push("/userinfo"); // redirect to userinfo

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

    let passwordRef = register("password", {required: true});



    /* useHistory hook assigning to the variable */
    let history = useHistory();


    /* notistack */
    const { enqueueSnackbar } = useSnackbar();



    return (
        <div className="container ubuntu">
          <div className="text-center pt-4 mb-3">
              <PageHeader title="Login"/>
          </div>
          <form onSubmit={handleSubmit(onSubForm)} className="col-lg-4 mx-auto border border-dark rounded shadow p-3">
            <div>
              <label>Email:</label>
              <input {...emailRef} type="text" autoComplete="off" className="form-control" />
              {errors.email && <span className="text-danger"><small>Enter valid e-mail address</small></span>}
            </div>
            <div>
              <label>Password:</label>
              <input {...passwordRef} type="password" autoComplete="off" className="form-control" />
              {errors.password && <span className="text-danger"><small>Password is required</small></span>}
            </div>
              <button className="btn text-white w-100 mt-3">Enter the system</button>
            </form>
        </div> 
    );
};

export default Login;