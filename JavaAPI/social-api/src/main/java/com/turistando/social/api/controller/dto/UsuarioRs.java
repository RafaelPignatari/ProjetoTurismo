package com.turistando.social.api.controller.dto;

import com.turistando.social.api.model.UsuarioModel;

public class UsuarioRs {
    private Integer id;
    private String nome;
    private String login;
    private String senha;
    private Integer idade;

    public static UsuarioRs converter (UsuarioModel u){
        var usuario = new UsuarioRs();
        usuario.setNome(u.getNome());
        usuario.setLogin(u.getLogin());
        usuario.setIdade(u.getIdade());
        return usuario;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public Integer getIdade() {
        return idade;
    }

    public void setIdade(Integer idade) {
        this.idade = idade;
    }
}
