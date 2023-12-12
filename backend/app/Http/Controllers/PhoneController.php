<?php

namespace App\Http\Controllers;

use App\Models\Phone;
use Exception;
use Illuminate\Http\Request;

class PhoneController extends Controller
{
    private readonly Phone $phone;

    public function __construct()
    {
        $this->phone = new Phone();
    }

    public function index()
    {
        try {
            //code...
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Internal Server Error',
                'details' => $e
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            //code...
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Internal Server Error',
                'details' => $e
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Phone $phone)
    {
        try {
            //code...
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Internal Server Error',
                'details' => $e
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Phone $phone)
    {
        try {
            //code...
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Internal Server Error',
                'details' => $e
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Phone $phone)
    {
        try {
            //code...
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Internal Server Error',
                'details' => $e
            ], 500);
        }
    }
}
