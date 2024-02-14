import  {Suspense} from 'react';
import MasterLayout from "../../components/MasterLayout/MasterLayout";
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import BrandList from "../../components/ReactQuery/BrandList.jsx";

const BrandListPage = () => {
    return (
        <>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <BrandList/>
                </Suspense>
            </MasterLayout>
        </>
    );
};

export default BrandListPage;