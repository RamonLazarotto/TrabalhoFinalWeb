<?php
    require 'banco.php';

    $id_pessoa = $_GET['id_pessoa'];
    $nome = $_GET['nome'];
    $sexo = $_GET['sexo'];
    $cabelo = $_GET['cabelo'];

    $sql = "update pessoas set nome = :nome, sexo = :sexo, cabelo = :cabelo
             where id_pessoa = :id_pessoa";	
    $qry = $con->prepare($sql); 
    $qry->bindParam(':id_pessoa', $id_pessoa, PDO::PARAM_INT);
    $qry->bindParam(':nome', $nome, PDO::PARAM_STR);
    $qry->bindParam(':sexo', $sexo, PDO::PARAM_STR);
    $qry->bindParam(':cabelo', $cabelo, PDO::PARAM_STR);
    $qry->execute();
    $nr = $qry->rowCount();
?>