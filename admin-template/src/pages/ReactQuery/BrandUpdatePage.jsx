import  {Fragment, Suspense} from 'react';
import MasterLayout from "../../components/MasterLayout/MasterLayout";
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import BrandUpdate from "../../components/ReactQuery/BrandUpdate.jsx";

const BrandCreateUpdatePage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                <BrandUpdate/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default BrandCreateUpdatePage;