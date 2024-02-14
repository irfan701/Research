import {useState} from "react";
import ScreenLoader from "../Loading/ScreenLoader.jsx";
import {keepPreviousData, useQuery, useQueryClient} from "@tanstack/react-query";
import {Link} from "react-router-dom";
import {FaEdit} from "react-icons/fa";
import {DeleteRequest, ListRequest} from "../../APIRequest/BrandAPIRequest.js";
import {DeleteAlert} from "../../helper/DeleteAlert.js";
import {UseMutation} from "../../helper/ReactQueryHook.js";
import {ErrorToast, SuccessToast} from "../../helper/FormHelper.js";
import {AiOutlineDelete} from "react-icons/ai";
import {PaginationControl} from "react-bootstrap-pagination-control";
const BrandList = () => {

    let [pageNo,setPageNo]=useState(1); //skip
    let [perPage, setPerPage] = useState(10); //limit
    let [searchKeyword, setSearchKeyword] = useState(0);

    const queryClient = useQueryClient()
    const {isFetching,isLoading,isError, error, data: dataList} =
        useQuery({
            queryKey: ["dataList",pageNo,perPage,searchKeyword],
            queryFn: async ()=> ListRequest(pageNo,perPage,searchKeyword),
            placeholderData: keepPreviousData,
            staleTime: 2000,
        })
    const handleMove=(id)=>{
       if (pageNo!==1){
           setPageNo(1)
       }
        setPageNo((prevPage) => prevPage + (id-1))
    }
    const perPageOnChange = async (e) => {
        setPageNo(1)
        setPerPage(parseInt(e.target.value))
    }
    const searchKeywordOnChange = async (e) => {
        setSearchKeyword(e.target.value)
        setPageNo(1)
        if ((e.target.value).length === 0) {
            setSearchKeyword(0)
            setPageNo(1)
        }
    }
    const TextSearch = (e) => {
        const rows = document.querySelectorAll('tbody tr')
        rows.forEach(row => {
            row.style.display = (row.innerText.includes(e.target.value)) ? '' : 'none'
        })
    }

    const {mutate} = UseMutation(
        (id) => DeleteRequest(id),
        async () => {
            return await queryClient.invalidateQueries({queryKey:["dataList"]})
        },
        (e) => ErrorToast(e.message)
    )
    const deleteItem = async (id) => {
        let Result = await DeleteAlert();
        if (Result.isConfirmed) {
            mutate(id)
            SuccessToast('Success Request')
        }
    }

    if (isLoading) {
        return <ScreenLoader/>
    }
    if (isError) {
        return <h3>Error:{error.message}</h3>
    }

    return (
        <>
            <div className="container-fluid my-5">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-4">
                                            <h5>Customer List - {dataList.total}</h5>
                                        </div>

                                        <div className="col-2">
                                            <input onKeyUp={TextSearch} placeholder="Text Filter"
                                                   className="form-control form-control-sm"/>
                                        </div>

                                        <div className="col-2">
                                            <select onChange={perPageOnChange}
                                                    className="form-control mx-2 form-select-sm form-select form-control-sm">
                                                <option value="20">20 Per Page</option>
                                                <option value="30">30 Per Page</option>
                                                <option value="50">50 Per Page</option>
                                                <option value="100">100 Per Page</option>
                                                <option value="200">200 Per Page</option>
                                            </select>
                                        </div>
                                        <div className="col-4">
                                            <div className="input-group mb-3">
                                                <input onChange={searchKeywordOnChange} type="text"
                                                       className="form-control form-control-sm"
                                                       placeholder="Search.."
                                                       aria-label="Recipient's username"
                                                       aria-describedby="button-addon2"/>
                                                {/*<button onClick={searchData}*/}
                                                {/*        className="btn  btn-success btn-sm mb-0"*/}
                                                {/*        type="button">Search*/}
                                                {/*</button>*/}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="table-responsive table-section">
                                                <table className="table ">
                                                    <thead className="sticky-top bg-white">
                                                    <tr>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">No</td>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Name</td>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Email</td>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Phone</td>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Address</td>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Photo</td>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Action</td>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {
                                                        dataList.rows.map((item, i) => {
                                                            return (
                                                                <tr key={i.toString()}>
                                                                    <td><p
                                                                        className="text-xs text-start">{i + 1}</p>
                                                                    </td>
                                                                    <td><p
                                                                        className="text-xs text-start">{item.name}</p>
                                                                    </td>
                                                                    <td><p
                                                                        className="text-xs text-start">{item.email}</p>
                                                                    </td>
                                                                    <td><p
                                                                        className="text-xs text-start">{item.phone}</p>
                                                                    </td>
                                                                    <td><p
                                                                        className="text-xs text-start">{item.address}</p>
                                                                    </td>
                                                                    <td><p className="text-xs text-start">
                                                                        <img src={item.photo} alt=""
                                                                             className="w-50"/>
                                                                    </p></td>

                                                                    <td>
                                                                        <Link
                                                                            to={`/BrandUpdatePage?id=${item.id}`}
                                                                            className="btn text-info btn-outline-light p-2 mb-0 btn-sm">
                                                                            <FaEdit size={15}/>
                                                                        </Link>

                                                                        <button onClick={() => deleteItem(item.id)}
                                                                                className="btn btn-outline-light text-danger p-2 mb-0 btn-sm ms-2">
                                                                            <AiOutlineDelete size={15}/>
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })

                                                    }

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="col-12 mt-5">
                                            <nav aria-label="Page navigation example">
                                                <span>Current Page: {pageNo}</span>
                                                {isFetching ? <span> Loading...</span> : null}{' '}
                                                <PaginationControl
                                                    last={true}
                                                    page={pageNo}
                                                    between={5}
                                                    total={Math.ceil(dataList.total)}
                                                    limit={perPage}
                                                    changePage={(id)=>handleMove(id)}
                                                    ellipsis={1}
                                                    next={true}
                                                />

                                                {/*<button onClick={()=>setPageNo((page)=>page-1)} disabled={pageNo===1}> Previous Page</button>*/}
                                                {/*<button onClick={()=>setPageNo((page)=>page+1)}>  Next Page</button>*/}

                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );

};

export default BrandList;