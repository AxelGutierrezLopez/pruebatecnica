package com.example.backend.dto;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TipodocumentoDTO {
	private int id_tipo_documento;
    @NotEmpty(message = "El codigo no puede estar vacio")
    @Size(max = 20, message = "El codigo puede tener hasta 20 caracteres") 
	private String codigo;
    @NotEmpty(message = "El nombre no puede estar vacio")
    @Size(min = 5, max = 100, message = "El nombre debe estar entre 5 y 100 caracteres") 
	private String nombre;
    @NotEmpty(message = "La descripcion no puede estar vacia")
    @Size(min = 5, max = 100, message = "La descripcion debe estar entre 5 y 100 caracteres") 
	private String descripcion;
	private Boolean estado;
}
