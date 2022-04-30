package com.example.backend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Tipocontribuyente {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id_tipo_contribuyente;

	@Column(name = "nombre", nullable = true, unique = true)
	private String nombre;

	@Column(name = "estado", nullable = true)
	private Boolean estado;

}
