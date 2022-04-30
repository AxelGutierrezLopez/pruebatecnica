package com.example.backend.security.model;

import javax.persistence.*;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

import com.example.backend.security.enums.RolNombre;

import lombok.Data;

@Data
@Entity
public class Rol {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id_rol;
	@NotNull
	@Enumerated(EnumType.STRING)
	private RolNombre rolNombre;

	
    public Rol() {
    }

    public Rol(@NotNull RolNombre rolNombre) {
        this.rolNombre = rolNombre;
    }
    
}
