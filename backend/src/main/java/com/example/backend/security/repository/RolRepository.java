package com.example.backend.security.repository;

import java.util.Optional;

import org.springframework.stereotype.Repository;
import com.example.backend.repository.GenericRepository;
import com.example.backend.security.enums.RolNombre;
import com.example.backend.security.model.Rol;

@Repository
public interface RolRepository extends GenericRepository<Rol, Integer> {
	Optional<Rol> findByRolNombre (RolNombre rolnombre);

}
