package com.tawratech.creditInformation.Services;

import com.tawratech.creditInformation.DTO.JwtAuthenticationResponse;
import com.tawratech.creditInformation.DTO.RefreshTokenRequest;
import com.tawratech.creditInformation.DTO.SignUpRequest;
import com.tawratech.creditInformation.DTO.SigninRequest;
import com.tawratech.creditInformation.Entity.User;

public interface AuthenticationService {
    User signUp(SignUpRequest signUpRequest);
    JwtAuthenticationResponse sigin(SigninRequest signinRequest);
    JwtAuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest);
}
