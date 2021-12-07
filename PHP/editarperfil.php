<!DOCTYPE html>
<html lang = "pt-br">
<head>
    <meta charset="UTF-8"/>
    <title>Editar Perfil</title>
    <link rel="stylesheet" href="style.css" type="text/css">
    <!-- fonte usada em algumas partes do site-->
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Odibee+Sans&display=swap');
        table, th, td {
        border: 1px solid black;
        border-collapse: collapse;
        }
    </style>
</head>

<body>
    <?php
        session_start();
    
        include('conexao.php');

        $sessionUser = $_SESSION['usuario'];

        $nome = $_POST['nome'];
        $datanasc = $_POST['datanasc'];
        $email = $_POST['email'];
        $telefone = $_POST['telefone'];
        $senha = $_POST['senha'];
        

        $sql = "UPDATE jogador
        SET nome = '$nome', datanasc = '$datanasc', email = '$email', 
        telefone = '$telefone', senha = '$senha'
        WHERE username = '$sessionUser'";

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