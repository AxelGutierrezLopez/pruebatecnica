package com.example.backend.service.impl;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.backend.dto.EntidadDTO;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.model.Entidad;
import com.example.backend.model.Tipocontribuyente;
import com.example.backend.model.Tipodocumento;
import com.example.backend.repository.EntidadRepository;
import com.example.backend.repository.TipocontribuyenteRepository;
import com.example.backend.repository.TipodocumentoRepository;
import com.example.backend.security.dto.ResponseMensaje;
import com.example.backend.service.EntidadService;
import org.modelmapper.ModelMapper;

@Transactional
@Service
public class EntidadImpl implements EntidadService {

	private EntidadRepository entidadRepository;
	private TipodocumentoRepository tipodocumentoRepository;
	private TipocontribuyenteRepository tipocontribuyenteRepository;
	private ModelMapper mapper;

	public EntidadImpl(EntidadRepository entidadRepository,TipodocumentoRepository tipodocumentoRepository ,TipocontribuyenteRepository tipocontribuyenteRepository,  ModelMapper mapper) {
		this.entidadRepository = entidadRepository;
		this.tipocontribuyenteRepository = tipocontribuyenteRepository;
		this.tipodocumentoRepository = tipodocumentoRepository;
		this.mapper = mapper;
	}

	private ResponseMensaje validacion(Entidad entidad, EntidadDTO entidadDTO) {
		// VALIDACION REQUERIDO
		// NRO. DOCUMENTO
		if (entidadDTO.getNrodocumento() == null) {
			return new ResponseMensaje(404, "Nro. Documento es requerido", null);
		}
		// RAZON SOCIAL
		if (entidadDTO.getRazonsocial() == null) {
			return new ResponseMensaje(404, "Razon Social es requerido", null);
		}
		// NOMBRE COMERCIAL
		if (entidadDTO.getNombrecomercial() == null) {
			return new ResponseMensaje(404, "Nombre Comercial es requerido", null);
		}

		// TELEFONO
		if (entidadDTO.getTelefono() == null) {
			return new ResponseMensaje(404, "Telefono es requerido", null);
		}

		// DIRECCION
		if (entidadDTO.getDireccion() == null) {
			return new ResponseMensaje(404, "Direccion es requerido", null);
		}

		// TIPO DOCUMENTO
		if (entidadDTO.getTipodocumento() == null) {
			return new ResponseMensaje(404, "Tipo documento es requerido", null);
		}

		// TIPO CONTRIBUYENTE
		if (entidadDTO.getTipocontribuyente() == null) {
			return new ResponseMensaje(404, "Tipo contribuyente es requerido", null);
		} 

		Tipodocumento  tipodocumento = tipodocumentoRepository.findById(entidadDTO.getTipodocumento().getId_tipo_documento())
				.orElseThrow(() -> new ResourceNotFoundException("Tipo documento", "id_tipo_documento", entidadDTO.getTipodocumento().getId_tipo_documento()));
		
		Tipocontribuyente tipocontribuyente = tipocontribuyenteRepository.findById(entidadDTO.getTipocontribuyente().getId_tipo_contribuyente())
				.orElseThrow(() -> new ResourceNotFoundException("Tipo contribuyente", "id_tipo_contribuyente", entidadDTO.getTipocontribuyente().getId_tipo_contribuyente()));
		
		
		if (entidad == null) {
			// CREAR
			if (this.entidadRepository.findByNrodocumento(entidadDTO.getNrodocumento()).orElse(null) != null) {
				return new ResponseMensaje(404, "Ya existe Nro. documento " + entidadDTO.getNrodocumento(), null);
			}

			if (this.entidadRepository.findByRazonsocial(entidadDTO.getRazonsocial()).orElse(null) != null) {
				return new ResponseMensaje(404, "Ya existe Razon Social " + entidadDTO.getRazonsocial(), null);
			}

			if (this.entidadRepository.findByNombrecomercial(entidadDTO.getNombrecomercial()).orElse(null) != null) {
				return new ResponseMensaje(404, "Ya existe Nombre Comercial " + entidadDTO.getNombrecomercial(), null);
			}

			if (this.entidadRepository.findByDireccion(entidadDTO.getDireccion()).orElse(null) != null) {
				return new ResponseMensaje(404, "Ya existe Direccion " + entidadDTO.getDireccion(), null);
			}

			if (this.entidadRepository.findByTelefono(entidadDTO.getTelefono()).orElse(null) != null) {
				return new ResponseMensaje(404, "Ya existe Telefono " + entidadDTO.getTelefono(), null);
			}


			// CREAR OBJETO
			Entidad ent = mapToEntity(entidadDTO);
			ent.setEstado(true);
			ent.setTipocontribuyente(tipocontribuyente);
			ent.setTipodocumento(tipodocumento);
			Entidad newEntidad = entidadRepository.save(ent);
			EntidadDTO entidadResponse = mapToDTO(newEntidad);
			return new ResponseMensaje(200, "Entidad creada " + entidadDTO.getRazonsocial(), entidadResponse);

		} else {

			// UPDATE
			if (!entidad.getNrodocumento().equals(entidadDTO.getNrodocumento())
					&& entidadRepository.findByNrodocumento(entidadDTO.getNrodocumento()).isPresent()) {
				return new ResponseMensaje(404, "Ya existe Nro. documento " + entidadDTO.getNrodocumento(), null);
			}

			if (!entidad.getRazonsocial().equals(entidadDTO.getRazonsocial())
					&& this.entidadRepository.findByRazonsocial(entidadDTO.getRazonsocial()).isPresent()) {
				return new ResponseMensaje(404, "Ya existe Razon Social " + entidadDTO.getRazonsocial(), null);
			}

			if (!entidad.getNombrecomercial().equals(entidadDTO.getNombrecomercial())
					&& this.entidadRepository.findByNombrecomercial(entidadDTO.getNombrecomercial()).isPresent()) {
				return new ResponseMensaje(404, "Ya existe Nombre Comercial " + entidadDTO.getNombrecomercial(), null);
			}

			if (!entidad.getDireccion().equals(entidadDTO.getDireccion())
					&& this.entidadRepository.findByDireccion(entidadDTO.getDireccion()).isPresent()) {
				return new ResponseMensaje(404, "Ya existe Direccion " + entidadDTO.getDireccion(), null);
			}

			if (!entidad.getTelefono().equals(entidadDTO.getTelefono())
					&& this.entidadRepository.findByTelefono(entidadDTO.getTelefono()).isPresent()) {
				return new ResponseMensaje(404, "Ya existe Telefono " + entidadDTO.getTelefono(), null);
			}

			// UPDATE OBJETO
			entidad.setNrodocumento(entidadDTO.getNrodocumento());
			entidad.setRazonsocial(entidadDTO.getRazonsocial());
			entidad.setNombrecomercial(entidadDTO.getNombrecomercial());
			entidad.setDireccion(entidadDTO.getDireccion());
			entidad.setTelefono(entidadDTO.getTelefono());
			entidad.setEstado(entidadDTO.getEstado());
			entidad.setTipocontribuyente(tipocontribuyente);
			entidad.setTipodocumento(tipodocumento);
			Entidad updateEntidad = entidadRepository.save(entidad);

			return new ResponseMensaje(200, "Entidad actualizada " + entidadDTO.getRazonsocial(), updateEntidad);

		}

	}

