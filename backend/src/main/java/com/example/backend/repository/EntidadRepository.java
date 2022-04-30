package com.example.backend.repository;

import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.example.backend.model.Entidad;
@Repository
public interface EntidadRepository extends GenericRepository<Entidad, Integer> {
	Optional<Entidad> findByNrodocumento(String nrodocumento);
	Optional<Entidad> findByRazonsocial(String razonsocial);
	Optional<Entidad> findByNombrecomercial(String nombrecomercial);
	Optional<Entidad> findByDireccion(String direccion);
	Optional<Entidad> findByTelefono(String telefono);

}
