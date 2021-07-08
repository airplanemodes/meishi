import React from 'react';
import PageHeader from './common/page-header';
import {useForm} from 'react-hook-form';
import '../css/login.css';



function Login(props) {

    let {register, handleSubmit, formState: {errors} } = useForm();

    const onSubForm = (formData) => { 
        console.log(formData);
    };

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
              <input {...passwordRef} type="text" className="form-control" />
              {errors.password && <span className="text-danger"><small>Password must be at least 6 chars</small></span>}
            </div>
              <button className="btn text-white w-100 mt-3">Enter the system</button>
            </form>
        </div> 
    );
};

export default Login;