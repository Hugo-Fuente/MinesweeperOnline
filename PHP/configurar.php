<!DOCTYPE html>
<html lang = "pt-br">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Configurar</title>
</head>
<body>
    
<?php
    session_start();
    include('verifica_login.php');
    
    include('conexao.php');

    $sessionUser = $_SESSION['usuario'];

    $strSQL = "SELECT ncpf FROM jogador WHERE username = '".$sessionUser."'";

    $rs = mysqli_query($conexao,$strSQL);

    $row = mysqli_fetch_array($rs);

    $pegarCPF = $row['ncpf'];

    // $result = mysql_query("SELECT ncpf FROM jogador WHERE username = $sessionUser");
    // $pegarCPF = mysql_fetch_array($result);

    $dimensao = $_POST['dimensao'];
    $qbombas = $_POST['qbombas'];
    $modalidade = $_POST['modalidade'];

    $sql = "INSERT INTO partida (cpf, dimensao, qbombas, modalidade) 
    VALUES ('".$pegarCPF."' , '".$dimensao."', '".$qbombas."' , '".$modalidade."')";

    if ($conexao->query($sql) === TRUE) {
        header("Location:jogo.php");
        exit();
    } else {
    echo "Error: " . $sql . "<br>" . $conexao->error;
    }

    $conexao->close();
?>
    
</body>
</html>