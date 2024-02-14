import {useState} from "react";
import {ErrorToast, isEmail, isEmpty, SuccessToast} from "../../helper/FormHelper.js";
import {useNavigate} from "react-router-dom";
import {UseMutation} from "../../helper/ReactQueryHook.js";
import {CreateRequest} from "../../APIRequest/BrandAPIRequest.js";
import {useQueryClient} from "@tanstack/react-query";
const BrandCreateUpdate = () => {
    const [FormObj, setFormObj] = useState({name: '', email: '', phone: '', address: ''})
    const navigate = useNavigate();
    const InputOnChange = (key, value) => {
        setFormObj(prevObj => ({
            ...prevObj,
            [key]: value
        }))
    }
    const queryClient = useQueryClient()
    const {mutate} = UseMutation(
        (formData) => CreateRequest(formData),
        async() => {
            return await queryClient.invalidateQueries({queryKey:["dataList"]})
        },
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
            SuccessToast('Success Request')
        }
    }
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
                                                className="form-control form-control-sm"
                                                type="text"/>
                                        </div>
                                        <div className="col-4 p-2">
                                            <label className="form-label">Mobile No</label>
                                            <input
                                                onChange={(e) => InputOnChange('phone', e.target.value)}
                                                className="form-control form-control-sm"
                                                type="text"/>
                                        </div>
                                        <div className="col-4 p-2">
                                            <label className="form-label">Email </label>
                                            <input
                                                onChange={(e) => InputOnChange('email', e.target.value)}
                                                className="form-control form-control-sm" type="text"/>
                                        </div>
                                        <div className="col-12 p-2">
                                            <label className="form-label">Address</label>
                                            <textarea
                                                onChange={(e) => InputOnChange('address', e.target.value)}
                                                className="form-control form-control-sm" rows={4}/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-4 p-2">
                                            <button type="submit" className="btn btn-sm my-3 btn-success">Save
                                                Change
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
};
export default BrandCreateUpdate;