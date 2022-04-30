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
import com.example.backend.dto.TipocontribuyenteDTO;
import com.example.backend.security.dto.MensajeDTO;
import com.example.backend.security.dto.ResponseMensaje;
import com.example.backend.service.TipocontribuyenteService;

@Controller
@RequestMapping("/tipocontribuyente")
@CrossOrigin(origins = "*")
public class TipocontribuyenteController {

	private TipocontribuyenteService tipocontribuyenteService;

	@Autowired
	public TipocontribuyenteController(TipocontribuyenteService tipocontribuyenteService) {
		this.tipocontribuyenteService = tipocontribuyenteService;
	}

	@PostMapping
	public ResponseEntity<ResponseMensaje<?>> create(@RequestBody TipocontribuyenteDTO tipocontribuyenteDTO) {
		return new ResponseEntity<>(tipocontribuyenteService.create(tipocontribuyenteDTO), HttpStatus.CREATED);
	}

	@GetMapping
	public ResponseEntity<List<TipocontribuyenteDTO>> getAll() {
		return ResponseEntity.ok(tipocontribuyenteService.getAll());
	}
	
	@GetMapping("/active")
	public ResponseEntity<List<TipocontribuyenteDTO>> getByEstado() {
		return ResponseEntity.ok(tipocontribuyenteService.getByEstado());
	}
	
	
	@GetMapping("/{id_tipo_contribuyente}")
	public ResponseEntity<TipocontribuyenteDTO> getById(@PathVariable(name = "id_tipo_contribuyente") int id_tipo_contribuyente) {
		return ResponseEntity.ok(tipocontribuyenteService.getById(id_tipo_contribuyente));
	}

	@PutMapping("/{id_tipo_contribuyente}")
	public ResponseEntity<ResponseMensaje<?>> update(@RequestBody TipocontribuyenteDTO tipocontribuyenteDTO,
			@PathVariable(name = "id_tipo_contribuyente") int id_tipo_contribuyente) {
		return new ResponseEntity<>(tipocontribuyenteService.update(id_tipo_contribuyente, tipocontribuyenteDTO), HttpStatus.OK);
	}

	@DeleteMapping("/{id_tipo_contribuyente}")
	public ResponseEntity<String> delete(@PathVariable(name = "id_tipo_contribuyente") int id_tipo_contribuyente) {
		tipocontribuyenteService.deleteById(id_tipo_contribuyente);
        return new ResponseEntity(new MensajeDTO("Tipo contribuyente ha sido inhabilitado"), HttpStatus.OK);
	}

}
