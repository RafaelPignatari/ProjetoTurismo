package com.turistando.social.api.repository;

import com.turistando.social.api.model.UsuarioModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends CrudRepository<UsuarioModel, Integer>, JpaRepository<UsuarioModel, Integer> {}
