import {useEffect, useState} from 'react';
import {CustomerListRequest, DeleteCustomerRequest} from "../../APIRequest/CustomerAPIRequest";
import {Link} from "react-router-dom";
import ReactPaginate from "react-paginate";
import {DeleteAlert} from "../../helper/DeleteAlert";
import {AiOutlineDelete} from "react-icons/ai";
import {FaEdit} from "react-icons/fa";
import ScreenLoader from "../Loading/ScreenLoader.jsx";




const CustomerList = () => {
    let [searchKeyword, setSearchKeyword] = useState("0");
    let [perPage, setPerPage] = useState(10);

    const [dataList,setData]=useState([])
    const [Total,setTotal]=useState(null)
    const [Loading,setLoading]=useState(false)



    useEffect(() => {
        (async () => {
             setLoading(true)
             let result=await CustomerListRequest(1,perPage, searchKeyword);
             setLoading(false)
             setData(result.rows);
             setTotal(result.total)
        })();
    }, [])

    const handlePageClick =  async (event) => {
        let result=await CustomerListRequest(event.selected + 1,perPage, searchKeyword);
        setData(result.rows);
    };
    const searchData = async () => {
        let result=await CustomerListRequest(1, perPage, searchKeyword)
        setData(result.rows);
    }
    const perPageOnChange = async (e) => {
        setPerPage(parseInt(e.target.value))
        let result=await CustomerListRequest(1, e.target.value, searchKeyword)
        setData(result.rows);
    }
    const searchKeywordOnChange = async (e) => {
        setSearchKeyword(e.target.value)
        if ((e.target.value).length === 0) {
            setSearchKeyword("0")
            let result=await CustomerListRequest(1, perPage, "0")
            setData(result.rows);
        }
    }

    const TextSearch = (e) => {
        const rows = document.querySelectorAll('tbody tr')
        rows.forEach(row => {
            row.style.display = (row.innerText.includes(e.target.value)) ? '' : 'none'
        })
    }

    const deleteItem = async (id) => {
        let Result = await DeleteAlert();
        if (Result.isConfirmed) {
            let DeleteResult = await DeleteCustomerRequest(id)
            if (DeleteResult) {
                let result=await CustomerListRequest(1, perPage, searchKeyword);
                setData(result.rows);
            }
        }
    }

    if (Loading===true){
        return <ScreenLoader/>
    }else {

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
                                                <h5>Customer List</h5>
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
                                                    <button onClick={searchData}
                                                            className="btn  btn-success btn-sm mb-0"
                                                            type="button">Search
                                                    </button>
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
                                                            dataList.map((item, i) => {
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
                                                                                to={`/CustomerCreateUpdatePage?id=${item.id}`}
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
                                                    <ReactPaginate
                                                        previousLabel="<"
                                                        nextLabel=">"
                                                        pageClassName="page-item"
                                                        pageLinkClassName="page-link"
                                                        previousClassName="page-item"
                                                        previousLinkClassName="page-link"
                                                        nextClassName="page-item"
                                                        nextLinkClassName="page-link"
                                                        breakLabel="..."
                                                        breakClassName="page-item"
                                                        breakLinkClassName="page-link"
                                                        pageCount={Math.ceil(Total / perPage)}
                                                        marginPagesDisplayed={2}
                                                        pageRangeDisplayed={5}
                                                        onPageChange={handlePageClick}
                                                        containerClassName="pagination"
                                                        activeClassName="active"
                                                    />
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
    }
};

export default CustomerList;