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
      // console.log(formData);
      try {
        let url = serverAddress+"/users/login/";

        // axios request
        let data = await axiosRequest(url, "POST", formData);

        // token is here
        // console.log(data);

        // saving token on the client-side (in the browser)
        localStorage.setItem('localToken', data.token);

        // for a user data object
        await updateUserData();

        // show success message
        enqueueSnackbar('Welcome to the system', {variant: 'success'});
        
        // redirect to userinfo
        history.push("/profile");
      }
      
      catch (error) {
        console.log(error);
        enqueueSnackbar('Access denied', {variant: 'error'}); // show error message
      }
    }


    /* React-Hook-Form settings */
    let { register, handleSubmit, formState: {errors} } = useForm();
    let emailRef = register("email", {
        required: true,
        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    });
    let passwordRef = register("password", {required: true});


    // useHistory hook assigning to the variable
    let history = useHistory();

    // notistack
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
}

export default Login;