	@Override
	public ResponseMensaje<?> create(EntidadDTO entidadDTO) {
		return this.validacion(null, entidadDTO);
	}

	@Override
	public List<EntidadDTO> getAll() {
		List<Entidad> listOfEntidades = entidadRepository.findAll();
		List<EntidadDTO> content = listOfEntidades.stream().map(entidad -> mapToDTO(entidad))
				.collect(Collectors.toList());
		return content;
	}

	@Override
	public EntidadDTO getById(int id_entidad) {
		Entidad enitdad = entidadRepository.findById(id_entidad)
				.orElseThrow(() -> new ResourceNotFoundException("Entidad", "id_entidad", id_entidad));
		return mapToDTO(enitdad);
	}

	@Override
	public ResponseMensaje<?> update(int id_entidad, EntidadDTO entidadDTO) {
		Entidad entidad = entidadRepository.findById(id_entidad)
				.orElseThrow(() -> new ResourceNotFoundException("Tipo documento", "id_tipo_documento", id_entidad));
		return this.validacion(entidad, entidadDTO);
	}

	@Override
	public void deleteById(int id_entidad) {
		Entidad entidad = entidadRepository.findById(id_entidad)
				.orElseThrow(() -> new ResourceNotFoundException("Entidad", "id_entidad", id_entidad));
		entidad.setEstado(false);
		this.entidadRepository.save(entidad);
	}

	public EntidadDTO mapToDTO(Entidad entidad) {
		EntidadDTO entidadDTO = mapper.map(entidad, EntidadDTO.class);
		return entidadDTO;
	}

	private Entidad mapToEntity(EntidadDTO entidadDTO) {
		Entidad entidad = mapper.map(entidadDTO, Entidad.class);
		return entidad;
	}

}
