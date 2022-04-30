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
import com.example.backend.dto.TipodocumentoDTO;
import com.example.backend.security.dto.MensajeDTO;
import com.example.backend.security.dto.ResponseMensaje;
import com.example.backend.service.TipodocumentoService;

@Controller
@RequestMapping("/tipodocumento")
@CrossOrigin(origins = "*")
public class TipodocumentoController {

	private TipodocumentoService tipodocumentoService;

	@Autowired
	public TipodocumentoController(TipodocumentoService tipodocumentoService) {
		this.tipodocumentoService = tipodocumentoService;
	}

	@PostMapping
	public ResponseEntity<ResponseMensaje<?>> create(@RequestBody TipodocumentoDTO tipodocumentoDTO) {
		return new ResponseEntity<>(tipodocumentoService.create(tipodocumentoDTO), HttpStatus.CREATED);
	}

	@GetMapping
	public ResponseEntity<List<TipodocumentoDTO>> getAll() {
		return ResponseEntity.ok(tipodocumentoService.getAll());
	}
	
	@GetMapping("/active")
	public ResponseEntity<List<TipodocumentoDTO>> getByEstado() {
		return ResponseEntity.ok(tipodocumentoService.getByEstado());
	}
	
	
	@GetMapping("/{id_tipo_documento}")
	public ResponseEntity<TipodocumentoDTO> getById(@PathVariable(name = "id_tipo_documento") int id_tipo_documento) {
		return ResponseEntity.ok(tipodocumentoService.getById(id_tipo_documento));
	}

	@PutMapping("/{id_tipo_documento}")
	public ResponseEntity<ResponseMensaje<?>> update(@RequestBody TipodocumentoDTO tipodocumentoDTO,
			@PathVariable(name = "id_tipo_documento") int id_tipo_documento) {
		return new ResponseEntity<>(tipodocumentoService.update(id_tipo_documento, tipodocumentoDTO), HttpStatus.OK);
	}


	@DeleteMapping("/{id_tipo_documento}")
	public ResponseEntity<String> delete(@PathVariable(name = "id_tipo_documento") int id_tipo_documento) {
		tipodocumentoService.deleteById(id_tipo_documento);
        return new ResponseEntity(new MensajeDTO("Tipo documento ha sido inhabilitado"), HttpStatus.OK);
	}

}
