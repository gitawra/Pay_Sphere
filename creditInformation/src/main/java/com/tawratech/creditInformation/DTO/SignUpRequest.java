package com.tawratech.creditInformation.DTO;

import jakarta.persistence.Column;
import lombok.Data;

@Data
public class SignUpRequest {

    private String fullName;

    private String email;

    private String password;
}
