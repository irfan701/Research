import axios from "axios";
//import {getToken} from "../helper/SessionHelper";
//const AxiosHeader={headers:{"token":getToken()}}
// const result = await axios.get(URL,AxiosHeader)
export const ListRequest = async (pageNo,perPage,searchKeyword) => {
    let URL = `http://127.0.0.1:8000/api/research/get/${pageNo}/${perPage}/${searchKeyword}`;
    const result = await axios.get(URL)
    return result.data
}
export const CreateRequest = async (PostBody) => {
    let URL = `http://127.0.0.1:8000/api/research/create`
    return await axios.post(URL, PostBody)
}
export const FillFormRequest = async (id) => {
    let URL = `http://127.0.0.1:8000/api/research/read/${id}`
    const result = await axios.get(URL)
    return result.data
}
export const UpdateRequest = async (PostBody, ObjectID) => {
    let URL = `http://127.0.0.1:8000/api/research/update/${ObjectID}`
    return await axios.post(URL, PostBody)
}
export const DeleteRequest = async ( ObjectID) => {
    let URL = `http://127.0.0.1:8000/api/research/delete/${ObjectID}`
    return await axios.get(URL)
}
