<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\PatientController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\MailController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout',  [AuthController::class, 'logout']);
    Route::get('/profile', [AuthController::class, 'profile']);
    
});

// Appointments
Route::get('appointments', [AppointmentController::class, 'index']);
Route::post('appointments', [AppointmentController::class, 'store']);
Route::get('appointments/patient/{id}', [AppointmentController::class, 'getByPatient']);
Route::get('appointments/doctor/{id}', [AppointmentController::class, 'getByDoctor']);
Route::put('appointments/{id}/status', [AppointmentController::class, 'updateStatus']);
Route::put('appointments/{id}/reschedule', [AppointmentController::class, 'reschedule']);
Route::delete('appointments/{id}', [AppointmentController::class, 'cancel']);

//Admin
Route::get('admin-dashboard',[AdminController::class,'index']);
Route::delete('user-destroy/{id}',[AdminController::class,'destroy']);
Route::put('user-update/{id}', [AdminController::class, 'update']);
Route::get('user-show/{id}', [AdminController::class, 'show']);
Route::post('user-create/{role}', [AdminController::class, 'store']);

//Mail
Route::post('/send-otp',[MailController::class,'sendOtp']);
Route::post('/verify-otp', [MailController::class, 'verifyOtp']);
Route::post('/change-password/{id}', [AuthController::class, 'changePassword']);


//Patient
Route::get('get-doctors',[PatientController::class,'index']);
Route::get('get-patient-detail/{id}',[PatientController::class,'getPatientDetail']);

//Doctor