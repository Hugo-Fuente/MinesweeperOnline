<?php
	session_start();
	if((!isset($_SESSION['username']) == true) and (!isset($_SESSION['senha']) == true)) {
        unset($_SESSION['username']);
        unset($_SESSION['senha']);
        header('location: ../login.php');
    } 
	session_destroy();
	header("location: ../login.php");
?>