import {useEffect, useState} from 'react';
import {CreateCustomerRequest, FillCustomerFormRequest} from "../../APIRequest/CustomerAPIRequest";
import {ErrorToast, isEmail, isEmpty} from "../../helper/FormHelper";
import {useNavigate} from "react-router-dom";
import ScreenLoader from "../Loading/ScreenLoader.jsx";

const CustomerCreateUpdate = () => {

    const [FormObj, setFormObj] = useState({name: '', email: '', phone: '', address: ''})
    const [ObjectID, SetObjectID] = useState(0);
    const navigate = useNavigate();
    const [Loading,setLoading]=useState(false)

    const InputOnChange = (key, value) => {

        setFormObj(prevObj => ({
            ...prevObj,
            [key]: value
        }))
    }
    const SaveChange = async (e) => {
        e.preventDefault();
        if (isEmpty(FormObj.name)) {
            ErrorToast("Customer Name Required !")
        } else if (isEmpty(FormObj.phone)) {
            ErrorToast("Customer Phone  Number Required !")
        } else if (isEmail(FormObj.email)) {
            ErrorToast("Valid Email Address Required !")
        } else {
            if (await CreateCustomerRequest(FormObj, ObjectID)) {
               setLoading(true)
                navigate("/CategoryListPage")
                setLoading(false)
            }
        }
    }

    useEffect(() => {
        let params = new URLSearchParams(window.location.search);
        let id = params.get('id');
        if (id !== null) {
            SetObjectID(id);
            (async () => {
                let result = await FillCustomerFormRequest(id);
                console.log(result)
                FormObj.name = result.name
                FormObj.email = result.email
                FormObj.phone = result.phone
                FormObj.address = result.address
            })();

        }
    }, [])

    if (Loading===true){
        return <ScreenLoader/>
    }else {
        return (
            <>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <form onSubmit={SaveChange}>
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row">
                                            <h5>Save Customer</h5>
                                            <hr className="bg-light"/>

                                            <div className="col-4 p-2">
                                                <label className="form-label">Customer Name</label>
                                                <input onChange={(e) => InputOnChange('name', e.target.value)}
                                                       value={FormObj.name} className="form-control form-control-sm"
                                                       type="text"/>
                                            </div>
                                            <div className="col-4 p-2">
                                                <label className="form-label">Mobile No</label>
                                                <input onChange={(e) => InputOnChange('phone', e.target.value)}
                                                       value={FormObj.phone} className="form-control form-control-sm"
                                                       type="text"/>
                                            </div>
                                            <div className="col-4 p-2">
                                                <label className="form-label">Email </label>
                                                <input
                                                    onChange={(e) => InputOnChange('email', e.target.value)}
                                                    value={FormObj.email}
                                                    className="form-control form-control-sm" type="text"/>
                                            </div>
                                            <div className="col-12 p-2">
                                                <label className="form-label">Address</label>
                                                <textarea
                                                    onChange={(e) => InputOnChange('address', e.target.value)}
                                                    value={FormObj.address}
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
    }
};

export default CustomerCreateUpdate;