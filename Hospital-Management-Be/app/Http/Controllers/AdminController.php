<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Appointments;
use Illuminate\Validation\ValidationException;
class AdminController extends Controller
{
    /**
     * Display a listing of the resource (Dashboard Data).
     */
    public function index()
    {
        // Count doctors and patients
        $TotalDoctors  = User::where('role', 2)->count();
        $TotalPatients = User::where('role', 1)->count();
        
         $patients = User::where('is_deleted', 0)
                        ->where('role', 1)
                        ->get();

          $doctors = User::where('is_deleted', 0)
                       ->where('role', 2)
                       ->get();

        // Count appointments by status
        $appointments = Appointments::select('status')
            ->selectRaw('COUNT(*) as total')
            ->groupBy('status')
            ->pluck('total', 'status');


        // Prepare appointment counts with defaults
        $TotalAppointmentRequested = $appointments[0] ?? 0;
        $TotalAppointmentConfirm   = $appointments[1] ?? 0;
        $TotalAppointmentComplete  = $appointments[2] ?? 0;
        $TotalAppointmentCancelled = $appointments[3] ?? 0;

        // Return JSON response
        return response()->json([
            'totalDoctors'     => $TotalDoctors,
            'totalPatients'    => $TotalPatients,
            'totalAppointments' => [
                'requested'  => $TotalAppointmentRequested,
                'confirmed'  => $TotalAppointmentConfirm,
                'completed'  => $TotalAppointmentComplete,
                'cancelled'  => $TotalAppointmentCancelled,
            ],
            'patients' => $patients,
            'doctors'  => $doctors
        ], 200);
    }

    // Other CRUD methods (empty for now)
    
   public function store(Request $request,string $role)
    {
        try {
            $validated = $request->validate([
                'name'     => 'required|string|max:255',
                'email'    => 'required|email|unique:users,email',
                'password' => 'required|min:6',
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'status'  => false,
                'message' => 'Validation failed',
                'errors'  => $e->errors()
            ], 422);
        }

        $user = User::create([
            'name'       => $validated['name'],
            'email'      => $validated['email'],
            'password'   => bcrypt($validated['password']),
            'role'       => $role,
            'is_deleted' => 0,
        ]);

        return response()->json([
            'status'  => true,
            'message' => 'User created successfully',
            'data'    => $user
        ], 201);
    }
   public function show(string $id)
    {
        $user = User::where('id', $id)
                       ->where('is_deleted', 0)
                       ->first();



        if (!$user) {
            return response()->json([
                'status'  => false,
                'message' => 'User not found'
            ], 404);
        }

        return response()->json([
            'status'  => true,
            'message' => 'User fetched successfully',
            'data'    => $user
        ], 200);
    }
    public function update(Request $request, string $id)
    {
        $user = User::where('id', $id)
                       ->where('is_deleted', 0)
                       ->first();

        if (!$user) {
            return response()->json([
                'status'  => false,
                'message' => 'User not found'
            ], 404);
        }

        try {
            $validated = $request->validate([
                'name'     => 'sometimes|string|max:255',
                'email'    => 'sometimes|email|unique:users,email,' . $user->id,
                'password' => 'nullable|min:6',
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'status'  => false,
                'message' => 'Validation failed',
                'errors'  => $e->errors()
            ], 422);
        }

        // Update fields safely
        if (isset($validated['name'])) {
            $user->name = $validated['name'];
        }
        if (isset($validated['email'])) {
            $user->email = $validated['email'];
        }
        if (!empty($validated['password'])) {
            $user->password = bcrypt($validated['password']);
        }

        $user->save();

        return response()->json([
            'status'  => true,
            'message' => 'User updated successfully',
            'data'    => $user
        ], 200);
    }
    public function destroy(string $id)
    {
        $user = User::where('id', $id)
                       ->where('is_deleted', 0)
                       ->first();

        if (!$user) {
            return response()->json([
                'status'  => false,
                'message' => 'User not found or already deleted'
            ], 404);
        }

        $user->is_deleted = 1;
        $user->save();

        return response()->json([
            'status'  => true,
            'message' => 'User deleted successfully'
        ], 200);
    }
}
