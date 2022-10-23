package com.turistando.social.api.controller;

import com.turistando.social.api.controller.dto.UsuarioRq;
import com.turistando.social.api.controller.dto.UsuarioRs;
import com.turistando.social.api.model.UsuarioModel;
import com.turistando.social.api.repository.UsuarioRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/usuario")
public class UsuarioController {
    private final UsuarioRepository repository;

    public UsuarioController(UsuarioRepository repository) {
        this.repository = repository;
    }

    @GetMapping(path = "/listar")
    public List<UsuarioRs> getAll(){
        var usuarios = repository.findAll();
        return usuarios
                .stream()
                .map(UsuarioRs::converter)
                .collect(Collectors.toList());
    }


@GetMapping(path = "/{id}")
    public Optional<UsuarioModel> consultar(@PathVariable("id") Integer id) throws Exception {
        var u = repository.findById(id);

        if(u.isPresent()){
            return u;
        }
        else {
            //throw abaixo deu erro, não sei pq
            //throw new Exception("Pessoa não encontrada");
            return null;
        }
}

    @PostMapping(path = "/salvar")
    public void salvar(@RequestBody UsuarioRq usuario){
        var u = new UsuarioModel();
        u.setNome(usuario.getNome());
        u.setLogin(usuario.getLogin());
        u.setSenha(usuario.getSenha());
        u.setIdade(usuario.getIdade());
        repository.save(u);

    }

    @DeleteMapping(path = "/deletar/{id}")
    public void deletar(@PathVariable("id") Integer id){
        repository.deleteById(id);
    }

    @PutMapping("/{id}")
    public void atualizar(@PathVariable Integer id, @RequestBody UsuarioRq usuario) throws Exception {
        var u = repository.findById(id);

        if (u.isPresent()){
            var usuarioSave = u.get();
            usuarioSave.setNome(usuario.getNome());
            usuarioSave.setLogin(usuario.getLogin());
            usuarioSave.setSenha(usuario.getSenha());
            usuarioSave.setIdade(usuario.getIdade());
            repository.save(usuarioSave);
        }
        else{
            //throw abaixo deu erro, não sei pq
            //throw new Exception("Pessoa não encontrada");
        }
    }

    @GetMapping("/filter")
    public List<UsuarioRs> obterPorNome(@RequestParam("name") String name){
        return this.repository.findByNomeContains(name)
                .stream()
                .map(UsuarioRs::converter)
                .collect(Collectors.toList());
    }
}
