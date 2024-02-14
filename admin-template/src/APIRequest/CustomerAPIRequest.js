import axios from "axios";
import {ErrorToast, SuccessToast} from "../helper/FormHelper";
import {BaseURL} from "../helper/config";


//import {getToken} from "../helper/SessionHelper";
//const AxiosHeader={headers:{"token":getToken()}}
// const result = await axios.get(URL,AxiosHeader)
export async function CustomerListRequest(pageNo,perPage,searchKeyword) {
    try {
        let URL = `http://127.0.0.1:8000/api/research/get/${pageNo}/${perPage}/${searchKeyword}`;
        const result = await axios.get(URL)
        if (result.status === 200) {
            if (result.data) {
               return result.data
            } else {
                ErrorToast("No Data Found")
            }
        } else {
            ErrorToast("Something Went Wrong")
        }
    }
    catch (e) {
        ErrorToast(e.message)
        // store.dispatch(HideLoader())
    }
}


export async function CreateCustomerRequest(PostBody,ObjectID) {
    try {
        // store.dispatch(ShowLoader())

        let URL = `http://127.0.0.1:8000/api/research/create`
      //  let URL = BaseURL+"/CreateCustomers"
        if(ObjectID!==0){
             URL = `http://127.0.0.1:8000/api/research/update/${ObjectID}`
        }
        const result = await axios.post(URL,PostBody)
        // store.dispatch(HideLoader())
        if (result.status === 200 && result.data.status === "success") {
            SuccessToast("Request Successful");
            // store.dispatch(ResetFormValue())
            return  true;
        }
        // else if(result.status === 200 && result.data.status === "fail") {
        //     if(result.data['data']['keyPattern']['Phone']===1){
        //         ErrorToast("Mobile Number Already Exist")
        //         return false;
        //     }
        // }
        else {
            ErrorToast("Request Fail ! Try Again")
            return false;
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        // store.dispatch(HideLoader())
        return  false
    }
}


export async function FillCustomerFormRequest(ObjectID) {
    try {
        // store.dispatch(ShowLoader())
        let URL = `http://127.0.0.1:8000/api/research/read/${ObjectID}`
        const result = await axios.get(URL)
        // store.dispatch(HideLoader())
        if (result.status === 200) {
            return result.data
        } else {
            debugger;
            ErrorToast("Request Fail ! Try Again")
            return false;
        }
    }
    catch (e) {
        debugger;
        ErrorToast("Something Went Wrong")
        //store.dispatch(HideLoader())
        return  false
    }
}


export async function DeleteCustomerRequest(id) {
    try {
       // store.dispatch(ShowLoader())
      //  let URL = BaseURL+"/DeleteCustomer/"+ObjectID;
        let URL = `http://127.0.0.1:8000/api/research/delete/${id}`;
        const result = await axios.get(URL)
       // store.dispatch(HideLoader())
       //  if (result.status === 200 && result.data['status'] === "associate") {
       //      ErrorToast(result.data['data'])
       //      return  false;
       //  }
        if (result.status === 200 && result.data['status'] === "success") {
            SuccessToast("Request Successful");
            return  true
        }
        else {
            ErrorToast("Request Fail ! Try Again")
            return false;
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
     //   store.dispatch(HideLoader())
        return  false
    }
}


