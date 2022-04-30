package com.example.backend.security.repository;

import java.util.Optional;
import org.springframework.stereotype.Repository;
import com.example.backend.repository.GenericRepository;
import com.example.backend.security.model.Usuario;

@Repository
public interface UsuarioRepository extends GenericRepository<Usuario, Integer> {
	Optional<Usuario> findByUsuario(String usuario);

	boolean existsByUsuario(String usuario);

	boolean existsByEmail(String email);
}
