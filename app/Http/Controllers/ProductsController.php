<?php

namespace App\Http\Controllers;

use App\Models\Products;
use Illuminate\Http\Request;

class ProductsController extends Controller
{
    function getProductListByRemark($remark)
    {
        $productList = Products::where('remark', $remark)->get();
        return $productList;
    }

    function getProductBySearch(Request $request)
    {
        $key = $request->key;
        $productList = Products::where('title', 'LIKE', "%{$key}%")->get();
        return $productList;
    }

    function similarProducts(Request $request)
    {
        $subcategory = $request->subcategory;
        $result=Products::where('sub_cat_id', $subcategory)
            ->orderBy('id', 'DESC')
            ->limit(10)
            ->get();
        return $result;
    }
}
