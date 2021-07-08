import React from 'react';
import PageHeader from './common/page-header';
import {useForm} from 'react-hook-form';
import '../css/signup.css';


function Signup(props) {

    /* React Hook Form
    register - stores input into the hook by invoking register function
    handleSubmit - validates inputs before invoking the 'onSubForm' callback
    formState: {errors} - shows errors if validation fails */

    let {register, handleSubmit, getValues, formState: {errors} } = useForm();

    // submit to the server-side
    const onSubForm = (formData) => { 
        console.log(formData);
    };

    // registers
    let emailRef = register("email", {
        required: true,
        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    });

    let passwordRef = register("password", {required: true, minLength: 6});
    let password2Ref = register("password2", {required:true, validate: (value) => value === getValues().password})
    let nameRef = register("fullname", {required: true, minLength: 2});
    let checkRef = register("business", {required: false});


    return (
        <div className="container ubuntu">
          <div className="text-center pt-4 mb-3">
              <PageHeader title="Sign-up"/>
          </div>
          <form onSubmit={handleSubmit(onSubForm)} className="col-lg-4 mx-auto border border-dark rounded shadow p-3">
            <div>
            <div>
              <label>Full name:</label>
              <input {...nameRef} type="text" className="form-control" />
              {errors.fullname && <span className="text-danger"><small>Name must be at least 2 chars</small></span>}
            </div>
              <label>Email:</label>
              <input {...emailRef} type="email" className="form-control" />
              {errors.email && <span className="text-danger"><small>Enter valid e-mail address</small></span>}
            </div>
            <div>
              <label>Password:</label>
              <input {...passwordRef} type="password" className="form-control" />
              {errors.password && <span className="text-danger"><small>Password must be at least 6 chars</small></span>}
            </div>
            <div>
              <label>Confirm password:</label>
              <input {...password2Ref} type="password" className="form-control" />
              {errors.password2 && <span className="text-danger"><small>Passwords didn't match, try again</small></span>}
            </div>
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