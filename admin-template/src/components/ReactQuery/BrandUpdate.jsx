import ScreenLoader from "../Loading/ScreenLoader.jsx";
import {useEffect, useState} from "react";
import {ErrorToast, isEmail, isEmpty, SuccessToast} from "../../helper/FormHelper.js";
import {UseMutation, UseQuery} from "../../helper/ReactQueryHook.js";
import {FillFormRequest, UpdateRequest} from "../../APIRequest/BrandAPIRequest.js";
import {useNavigate} from "react-router-dom";
import {useQueryClient} from "@tanstack/react-query";

export default function BrandUpdate() {
    const [FormObj, setFormObj] = useState({name: '', email: '', phone: '', address: ''})
    const navigate = useNavigate()
    const InputOnChange = (key, value) => {
        setFormObj(prevObj => ({
            ...prevObj,
            [key]: value
        }))
    }

    let params = new URLSearchParams(window.location.search);
    let id = params.get('id');

    const {isLoading, error, data} = UseQuery(['person', id], FillFormRequest(id))
    useEffect(() => {
        if (data) {
            setFormObj(prevObj => ({
                ...prevObj,
                name: data.name,
                email: data.email,
                phone: data.phone,
                address: data.address
            }))
        }
    }, [data]);

    const queryClient = useQueryClient()

    const {mutate} = UseMutation(
        (formData) => UpdateRequest(formData, id),
        async (data) =>
            (await Promise.all([
                queryClient.setQueryData(['person', id], data),
                queryClient.invalidateQueries({queryKey: ["dataList"]}),
                queryClient.invalidateQueries({queryKey: ["person"]}),
            ])),
        (e) => ErrorToast(e.message)
    )
    const onSubmit = async (event) => {
        event.preventDefault()
        if (isEmpty(FormObj.name)) {
            ErrorToast("Customer Name Required !")
        } else if (isEmpty(FormObj.phone)) {
            ErrorToast("Customer Phone  Number Required !")
        } else if (isEmail(FormObj.email)) {
            ErrorToast("Valid Email Address Required !")
        } else {
            await mutate(FormObj)
            navigate("/BrandListPage")
            SuccessToast("Update Request");
        }
    }

    if (isLoading) return <ScreenLoader/>
    if (error) return <h3>Error:{error.message}</h3>
    if (data) {
        return (
            <>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <form onSubmit={onSubmit}>
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row">
                                            <h5>Save Customer</h5>
                                            <hr className="bg-light"/>

                                            <div className="col-4 p-2">
                                                <label className="form-label">Customer Name</label>
                                                <input
                                                    onChange={(e) => InputOnChange('name', e.target.value)}
                                                    defaultValue={data.name}
                                                    className="form-control form-control-sm"
                                                    type="text"/>
                                            </div>
                                            <div className="col-4 p-2">
                                                <label className="form-label">Mobile No</label>
                                                <input
                                                    onChange={(e) => InputOnChange('phone', e.target.value)}
                                                    defaultValue={data.phone}
                                                    className="form-control form-control-sm"
                                                    type="text"/>
                                            </div>
                                            <div className="col-4 p-2">
                                                <label className="form-label">Email </label>
                                                <input
                                                    onChange={(e) => InputOnChange('email', e.target.value)}
                                                    defaultValue={data.email}
                                                    className="form-control form-control-sm" type="text"/>
                                            </div>
                                            <div className="col-12 p-2">
                                                <label className="form-label">Address</label>
                                                <textarea
                                                    onChange={(e) => InputOnChange('address', e.target.value)}
                                                    defaultValue={data.address}
                                                    className="form-control form-control-sm" rows={4}/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-4 p-2">
                                                <button type="submit" className="btn btn-sm my-3 btn-success">Update
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

