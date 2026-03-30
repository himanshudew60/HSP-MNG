<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Patient
;
use Illuminate\Validation\ValidationException;

class PatientController extends Controller
{
    /**
     * Display a listing of patients.
     */
    public function index(){
        $doctors = User::where('is_deleted', operator: 0)
                       ->where('role', operator: 2)
                       ->get();

        return response()->json(data: [
            'status'  => true,
            'message' => 'Doctors fetched successfully',
            'total'   => $doctors->count(),
            'data'    => $doctors
        ], status: 200);
    }
    public function store(Request $request){}
   public function getPatientDetail(string $id)
{
    $patientDetail = Patient::where('user_id', $id)
        ->where(column: 'is_deleted', operator: 0)
        ->first(); // ✅ return only one row
    
    

    return response()->json([
        'data' => $patientDetail,
    ],  status: 200);
}

    public function update(Request $request, string $id){}
    public function destroy(string $id): void{}
}
