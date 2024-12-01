<?php
    require 'banco.php';

    $nome = $_GET['nome'];
    $sexo = $_GET['sexo'];
    $cabelo = $_GET['cabelo'];
    $img = $_GET['img'];

    $sql = "insert into pessoas (nome, sexo, cabelo, img)
                        values (:nome, :sexo, :cabelo, :img)";	
    $qry = $con->prepare($sql); 
    $qry->bindParam(':nome', $nome, PDO::PARAM_STR);
    $qry->bindParam(':sexo', $sexo, PDO::PARAM_STR);
    $qry->bindParam(':cabelo', $cabelo, PDO::PARAM_STR);
    $qry->bindParam(':img', $img, PDO::PARAM_STR);
    $qry->execute();
    $nr = $qry->rowCount();
    echo $nr;
?>