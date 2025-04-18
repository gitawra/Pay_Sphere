package com.tawratech.creditInformation.DTO;

import lombok.Data;

@Data
public class RefreshTokenRequest {
    private String token;
    private String name;
}
