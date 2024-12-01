<?php
    require 'banco.php';

    $sql = "select * from pessoas order by nome";	
    $qry = $con->prepare($sql); 
    $qry->execute();
    $registros = $qry->fetchAll(PDO::FETCH_OBJ);
    echo json_encode($registros);

?>