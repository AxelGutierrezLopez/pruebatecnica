package com.example.backend.security.model;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class UsuarioPrincipal implements UserDetails {
	private String nombre;
	private String usuario;
	private String email;
	private String password;
	private Collection<? extends GrantedAuthority> authorities;

	public UsuarioPrincipal(String nombre, String usuario, String email, String password,
			Collection<? extends GrantedAuthority> authorities) {
		this.nombre = nombre;
		this.usuario = usuario;
		this.email = email;
		this.password = password;
		this.authorities = authorities;
	}

	public static UsuarioPrincipal build(Usuario usuario) {
	      List<GrantedAuthority> authorities =
	                usuario.getRoles().stream().map(rol -> new SimpleGrantedAuthority(rol
	                .getRolNombre().name())).collect(Collectors.toList());
	        return new UsuarioPrincipal(usuario.getNombre(), usuario.getUsuario(), usuario.getEmail(), usuario.getPassword(), authorities);
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return authorities;
	}

	@Override
	public String getPassword() {
		// TODO Auto-generated method stub
		return password;
	}

	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return usuario;
	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

}
