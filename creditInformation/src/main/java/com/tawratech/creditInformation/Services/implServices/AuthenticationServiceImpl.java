package com.tawratech.creditInformation.Services.implServices;

import com.tawratech.creditInformation.CardRepository.UserRepository;
import com.tawratech.creditInformation.DTO.JwtAuthenticationResponse;
import com.tawratech.creditInformation.DTO.RefreshTokenRequest;
import com.tawratech.creditInformation.DTO.SignUpRequest;
import com.tawratech.creditInformation.DTO.SigninRequest;
import com.tawratech.creditInformation.Entity.Role;
import com.tawratech.creditInformation.Entity.User;
import com.tawratech.creditInformation.Services.AuthenticationService;
import com.tawratech.creditInformation.Services.JWTService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private  final JWTService jwtService;

    public User signUp(SignUpRequest signUpRequest){
        User user = new User();

        user.setEmail(signUpRequest.getEmail());
        user.setFullName((signUpRequest.getFullName()));
        user.setRole(Role.ADMIN);
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));

        return userRepository.save(user);
    }

    public JwtAuthenticationResponse sigin(SigninRequest signinRequest){
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(signinRequest.getEmail(),signinRequest.getPassword()));
        var user = userRepository.findByEmail(signinRequest.getEmail()).orElseThrow(()-> new IllegalArgumentException("Invalid email or password"));
        var jwt = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(new HashMap<>(), user);

        JwtAuthenticationResponse jwtAuthenticationResponse = new JwtAuthenticationResponse();

        jwtAuthenticationResponse.setToken(jwt);
        jwtAuthenticationResponse.setRefreshToken(refreshToken);
        jwtAuthenticationResponse.setName(user.getFullName());

        return jwtAuthenticationResponse;
    }

    public JwtAuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest){
        String userEmail = jwtService.extractUsername(refreshTokenRequest.getToken());
        User user = userRepository.findByEmail(userEmail).orElseThrow();

        if(jwtService.isTokenValid(refreshTokenRequest.getToken(), user)){
            var jwt = jwtService.generateToken(user);

            JwtAuthenticationResponse jwtAuthenticationResponse = new JwtAuthenticationResponse();

            jwtAuthenticationResponse.setToken(jwt);
            jwtAuthenticationResponse.setRefreshToken(refreshTokenRequest.getToken());
            jwtAuthenticationResponse.setName(user.getFullName());

            return jwtAuthenticationResponse;
        }
        return null;
    }
}
