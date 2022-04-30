package com.example.backend.service.impl;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.backend.dto.TipocontribuyenteDTO;
import com.example.backend.dto.TipodocumentoDTO;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.model.Tipocontribuyente;
import com.example.backend.model.Tipodocumento;
import com.example.backend.repository.TipodocumentoRepository;
import com.example.backend.security.dto.ResponseMensaje;
import com.example.backend.service.TipodocumentoService;
import org.modelmapper.ModelMapper;

@Transactional
@Service
public class TipodocumentoImpl implements TipodocumentoService {

	private TipodocumentoRepository tipodocumentoRepository;
	private ModelMapper mapper;

	public TipodocumentoImpl(TipodocumentoRepository tipodocumentoRepository, ModelMapper mapper) {
		this.tipodocumentoRepository = tipodocumentoRepository;
		this.mapper = mapper;
	}

	private ResponseMensaje validacion(Tipodocumento tipodocumento, TipodocumentoDTO tipodocumentoDTO) {
		// VALIDACION REQUERIDO
		// CODIGO
		if (tipodocumentoDTO.getCodigo() == null) {
			return new ResponseMensaje(404, "Codigo es requerido", null);
		}
		// NOMBRE
		if (tipodocumentoDTO.getNombre() == null) {
			return new ResponseMensaje(404, "Nombre es requerido", null);
		}
		// DESCRIPCION
		if (tipodocumentoDTO.getDescripcion() == null) {
			return new ResponseMensaje(404, "Descripcion es requerido", null);
		}

		if (tipodocumento == null) {
			// CREAR
			if (this.tipodocumentoRepository.findByCodigo(tipodocumentoDTO.getCodigo()).orElse(null) != null) {
				return new ResponseMensaje(404, "Ya existe Codigo " + tipodocumentoDTO.getCodigo(), null);
			}

			if (this.tipodocumentoRepository.findByNombre(tipodocumentoDTO.getNombre()).orElse(null) != null) {
				return new ResponseMensaje(404, "Ya existe Nombre " + tipodocumentoDTO.getNombre(), null);
			}

			if (this.tipodocumentoRepository.findByDescripcion(tipodocumentoDTO.getDescripcion())
					.orElse(null) != null) {
				return new ResponseMensaje(404, "Ya existe Descripcion " + tipodocumentoDTO.getDescripcion(), null);
			}

			// CREAR OBJETO
			Tipodocumento tipo = mapToEntity(tipodocumentoDTO);
			tipo.setEstado(true);
			Tipodocumento newTipodocumento = tipodocumentoRepository.save(tipo);
			TipodocumentoDTO tipodocumentoResponse = mapToDTO(newTipodocumento);
			return new ResponseMensaje(200, "Tipo documento creado " + tipodocumentoDTO.getNombre(),
					tipodocumentoResponse);

		} else {

			// UPDATE
			if (!tipodocumento.getCodigo().equals(tipodocumentoDTO.getCodigo())
					&& tipodocumentoRepository.findByCodigo(tipodocumentoDTO.getCodigo()).isPresent()) {
				return new ResponseMensaje(404, "Ya existe Codigo " + tipodocumentoDTO.getCodigo(), null);
			}
			if (!tipodocumento.getNombre().equals(tipodocumentoDTO.getNombre())
					&& tipodocumentoRepository.findByNombre(tipodocumentoDTO.getNombre()).isPresent()) {
				return new ResponseMensaje(404, "Ya existe Nombre " + tipodocumentoDTO.getNombre(), null);
			}

			if (!tipodocumento.getDescripcion().equals(tipodocumentoDTO.getDescripcion())
					&& tipodocumentoRepository.findByDescripcion(tipodocumentoDTO.getDescripcion()).isPresent()) {
				return new ResponseMensaje(404, "Ya existe Descripcion " + tipodocumentoDTO.getDescripcion(), null);
			}
			
			// UPDATE OBJETO
			tipodocumento.setCodigo(tipodocumentoDTO.getCodigo());
			tipodocumento.setNombre(tipodocumentoDTO.getNombre());
			tipodocumento.setDescripcion(tipodocumentoDTO.getDescripcion());
			tipodocumento.setEstado(tipodocumentoDTO.getEstado());
			Tipodocumento updateTipodocumento = tipodocumentoRepository.save(tipodocumento);
			
			return new ResponseMensaje(200, "Tipo documento actualizado " + tipodocumentoDTO.getNombre(),
					updateTipodocumento);

		}

	}

	@Override
	public ResponseMensaje<?> create(TipodocumentoDTO tipodocumentoDTO) {
		return this.validacion(null, tipodocumentoDTO);
	}

	@Override
	public List<TipodocumentoDTO> getAll() {
		List<Tipodocumento> listOfTipos = tipodocumentoRepository.findAll();
		List<TipodocumentoDTO> content = listOfTipos.stream().map(tipodocumento -> mapToDTO(tipodocumento))
				.collect(Collectors.toList());
		return content;
	}
	
	@Override
	public List<TipodocumentoDTO> getByEstado() {
		List<Tipodocumento> listOfTipos = tipodocumentoRepository.findByEstado(true);
		List<TipodocumentoDTO> content = listOfTipos.stream().map(tipodocumento -> mapToDTO(tipodocumento))
				.collect(Collectors.toList());
		return content;
	}


	@Override
	public TipodocumentoDTO getById(int id_tipo_documento) {
		Tipodocumento tipodocumento = tipodocumentoRepository.findById(id_tipo_documento).orElseThrow(
				() -> new ResourceNotFoundException("Tipo documento", "id_tipo_documento", id_tipo_documento));
		return mapToDTO(tipodocumento);
	}

	@Override
	public ResponseMensaje update(int id_tipo_documento, TipodocumentoDTO tipodocumentoDTO) {
		Tipodocumento tipodocumento = tipodocumentoRepository.findById(id_tipo_documento).orElseThrow(
				() -> new ResourceNotFoundException("Tipo documento", "id_tipo_documento", id_tipo_documento));
		return this.validacion(tipodocumento, tipodocumentoDTO);
	}

	@Override
	public void deleteById(int id_tipo_documento) {
		Tipodocumento tipodocumento = tipodocumentoRepository.findById(id_tipo_documento).orElseThrow(
				() -> new ResourceNotFoundException("Tipo documento", "id_tipo_documento", id_tipo_documento));
		tipodocumento.setEstado(false);
		this.tipodocumentoRepository.save(tipodocumento);
	}

	public TipodocumentoDTO mapToDTO(Tipodocumento tipodocumento) {
		TipodocumentoDTO tipodocumentoDTO = mapper.map(tipodocumento, TipodocumentoDTO.class);
		return tipodocumentoDTO;
	}

	private Tipodocumento mapToEntity(TipodocumentoDTO tipodocumentoDTO) {
		Tipodocumento tipodocumento = mapper.map(tipodocumentoDTO, Tipodocumento.class);
		return tipodocumento;
	}

}
