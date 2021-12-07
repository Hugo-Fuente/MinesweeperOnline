<!DOCTYPE html>
<html lang = "pt-br">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastrar</title>
</head>
<body>
    
    <?php

    include('conexao.php');

    $ncpf = $_POST['cpfa'];
    $username = $_POST['username'];
    $nome = $_POST['nome'];

    $date1 = $_POST['datanasc'];
    $tdate = new \DateTime($date1);
    $datanasc = $tdate->format('Y-m-d');

    $email = $_POST['email'];
    $telefone = $_POST['telefone'];
    $senha = $_POST['senha'];

    $sql = "INSERT INTO jogador (ncpf, username, nome, datanasc, email, telefone, senha) 
    VALUES ('".$ncpf."', '".$username."' , '".$nome."' , '".$datanasc."' , '".$email."' , '".$telefone."' , '".$senha."')";

    if ($conexao->query($sql) === TRUE) {
        header("Location:index.html");
        exit();
    } else {
    echo "Error: " . $sql . "<br>" . $conexao->error;
    }

    $conexao->close();
    ?>
    
</body>
</html>

