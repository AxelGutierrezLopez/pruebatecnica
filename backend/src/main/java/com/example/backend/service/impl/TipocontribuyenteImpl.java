package com.example.backend.service.impl;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.backend.dto.TipocontribuyenteDTO;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.model.Tipocontribuyente;
import com.example.backend.repository.TipocontribuyenteRepository;
import com.example.backend.security.dto.ResponseMensaje;
import com.example.backend.service.TipocontribuyenteService;
import org.modelmapper.ModelMapper;

@Transactional
@Service
public class TipocontribuyenteImpl implements TipocontribuyenteService {

	private TipocontribuyenteRepository tipocontribuyenteRepository;
	private ModelMapper mapper;

	public TipocontribuyenteImpl(TipocontribuyenteRepository tipocontribuyenteRepository, ModelMapper mapper) {
		this.tipocontribuyenteRepository = tipocontribuyenteRepository;
		this.mapper = mapper;
	}

	private ResponseMensaje<?> validacion(Tipocontribuyente tipocontribuyente, TipocontribuyenteDTO tipocontribuyenteDTO) {
		// VALIDACION REQUERIDO
		// NOMBRE
		if (tipocontribuyenteDTO.getNombre() == null) {
			return new ResponseMensaje(404, "Nombre es requerido", null);
		}

		if (tipocontribuyente == null) {
			// CREAR
			if (this.tipocontribuyenteRepository.findByNombre(tipocontribuyenteDTO.getNombre()).orElse(null) != null) {
				return new ResponseMensaje(404, "Ya existe Nombre " + tipocontribuyenteDTO.getNombre(), null);
			}

			// CREAR OBJETO
			Tipocontribuyente tipo = mapToEntity(tipocontribuyenteDTO);
			tipo.setEstado(true);
			Tipocontribuyente newTipocontribuyente = tipocontribuyenteRepository.save(tipo);
			TipocontribuyenteDTO tipocontribuyenteResponse = mapToDTO(newTipocontribuyente);
			return new ResponseMensaje(200, "Tipo contribuyente creado " + tipocontribuyenteDTO.getNombre(),
					tipocontribuyenteResponse);

		} else {

			// UPDATE
			if (!tipocontribuyente.getNombre().equals(tipocontribuyenteDTO.getNombre())
					&& tipocontribuyenteRepository.findByNombre(tipocontribuyenteDTO.getNombre()).isPresent()) {
				return new ResponseMensaje(404, "Ya existe Nombre " + tipocontribuyenteDTO.getNombre(), null);
			}
			
			// UPDATE OBJETO
			tipocontribuyente.setNombre(tipocontribuyenteDTO.getNombre());
			tipocontribuyente.setEstado(tipocontribuyenteDTO.getEstado());
			Tipocontribuyente updateTipocontribuyente = tipocontribuyenteRepository.save(tipocontribuyente);
			
			return new ResponseMensaje(200, "Tipo contribuyente actualizado " + tipocontribuyenteDTO.getNombre(),
					updateTipocontribuyente);

		}

	}

	@Override
	public ResponseMensaje<?> create(TipocontribuyenteDTO tipocontribuyenteDTO) {
		return this.validacion(null, tipocontribuyenteDTO);
	}

	@Override
	public List<TipocontribuyenteDTO> getAll() {
		List<Tipocontribuyente> listOfTipos = tipocontribuyenteRepository.findAll();
		List<TipocontribuyenteDTO> content = listOfTipos.stream().map(tipocontribuyente -> mapToDTO(tipocontribuyente))
				.collect(Collectors.toList());
		return content;
	}
	
	@Override
	public List<TipocontribuyenteDTO> getByEstado() {
		List<Tipocontribuyente> listOfTipos = tipocontribuyenteRepository.findByEstado(true);
		List<TipocontribuyenteDTO> content = listOfTipos.stream().map(tipocontribuyente -> mapToDTO(tipocontribuyente))
				.collect(Collectors.toList());
		return content;
	}


	@Override
	public TipocontribuyenteDTO getById(int id_tipo_contribuyente) {
		Tipocontribuyente tipocontribuyente = tipocontribuyenteRepository.findById(id_tipo_contribuyente).orElseThrow(
				() -> new ResourceNotFoundException("Tipo contribuyente", "id_tipo_contribuyente", id_tipo_contribuyente));
		return mapToDTO(tipocontribuyente);
	}

	@Override
	public ResponseMensaje<?> update(int id_tipo_contribuyente, TipocontribuyenteDTO tipocontribuyenteDTO) {
		Tipocontribuyente tipocontribuyente = tipocontribuyenteRepository.findById(id_tipo_contribuyente).orElseThrow(
				() -> new ResourceNotFoundException("Tipo contribuyente", "id_tipo_contribuyente", id_tipo_contribuyente));
		return this.validacion(tipocontribuyente, tipocontribuyenteDTO);
	}

	@Override
	public void deleteById(int id_tipo_contribuyente) {
		Tipocontribuyente tipocontribuyente = tipocontribuyenteRepository.findById(id_tipo_contribuyente).orElseThrow(
				() -> new ResourceNotFoundException("Tipo contribuyente", "id_tipo_contribuyente", id_tipo_contribuyente));
		tipocontribuyente.setEstado(false);
		this.tipocontribuyenteRepository.save(tipocontribuyente);
	}

	public TipocontribuyenteDTO mapToDTO(Tipocontribuyente tipocontribuyente) {
		TipocontribuyenteDTO tipocontribuyenteDTO = mapper.map(tipocontribuyente, TipocontribuyenteDTO.class);
		return tipocontribuyenteDTO;
	}

	private Tipocontribuyente mapToEntity(TipocontribuyenteDTO tipocontribuyenteDTO) {
		Tipocontribuyente tipocontribuyente = mapper.map(tipocontribuyenteDTO, Tipocontribuyente.class);
		return tipocontribuyente;
	}

}
