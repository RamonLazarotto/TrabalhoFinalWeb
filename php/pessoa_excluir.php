<?php
    require 'banco.php';

    $id_pessoa = $_GET['id_pessoa'];

    $sql = "delete from pessoas  
             where id_pessoa = :id_pessoa";	
    $qry = $con->prepare($sql); 
    $qry->bindParam(':id_pessoa', $id_pessoa, PDO::PARAM_INT);
    $qry->execute();
    $nr = $qry->rowCount();
?>