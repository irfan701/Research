<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\SubCategory;
use Illuminate\Http\Request;

class CategoryController extends Controller
{

    function __construct()
    {
        $this->middleware(['auth:sanctum','verified']);
    }
}
