package com.example.backend.security.service;

import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.security.enums.RolNombre;
import com.example.backend.security.model.Rol;
import com.example.backend.security.repository.RolRepository;

@Service
@Transactional
public class RolService {
	
	@Autowired
	RolRepository rolRepository;
	
	
	public Optional<Rol> findByRolNombre(RolNombre rolNombre) {
		return rolRepository.findByRolNombre(rolNombre);
	}
	
    public void save(Rol rol){
        rolRepository.save(rol);
    }

}
