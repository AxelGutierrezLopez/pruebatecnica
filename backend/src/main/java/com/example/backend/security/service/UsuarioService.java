package com.example.backend.security.service;

import java.util.Optional;
import javax.transaction.Transactional;
import com.example.backend.security.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.backend.security.model.Usuario;

@Service
@Transactional
public class UsuarioService {

	@Autowired
	UsuarioRepository usuarioRepository;

	public Optional<Usuario> getByUsuario(String usuario) {
		return usuarioRepository.findByUsuario(usuario);
	}
	
	public boolean existsByUsuario(String usuario) {
		return usuarioRepository.existsByUsuario(usuario);
	}
	
	public boolean existsByEmail(String email) {
		return usuarioRepository.existsByEmail(email);
	}
	
	public void save (Usuario usuario) {
		usuarioRepository.save(usuario);
	}

}
