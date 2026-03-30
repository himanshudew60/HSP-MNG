<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Appointments;
use Illuminate\Support\Facades\DB;

class AppointmentController extends Controller
{
    /**
     * Get all appointments (not cancelled).
     */
    public function index()
    {
        $appointments = Appointments::where('status', '!=', 3)
            ->orderBy('id', 'desc')
            ->get();

        return response()->json([
            'status'  => true,
            'message' => 'Appointments fetched successfully',
            'data'    => $appointments
        ], 200);
    }

    /**
     * Store a new appointment.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'patient_id'        => 'required|exists:users,id',
            'doctor_id'         => 'required|exists:users,id',
            'appointment_time'  => 'required|date',
            'status'            => 'in:0,1,2,3,4',
        ]);

        $appointment = Appointments::create($validated);

        return response()->json([
            'status'  => true,
            'message' => 'Appointment created successfully',
            'data'    => $appointment
        ], 201);
    }

    /**
     * Get all appointments of a patient.
     */
    public function getByPatient(string $id)
    {
        $appointments = DB::table('appointments as AP')
            ->join('users as PT', 'AP.patient_id', '=', 'PT.id')
            ->join('users as DC', 'AP.doctor_id', '=', 'DC.id')
            ->select(
                'AP.id',
                'DC.name as doctor_name',
                'AP.appointment_time',
                'AP.status'
            )
            ->where('AP.patient_id', $id)
            ->where('AP.status', '!=', 3)
            ->orderBy('AP.appointment_time', 'desc')
            ->get();

        return response()->json([
            'status'  => true,
            'message' => 'Appointments fetched successfully',
            'data'    => $appointments
        ], 200);
    }

    /**
     * Get all appointments of a doctor.
     */
    public function getByDoctor(string $id)
    {
        $appointments = DB::table('appointments as AP')
            ->join('users as PT', 'AP.patient_id', '=', 'PT.id')
            ->join('users as DC', 'AP.doctor_id', '=', 'DC.id')
            ->select(
                'AP.id',
                'PT.name as patient_name',
                'AP.appointment_time',
                'AP.status'
            )
            ->where('AP.doctor_id', $id)
            ->where('AP.status', '!=', 3)
            ->orderBy('AP.appointment_time', 'desc')
            ->get();

        return response()->json([
            'status'  => true,
            'message' => 'Appointments fetched successfully',
            'data'    => $appointments
        ], 200);
    }

    /**
     * Update appointment status (confirm, complete, cancel etc.).
     */
    public function updateStatus(Request $request, string $id)
    {
        $appointment = Appointments::find($id);

        if (!$appointment) {
            return response()->json([
                'status'  => false,
                'message' => 'Appointment not found'
            ], 404);
        }

        $validated = $request->validate([
            'status' => 'required|in:0,1,2,3,4',
        ]);

        $appointment->status = $validated['status'];
        $appointment->save();

        return response()->json([
            'status'  => true,
            'message' => 'Appointment status updated successfully',
            'data'    => $appointment
        ], 200);
    }

    /**
     * Reschedule appointment.
     */
    public function reschedule(Request $request, string $id)
    {
        $appointment = Appointments::where('id', $id)
            ->where('status', '!=', 3)
            ->first();

        if (!$appointment) {
            return response()->json([
                'status'  => false,
                'message' => 'Appointment not found'
            ], 404);
        }

        $validated = $request->validate([
            'appointment_time' => 'required|date',
        ]);

        $appointment->appointment_time = $validated['appointment_time'];
        $appointment->status = 4; // Rescheduled
        $appointment->save();

        return response()->json([
            'status'  => true,
            'message' => 'Appointment rescheduled successfully',
            'data'    => $appointment
        ], 200);
    }

    /**
     * Cancel appointment.
     */
    public function cancel(string $id)
    {
        $appointment = Appointments::where('id', $id)
            ->where('status', '!=', 3)
            ->first();

        if (!$appointment) {
            return response()->json([
                'status'  => false,
                'message' => 'Appointment not found'
            ], 404);
        }

        $appointment->status = 3; // Cancelled
        $appointment->save();

        return response()->json([
            'status'  => true,
            'message' => 'Appointment canceled successfully',
            'data'    => $appointment
        ], 200);
    }
}
