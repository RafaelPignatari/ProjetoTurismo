package com.turistando.social.api.controller;

import com.turistando.social.api.controller.dto.UsuarioRq;
import com.turistando.social.api.controller.dto.UsuarioRs;
import com.turistando.social.api.model.UsuarioModel;
import com.turistando.social.api.repository.UsuarioRepository;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/usuario")
public class UsuarioController {
    private final UsuarioRepository repository;

    public UsuarioController(UsuarioRepository repository) {
        this.repository = repository;
    }

    @GetMapping(path = "/listar",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<UsuarioRs>> getAll(){
        var usuarios = repository.findAll();
        return ResponseEntity.ok(usuarios
                .stream()
                .map(UsuarioRs::converter)
                .collect(Collectors.toList()));
    }


    @GetMapping(path = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UsuarioModel> consultar(@PathVariable("id") Integer id) throws Exception {
        var u = repository.findById(id);
        if(!u.isPresent())
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(u.get());}

    @PostMapping(path = "/salvar", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UsuarioRs> salvar(@RequestBody UsuarioRq usuarioEntrada){
        var u = new UsuarioModel();
        u.setNome(usuarioEntrada.getNome());
        u.setLogin(usuarioEntrada.getLogin());
        u.setSenha(usuarioEntrada.getSenha());
        u.setIdade(usuarioEntrada.getIdade());
        repository.save(u);
        return ResponseEntity.ok(UsuarioRs.converter(u));
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Boolean> deletar(@PathVariable("id") Integer id){
        var u = repository.findById(id);
        if (!u.isPresent())
            return ResponseEntity.notFound().build();

        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping(path = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UsuarioRs> atualizar(@PathVariable Integer id, @RequestBody UsuarioRq usuario) throws Exception {
        var u = repository.findById(id);

        if (!u.isPresent())
            return ResponseEntity.notFound().build();

        var usuarioSave = u.get();
        usuarioSave.setNome(usuario.getNome());
        usuarioSave.setLogin(usuario.getLogin());
        usuarioSave.setSenha(usuario.getSenha());
        usuarioSave.setIdade(usuario.getIdade());
        repository.save(usuarioSave);

        return ResponseEntity.ok(UsuarioRs.converter(usuarioSave));
    }

    @GetMapping(path = "/login", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UsuarioRs> login(@RequestParam("login") String login, @RequestParam("senha") String senha){
        var usuarios = repository.findAll();
        var usuarioRetorno = usuarios
                .stream()
                .filter(usuario -> usuario.getLogin().equals(login) && usuario.getSenha().equals(senha))
                .map(UsuarioRs::converter)
                .findFirst().orElse(null);
        if(usuarioRetorno == null)
            return ResponseEntity.notFound().build();

        return ResponseEntity.ok(usuarioRetorno);
    }
}
