<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Your OTP Code</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f6f9;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            border-bottom: 2px solid #2F8FED;
            padding-bottom: 15px;
            margin-bottom: 25px;
        }
        .header h2 {
            margin: 0;
            color: #2F8FED;
        }
        .otp-box {
            text-align: center;
            font-size: 32px;
            font-weight: bold;
            color: #2F8FED;
            letter-spacing: 8px;
            margin: 20px 0;
        }
        .content {
            font-size: 16px;
            color: #333333;
            line-height: 1.6;
        }
        .footer {
            margin-top: 30px;
            font-size: 13px;
            text-align: center;
            color: #888888;
        }

    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>🔐 OTP Verification</h2>
            
        </div>

        <div class="content">
            <p>Hello,</p>
            <p>Use the following One Time Password (OTP) to complete your verification process:</p>

            <div class="otp-box">{{ $otp }}</div>

            <p>This OTP is valid for <b>1 minute</b>. Please do not share it with anyone for your security.</p>
        </div>

        <div class="footer">
            <p>If you didn’t request this, please ignore this email.</p>
            <p>&copy; {{ date('Y') }} Your Company. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
