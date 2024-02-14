import {Fragment, Suspense} from 'react';
import MasterLayout from "../../components/MasterLayout/MasterLayout";
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import BrandCreate from "../../components/ReactQuery/BrandCreate.jsx";

const BrandCreateUpdatePage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <BrandCreate/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default BrandCreateUpdatePage;