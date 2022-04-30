package com.example.backend.security.dto;

import java.util.Collection;
import org.springframework.security.core.GrantedAuthority;
import lombok.Data;


@Data
public class JwtDTO {
	private String token;
	private String bearer = "Bearer";
	private String usuario;
	private Collection<? extends GrantedAuthority> authorities;
	
	public JwtDTO(String token, String usuario, Collection<? extends GrantedAuthority> authorities) {
		this.token = token;
		this.usuario = usuario;
		this.authorities = authorities;
	}
	
	
}
