<!DOCTYPE html>
<html lang = "pt-br">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
</head>
<body>
    
    <?php
    session_start();

    include('conexao.php');

    // proteção contra sql injection
    $usuario = mysqli_real_escape_string($conexao, $_POST['username']);
    $senha = mysqli_real_escape_string($conexao, $_POST['senha']);

    $query = "select username from jogador where username = '{$usuario}' and senha = '{$senha}'";

    $result = mysqli_query($conexao, $query);
    
    $row = mysqli_num_rows($result);

    if($row == 1) {
        $_SESSION['usuario'] = $usuario;
        header('Location:jogo.php');
        exit();
    } else {
        header('Location:erro.html');
        exit();
    }

    $conexao->close();
    ?>
    
</body>
</html>

