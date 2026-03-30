<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Session;
use App\Mail\OtpMail;
use App\Models\User;

class MailController extends Controller
{
    // Send OTP
    public function sendOtp(Request $request)
    {
        
$user = User::where('email', $request->email)->first();
        
       
        if (!$user) {
            return response()->json([
                'success' => false,
                'error'   => 'Email is invalid or Not Found User'
            ], 404);
        }


        // Generate random 6-digit OTP
        $otp = rand(100000, 999999);

        
        // Send OTP via email
        $to = $request->email; // user email from request
        Mail::to($to)->send(new OtpMail($otp));

        return response()->json([
            'success' => true,
            'message' => 'OTP sent successfully to ' . $to,
            'otp'=>$otp,
            'user'=>$user,
            'time'=>now()->addMinutes(1),
            'expires_in' => 60
        ]);
    }

    // Verify OTP
    // public function verifyOtp(Request $request)
    // {
    //     dd(Session('otp_expiry'));
      
    //     $storedOtp = $request->otp;

    //     $expiry = Session::get('otp_expiry');

    //     if (!$storedOtp || !$expiry) {
    //         return response()->json(['success' => false, 'message' => 'OTP expired or not generated']);
    //     }

    //     if (now()->greaterThan($expiry)) {
    //         Session::forget(['otp', 'otp_expiry']);
    //         return response()->json(['success' => false, 'message' => 'OTP expired']);
    //     }

    //     if ($request->otp == $storedOtp) {
    //         // OTP matched, clear session
    //         Session::forget(['otp', 'otp_expiry']);
    //         return response()->json(['success' => true, 'message' => 'OTP verified successfully']);
    //     }

    //     return response()->json(['success' => false, 'message' => 'Invalid OTP']);
    // }
}
