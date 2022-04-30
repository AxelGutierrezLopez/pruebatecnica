package com.example.backend.security.dto;


import lombok.Data;

@Data
public class ResponseMensaje<T> {
	  private Integer codigo;
	  private String mensaje;
	  private T objeto;
	  
	public ResponseMensaje(Integer codigo, String mensaje, T objeto) {
		this.codigo = codigo;
		this.mensaje = mensaje;
		this.objeto = objeto;
	}
	  
	  
}
