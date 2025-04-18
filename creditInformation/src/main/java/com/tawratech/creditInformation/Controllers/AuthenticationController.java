package com.tawratech.creditInformation.Controllers;

import com.tawratech.creditInformation.DTO.*;
import com.tawratech.creditInformation.Entity.User;
import com.tawratech.creditInformation.Services.AuthenticationService;
import com.tawratech.creditInformation.Services.EmailService;
import com.tawratech.creditInformation.Services.OtpService;
import com.tawratech.creditInformation.config.AdminVerificationProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200") // Allow requests from Angular
public class AuthenticationController {

    // it will store the signup request data temperately till otp is verified.
    private final Map<String, SignUpRequest> pendingSignups = new ConcurrentHashMap<>();
    private final AdminVerificationProperties adminVerificationProperties;


    private final AuthenticationService authenticationService;

    @Autowired
    private OtpService otpService;

    @Autowired
    private EmailService emailService;

    @PostMapping("/signup")
    public ResponseEntity<ApiResponse> signup(@RequestBody SignUpRequest signUpRequest){
        String email = signUpRequest.getEmail();

        // Store the request temporarily
        pendingSignups.put(email, signUpRequest);

        // Generate and send OTP
        String otp = otpService.generateOtp(email);
        emailService.sendOtpEmail(email, otp);

        return ResponseEntity.ok(new ApiResponse("OTP sent to email. Please verify to complete registration.", "OTP_SENT"));

        // return ResponseEntity.ok(authenticationService.signUp(signUpRequest));
    }

    @PostMapping("/signing")
    public ResponseEntity<JwtAuthenticationResponse> signing(@RequestBody SigninRequest signinRequest){
        return  ResponseEntity.ok(authenticationService.sigin(signinRequest));
    }

    @PostMapping("/refresh")
    public ResponseEntity<JwtAuthenticationResponse> refresh(@RequestBody RefreshTokenRequest refreshTokenRequest){
        return  ResponseEntity.ok(authenticationService.refreshToken(refreshTokenRequest));
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<ApiResponse> verifyOtp(@RequestBody EmailVerificationRequest request) {
        String email = request.getEmail();
        String otp = request.getOtp();

        boolean valid = otpService.verifyOtp(email, otp);
        if (!valid) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse("Invalid OTP", "OTP_VERIFICATION_FAILED"));
        }

        // Clear OTP
        otpService.clearOtp(email);

        // Retrieve the pending signup
        SignUpRequest signUpRequest = pendingSignups.get(email);
        if (signUpRequest == null) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse("No signup request found for this email.", "SIGNUP_DATA_NOT_FOUND"));
        }

        // Create the user
        User newUser = authenticationService.signUp(signUpRequest);

        // Check if user creation was successful
        if (newUser == null) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("Failed to create user. Please try again.", "USER_CREATION_FAILED"));
        }

        // Remove from pending
        pendingSignups.remove(email);

        return ResponseEntity.ok(new ApiResponse("Registration successful!", "USER_CREATED"));
    }

    @PostMapping("/verify-admin-code")
    public ResponseEntity<ApiResponse> verifyAdminCode(@RequestBody CodeVerificationRequest request) {
        String providedHashedCode = request.getCode();
        String expectedRawCode = adminVerificationProperties.getCode();
        try {
            // Hash your expected raw code using SHA-256
            String expectedHashedCode = sha256(expectedRawCode);

            if (expectedHashedCode.equals(providedHashedCode)) {
                return ResponseEntity.ok(new ApiResponse("Code verified successfully", "VERIFIED"));
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(new ApiResponse("Invalid verification code", "INVALID_CODE"));
            }

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("Internal error", "ERROR"));
        }
    }

    private String sha256(String original) throws Exception {
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        byte[] encodedHash = digest.digest(original.getBytes(StandardCharsets.UTF_8));

        // Convert to hex string
        StringBuilder hexString = new StringBuilder();
        for (byte b : encodedHash) {
            String hex = Integer.toHexString(0xff & b);
            if(hex.length() == 1) hexString.append('0');
            hexString.append(hex);
        }
        return hexString.toString();
    }

}
