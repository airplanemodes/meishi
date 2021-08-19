import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { useSnackbar } from 'notistack';
import PageHeader from '../common/page-header';
import { axiosRequest, serverAddress } from '../../services/api';

function AddCard(props) {

    let { register, handleSubmit, formState: { errors } } = useForm();
    let history = useHistory();
    const { enqueueSnackbar } = useSnackbar();


    let nameRef = register("bsnName", {required: true, minLength: 2});
    let descriptionRef = register("bsnDescription", {required: true, minLength: 2});
    let addressRef = register("bsnAddress", {required: true, minLength: 2});
    let phoneRef = register("bsnPhone", {required: true, minLength: 2});
    let imageRef = register("bsnImageUrl", {required: false});



    const submitForm = async(formdata) => {
        //console.log(formdata);
        try {
            // POST request to the Node.js server that creates new card
            let url = serverAddress+"/cards/";
            let data = await axiosRequest(url, "POST", formdata);
            //console.log(data);
            if (data._id) {
                enqueueSnackbar('Card added successfully!', {variant: 'success'});
                history.push("/profile");
            }
            
        } catch (error) {
            console.log(error);
            enqueueSnackbar('There is a problem, try again later', {variant: 'error'});
        }
    };

    

    return (
        <div className="container ubuntu pt-4">
            <PageHeader title="Adding new card"/>
            <form onSubmit={handleSubmit(submitForm)} className="row">
                <div className="col-lg-6">
                    <label>Name:</label>
                    <input {...nameRef} type="text" autoComplete="off" className="form-control"/>
                    {errors.bsnName && <span className="text-danger"><small>Name is incorrect</small></span>}
                </div>
                <div className="col-lg-6">
                    <label>Address:</label>
                    <input {...addressRef} type="text" autoComplete="off" className="form-control"/>
                    {errors.bsnAddress && <span className="text-danger"><small>Address is incorrect</small></span>}
                </div>
                <div className="col-lg-6">
                    <label>Phone:</label>
                    <input {...phoneRef} type="text" autoComplete="off" className="form-control"/>
                    {errors.bsnPhone && <span className="text-danger"><small>Phone is incorrect</small></span>}
                </div>
                <div className="col-lg-6">
                    <label>Image:</label>
                    <input {...imageRef} type="text" autoComplete="off" className="form-control"/>
                    {errors.bsnImageUrl && <span className="text-danger"><small>Image URL is incorrect</small></span>}
                </div>
                <div className="col-lg-12">
                    <label>Description:</label>
                    <textarea {...descriptionRef} type="text" autoComplete="off" className="form-control" rows="4"/>
                    {errors.bsnDescription && <span className="text-danger"><small>Description is incorrect</small></span>}
                </div>
                    <div className="col-12 text-center">
                        <button className="btn mt-4">Submit</button>
                    </div>
            </form>
        </div>
    )
};

export default AddCard;