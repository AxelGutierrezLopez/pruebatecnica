package com.example.backend.dto;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TipocontribuyenteDTO {
	private int id_tipo_contribuyente;
    @NotEmpty(message = "El nombre no puede estar vacio")
    @Size(min = 5, max = 100, message = "El nombre debe estar entre 5 y 100 caracteres") 
	private String nombre;
	private Boolean estado;
}
