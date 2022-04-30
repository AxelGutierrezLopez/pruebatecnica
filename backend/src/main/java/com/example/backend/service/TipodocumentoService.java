package com.example.backend.service;

import java.util.List;

import com.example.backend.dto.TipodocumentoDTO;
import com.example.backend.security.dto.ResponseMensaje;

public interface TipodocumentoService {

	ResponseMensaje<?> create(TipodocumentoDTO tipodocumentoDTO);

	List<TipodocumentoDTO> getAll();
	
	List<TipodocumentoDTO> getByEstado();

	TipodocumentoDTO getById(int id_tipo_documento);

	ResponseMensaje<?> update(int id_tipo_documento, TipodocumentoDTO tipodocumentoDTO);

	void deleteById(int id_tipo_documento);

}
