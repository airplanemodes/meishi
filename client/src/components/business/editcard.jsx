import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import PageHeader from '../common/page-header';
import { axiosRequest, getRequest, serverAddress } from '../../services/api';

function EditCard(props) {

    let [card,setCard] = useState({});
    let { register, handleSubmit, setValue, formState: { errors } } = useForm();
    let history = useHistory();
    const { enqueueSnackbar } = useSnackbar();


    let nameRef = register("bsnName", {required: true, minLength: 2});
    let descriptionRef = register("bsnDescription", {required: true, minLength: 2});
    let addressRef = register("bsnAddress", {required: true, minLength: 2});
    let phoneRef = register("bsnPhone", {required: true, minLength: 2});
    let imageRef = register("bsnImageUrl", {required: false});


    useEffect(() => {
        doApi();
    },[]);


    const doApi = async() => {
        // GET request to the API
        let url = serverAddress+"/cards/single/"+props.computedMatch.params.id;
        let data = await getRequest(url);
        //console.log(data);
        setCard(data);

        // Using 'setValue' here instead of 'defaultValue' at the form
        setValue("bsnName", data.bsnName);
        setValue("bsnDescription", data.bsnDescription);
        setValue("bsnAddress", data.bsnAddress);
        setValue("bsnPhone", data.bsnPhone);
        setValue("bsnImageUrl", data.bsnImageUrl);
    };


    const submitForm = async(formdata) => {
        try {
            // PUT request to the API
            let url = serverAddress+"/cards/"+props.computedMatch.params.id;
            let data = await axiosRequest(url, "PUT", formdata);
            //console.log(data);
            if (data.n === 1) {
                enqueueSnackbar('Card edited successfully!', {variant: 'info'});
                history.push("/business");
            }
            
        } catch (error) {
            console.log(error);
            enqueueSnackbar('There is a problem, try again later', {variant: 'error'});
        }
    };

    

    return (
        <div className="container ubuntu pt-4 w-75">
            <PageHeader title="Editing the card"/>
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
                        <Link to="/business" className="btn mt-4 me-4">Back to list</Link>
                        <button className="btn mt-4">Update card</button>
                    </div>
            </form>
        </div>
    )
};

export default EditCard;