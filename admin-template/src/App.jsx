import {BrowserRouter, Route, Routes} from "react-router-dom";
import DashboardPage from "./pages/Dashboard/DashboardPage.jsx";
import {Toaster} from "react-hot-toast";
import CustomerCreateUpdatePage from "./pages/Customer/CustomerCreateUpdatePage.jsx";
import CustomerListPage from "./pages/Customer/CustomerListPage.jsx";
import BrandListPage from "./pages/ReactQuery/BrandListPage.jsx";
import BrandCreatePage from "./pages/ReactQuery/BrandCreatePage.jsx";
import BrandUpdatePage from "./pages/ReactQuery/BrandUpdatePage.jsx";

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<DashboardPage/>}/>
                    <Route exact path="/CustomerCreateUpdatePage" element={<CustomerCreateUpdatePage />}/>
                    <Route exact path="/CustomerListPage" element={<CustomerListPage />}/>

                    <Route exact path="/BrandCreatePage" element={<BrandCreatePage />}/>
                    <Route exact path="/BrandUpdatePage" element={<BrandUpdatePage />}/>
                    <Route exact path="/BrandListPage" element={<BrandListPage />}/>

                    {/*<Route exact path="/Profile" element={<ProfilePage/>}/>} />}/>*/}
                    {/*<Route path="*" element={<Page404/>}/>*/}
                </Routes>
            </BrowserRouter>
            <Toaster
                position="top-center"
                reverseOrder={false}
                gutter={8}
                containerClassName=""
                containerStyle={{}}
                toastOptions={{
                    // Define default options
                    className: '',
                    duration: 5000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },

                    // Default options for specific types
                    success: {
                        duration: 3000,
                        theme: {
                            primary: 'green',
                            secondary: 'black',
                        },
                    },
                }}
            />

            );
        </>
    );
};
export default App;