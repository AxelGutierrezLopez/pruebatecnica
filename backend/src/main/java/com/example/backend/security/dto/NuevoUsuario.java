package com.example.backend.security.dto;

import java.util.HashSet;
import java.util.Set;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import lombok.Data;


@Data
public class NuevoUsuario {
	@NotBlank
	private String nombre;
	@NotBlank
	private String usuario;
	@Email
	private String email;
	@NotBlank
	private String password;
	private Set<String> roles = new HashSet<>();
}
