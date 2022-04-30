package com.example.backend.security.dto;

import javax.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginUsuario {
	@NotBlank
	private String usuario;
	@NotBlank
	private String password;
}
