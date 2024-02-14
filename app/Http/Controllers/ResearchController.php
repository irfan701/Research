<?php

namespace App\Http\Controllers;

use App\Models\Research;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ResearchController extends Controller
{
    function getData(Request $request)
    {
        $pageNo = (int)$request->pageNo;
        $perPage = (int)$request->perPage;
        $skipRow = ($pageNo - 1) * $perPage;
        $searchValue = $request->searchKey;
        $searchTerm = '%' . $searchValue . '%';

        if ($searchValue !== "0") {
//        let SearchRgx = {"$regex": searchValue, "$options": "i"}
            $data['rows'] = DB::table('research')
                ->where('name', "LIKE", $searchTerm)
                ->orWhere('email', "LIKE", $searchTerm)
                ->skip($skipRow)->take($perPage)->get();
            $data['total'] = DB::table('research')->count();

        } else {
            $data['rows'] = DB::table('research')
                ->orderBy('id', 'DESC')->skip($skipRow)->take($perPage)->get();
            $data['total'] = DB::table('research')->count();
        }
        return $data;
    }

    function delete($id)
    {
        $result = Research::where('id', $id)->delete();
        if ($result === true) return 1;
        else return 0;
    }

    function create(Request $request)
    {
        $result = Research::insert([
            'name' => $request->name,
            'phone' => $request->phone,
            'address' => $request->address,
            'email' => $request->email
        ]);
        if($result === true) return 1;
        else return 0;
    }

    function read(Request $request)
    {
        $result = Research::where('id', $request->id)->first();
        return $result;
    }
    function update(Request $request)
    {
        $result = Research::where('id', $request->id)->update([
            'name' => $request->name,
            'phone' => $request->phone,
            'address' => $request->address,
            'email' => $request->email
        ]);
        if ($result === true) return 1;
        else return 0;
    }
}
