package com.example.backend.security.model;

import java.util.HashSet;
import java.util.Set;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.*;
import javax.persistence.ManyToMany;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@Entity
public class Usuario {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id_usuario;
	@NotNull
	private String nombre;
	@NotNull
	@Column(unique = true)
	private String usuario;
	@NotNull
	private String email;
	@NotNull
	private String password;
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "usuario_rol", joinColumns = @JoinColumn(name = "id_usuario"), inverseJoinColumns = @JoinColumn(name = "id_rol"))
	private Set<Rol> roles = new HashSet<>();

	public Usuario() {
	}

	public Usuario(@NotNull String nombre, @NotNull String usuario, @NotNull String email, @NotNull String password) {
		this.nombre = nombre;
		this.usuario = usuario;
		this.email = email;
		this.password = password;
	}

}
