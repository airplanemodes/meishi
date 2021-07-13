import React from 'react';
import PageHeader from './common/page-header';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { axiosRequest, serverAddress } from '../services/api';
import '../css/signup.css';


function Signup(props) {
  
    /* React Hook Form
    register - stores input into the hook by invoking register function
               names must fit the Mongoose schema keys!
    handleSubmit - validates inputs according to registers before invoking the 'onSubForm' callback
    formState: {errors} - shows errors if validation fails */

    let { register, handleSubmit, formState: {errors} } = useForm();

    let emailRef = register("email", {
        required: true,
        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    });

    let passwordRef = register("password", {required: true, minLength: 6});
    // let password2Ref = register("password2", {required:true, validate: (value) => value === getValues().password})
    let nameRef = register("name", {required: true, minLength: 2});
    let checkRef = register("business", {required: false});


    /* useHistory hook assigning to the variable */
    let history = useHistory();


    /* notistack */
    const { enqueueSnackbar } = useSnackbar();


    /* Submit with Axios request to the server-side */
    const onSubForm = async(formData) => { 
      //console.log(formData);
      try {
        let url = serverAddress+"/users/";
        let data = await axiosRequest(url, "POST", formData);

        if (data._id) {
          enqueueSnackbar('Success!', {variant: 'success'});
          history.push("/login");  // relocate the user to login page
        }
        
      } catch (error) {
        console.log(error.response.data);
      }
    };    



    return (
        <div className="container ubuntu">
          <div className="text-center pt-4 mb-3">
              <PageHeader title="Sign-up"/>
          </div>
          <form onSubmit={handleSubmit(onSubForm)} className="col-lg-4 mx-auto border border-dark rounded shadow p-3">
            <div>
            <div>
              <label>Full name:</label>
              <input {...nameRef} type="text" autoComplete="off" className="form-control" />
              {errors.name && <span className="text-danger"><small>Name must be at least 2 chars</small></span>}
            </div>
              <label>Email:</label>
              <input {...emailRef} type="email" autoComplete="off" className="form-control" />
              {errors.email && <span className="text-danger"><small>Enter valid e-mail address</small></span>}
            </div>
            <div>
              <label>Password:</label>
              <input {...passwordRef} type="password" autoComplete="off" className="form-control" />
              {errors.password && <span className="text-danger"><small>Password must be at least 6 chars</small></span>}
            </div>
            {/* <div>
              <label>Confirm password:</label>
              <input {...password2Ref} type="password" className="form-control" />
              {errors.password2 && <span className="text-danger"><small>Passwords didn't match, try again</small></span>}
            </div> */}
            <div className="mt-1">
              <label>Business account</label>
              <input {...checkRef} type="checkbox" className="form-check-input ms-2" />
            </div>
              <button className="btn text-white w-100 mt-3">Submit</button>
            </form>
        </div> 
    );
};

export default Signup;