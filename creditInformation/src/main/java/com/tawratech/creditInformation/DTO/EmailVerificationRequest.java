package com.tawratech.creditInformation.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmailVerificationRequest {
    private String email;
    private String otp;
}
