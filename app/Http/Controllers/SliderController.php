<?php

namespace App\Http\Controllers;

use App\Models\Slider;
use Illuminate\Http\Request;

class SliderController extends Controller
{
    function getSliderInfo()
    {
        $result=Slider::get();
        return $result;
    }
}
