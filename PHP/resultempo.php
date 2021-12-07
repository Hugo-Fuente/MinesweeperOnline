<!DOCTYPE html>
<html lang = "pt-br">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resultado e Tempo</title>
</head>
<body>  

    <!-- SET resultado = '".$resultado."', tempo = ".$tempo."  -->
    
    <?php

    include('conexao.php');

    $resultado = "";
    $tempo = "";

    $resultado = $_POST['resultado'];
    $tempo = $_POST['tempo'];

    $sql = "UPDATE partida
    SET resultado = '$resultado', tempo = '$tempo'
    ORDER BY id DESC
    LIMIT 1";

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