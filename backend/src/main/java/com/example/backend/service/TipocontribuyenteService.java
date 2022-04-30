package com.example.backend.service;

import java.util.List;
import com.example.backend.dto.TipocontribuyenteDTO;
import com.example.backend.security.dto.ResponseMensaje;

public interface TipocontribuyenteService {

	ResponseMensaje<?> create(TipocontribuyenteDTO tipocontribuyenteDTO);

	List<TipocontribuyenteDTO> getAll();
	
	List<TipocontribuyenteDTO> getByEstado();

	TipocontribuyenteDTO getById(int id_tipo_contribuyente);

	ResponseMensaje<?> update(int id_tipo_contribuyente, TipocontribuyenteDTO tipocontribuyenteDTO);

	void deleteById(int id_tipo_contribuyente);

}
