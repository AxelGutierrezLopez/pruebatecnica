package com.example.backend.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Repository;
import com.example.backend.model.Tipodocumento;

@Repository
public interface TipodocumentoRepository extends GenericRepository<Tipodocumento, Integer> {
	Optional<Tipodocumento> findByCodigo(String codigo);
	Optional<Tipodocumento> findByNombre(String nombre);
	Optional<Tipodocumento> findByDescripcion(String descripcion);
	List<Tipodocumento> findByEstado(Boolean estado);
}
