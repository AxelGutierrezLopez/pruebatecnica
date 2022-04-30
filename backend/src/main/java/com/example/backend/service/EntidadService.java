package com.example.backend.service;

import java.util.List;

import com.example.backend.dto.EntidadDTO;
import com.example.backend.security.dto.ResponseMensaje;

public interface EntidadService {

	ResponseMensaje<?> create(EntidadDTO entidadDTO);

	List<EntidadDTO> getAll();

	EntidadDTO getById(int id_entidad);

	ResponseMensaje<?> update(int id_entidad, EntidadDTO entidadDTO);

	void deleteById(int id_entidad);

}
