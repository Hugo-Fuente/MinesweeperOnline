<?php
	session_start();
	include "valores_servidor.php";

	$username = $_POST['username'];
	$senha = $_POST['senha'];

	if((!isset($username)) or (!isset($senha)) 
        or $username == "" or $senha == "") {
		header("location: ../index.php") or die();
	}

	$username = stripcslashes($username);
	$senha = stripcslashes($senha);

	try {
		$connection = new PDO("mysql:host=$sname;dbname=$BD", $uname, $pwd);
		$connection->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
		$SQL = "SELECT username, senha FROM usuario where username = '$username' and password = '$senha'";
		$resultado = $connection->query($SQL);
        $resultado = $resultado->fetch(PDO::FETCH_ASSOC);

		if($resultado['username'] == $username && $resultado['senha'] == $senha) {
			$_SESSION['username'] = $username;
			$_SESSION['senha'] = $senha;
			header("location: ../index.php") or die();
		}
		else {
			unset($_SESSION['username']);
			unset($_SESSION['senha']);
			header("location: ../login.php") or die();
		}
	}
		catch(PDOException $e) {
			echo "Ocorreu um erro:  " . $e->getMessage();
		}
?>