<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    function getNotificationHistory()
    {
        $result=Notification::get();
        return $result;
    }
}
