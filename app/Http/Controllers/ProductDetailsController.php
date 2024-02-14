<?php

namespace App\Http\Controllers;

use App\Models\ProductDetails;
use App\Models\Products;
use Illuminate\Http\Request;

class ProductDetailsController extends Controller
{
    function getProductDetails($product_id)
    {
        $data['productDetails'] = ProductDetails::where('product_id', $product_id)->get();
        $data['productList'] = Products::where('id', $product_id)->get();
        return $data;
    }
}
