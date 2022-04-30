package com.example.backend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Tipodocumento {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id_tipo_documento;

	@Column(name = "codigo", nullable = false, unique = true)
	private String codigo;

	@Column(name = "nombre", nullable = true, unique = true)
	private String nombre;

	@Column(name = "descripcion", nullable = false)
	private String descripcion;

	@Column(name = "estado", nullable = true)
	private Boolean estado;

	

}
