package com.example.backend.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Repository;
import com.example.backend.model.Tipocontribuyente;

@Repository
public interface TipocontribuyenteRepository extends GenericRepository<Tipocontribuyente, Integer> {
	Optional<Tipocontribuyente> findByNombre(String nombre);
	List<Tipocontribuyente> findByEstado(Boolean estado);

}
