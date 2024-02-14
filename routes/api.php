<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VisitorController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\SiteInfoController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\SliderController;
use App\Http\Controllers\ProductDetailsController;
use App\Http\Controllers\NotificationController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/send/VisitorDetails',[VisitorController::class,'sendVisitorDetails']);
Route::post('/insert/ContactDetails',[ContactController::class,'insertContactDetails']);
Route::get('/get/siteInfo',[SiteInfoController::class,'getSiteInfo']);
Route::get('/get/CategoryDetails',[CategoryController::class,'getCategoryDetails']);
Route::get('/get/productListByRemark/{remark}',[ProductsController::class,'getProductListByRemark']);
Route::get('/get/sliderInfo',[SliderController::class,'getSliderInfo']);
Route::get('/get/productDetails/{product_id}',[ProductDetailsController::class,'getProductDetails']);
Route::get('/get/notificationHistory',[NotificationController::class,'getNotificationHistory']);
Route::get('/get/productBySearch/{key}',[ProductsController::class,'getProductBySearch']);
Route::get('/get/similarProducts/{subcategory}',[ProductsController::class,'similarProducts']);


Route::get('/products',function (){
  return \Illuminate\Support\Facades\DB::table('product_list')->get();
});

Route::get('/research/get/{pageNo}/{perPage}/{searchKey}',[\App\Http\Controllers\ResearchController::class,'getData']);
Route::get('/research/delete/{id}',[\App\Http\Controllers\ResearchController::class,'delete']);
Route::post('/research/create',[\App\Http\Controllers\ResearchController::class,'create']);
Route::get('/research/read/{id}',[\App\Http\Controllers\ResearchController::class,'read']);
Route::post('/research/update/{id}',[\App\Http\Controllers\ResearchController::class,'update']);

