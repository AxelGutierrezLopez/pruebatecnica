package com.example.backend.dto;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EntidadDTO {

	private int id_entidad;
	@NotEmpty
	@Size(max=100, message = "El nro_documento puede tener hasta 100 caracteres")
	private String nrodocumento;
	
	@NotEmpty
	@Size(min=20,max=200, message = "La razon social puede tener de 20 a 200 caracteres")
	private String razonsocial;
	
	@NotEmpty
	@Size(min=20,max=200, message = "El nombre comercial puede tener de 20 a 200 caracteres")
	private String nombrecomercial;
	
	@NotEmpty
	@Size(min=20,max=200, message = "La Direccion puede tener de 20 a 200 caracteres")
	private String direccion;
	
	@NotEmpty
	@Size(min=9,message = "El telefono debe de tener 9 caracteres")
	private String telefono;
	
	private Boolean estado;
	
	@NotNull(message = "El Tipo de documento no puede ser vacío")
	private TipodocumentoDTO Tipodocumento;
	
	@NotNull(message = "El Tipo de contribuyente no puede ser vacío")
	private TipocontribuyenteDTO Tipocontribuyente;
}
