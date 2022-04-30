package com.example.backend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
public class Entidad {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id_entidad;
	
	@Column(name = "nrodocumento", nullable = true, unique = true)
	private String nrodocumento;

	@Column(name = "razonsocial", nullable = false)
	private String razonsocial;
	
	@Column(name = "nombrecomercial", nullable = false)
	private String nombrecomercial;
	
	@Column(name = "direccion", nullable = true)
	private String direccion;
	
	@Column(name = "telefono", nullable = true)
	private String telefono;
	
	@Column(name = "estado", nullable = true)
	private Boolean estado;

	@ManyToOne
	@JoinColumn(name = "id_tipo_documento", nullable = false)
	private Tipodocumento tipodocumento;
	
	@ManyToOne
	@JoinColumn(name = "id_tipo_contribuyente", nullable = false)
	private Tipocontribuyente tipocontribuyente;
	

}
