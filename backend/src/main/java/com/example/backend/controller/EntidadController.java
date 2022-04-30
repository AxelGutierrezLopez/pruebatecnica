package com.example.backend.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.backend.dto.EntidadDTO;
import com.example.backend.dto.TipocontribuyenteDTO;
import com.example.backend.security.dto.MensajeDTO;
import com.example.backend.security.dto.ResponseMensaje;
import com.example.backend.service.EntidadService;
import com.example.backend.service.TipocontribuyenteService;

@Controller
@RequestMapping("/entidad")
@CrossOrigin(origins = "*")
public class EntidadController {

	private EntidadService entidadService;

	@Autowired
	public EntidadController(EntidadService entidadService) {
		this.entidadService = entidadService;
	}

	@PostMapping
	public ResponseEntity<ResponseMensaje<?>> create(@RequestBody EntidadDTO entidadDTO) {
		return new ResponseEntity<>(entidadService.create(entidadDTO), HttpStatus.CREATED);
	}

	@GetMapping
	public ResponseEntity<List<EntidadDTO>> getAll() {
		return ResponseEntity.ok(entidadService.getAll());
	}
	
	@GetMapping("/{id_entidad}")
	public ResponseEntity<EntidadDTO> getById(@PathVariable(name = "id_entidad") int id_entidad) {
		return ResponseEntity.ok(entidadService.getById(id_entidad));
	}

	@PutMapping("/{id_entidad}")
	public ResponseEntity<ResponseMensaje<?>> update(@RequestBody EntidadDTO entidadDTO,
			@PathVariable(name = "id_entidad") int id_entidad) {
		return new ResponseEntity<>(entidadService.update(id_entidad, entidadDTO), HttpStatus.OK);
	}

	@DeleteMapping("/{id_entidad}")
	public ResponseEntity<String> delete(@PathVariable(name = "id_entidad") int id_entidad) {
		entidadService.deleteById(id_entidad);
        return new ResponseEntity(new MensajeDTO("Entidad ha sido inhabilitado"), HttpStatus.OK);
	}

}
