<?php
include_once 'conexao.php';
function insereDados($info_usuario, $conexao)
    {
        $sql = "INSERT INTO pessoa (nome, cpf, nascimento, username, email, senha) VALUES (:nome, :cpf, :nascimento, :username, :email, :senha)";
        $stm = $conexao->prepare($sql);
        $stm->execute($info_usuario);
    };

    function tratamentoCPF() {
        return str_replace("-", "", filter_var($_POST["cpf"], FILTER_SANITIZE_NUMBER_INT));
    }
