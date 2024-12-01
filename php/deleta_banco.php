<?php
   require 'banco.php';

   $sql = "delete * from pessoas";	
    $qry = $con->prepare($sql); 
    $qry->execute();
?>