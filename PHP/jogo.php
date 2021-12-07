<!DOCTYPE html>
<html lang = "pt-br">
<head>
    <meta charset="UTF-8"/>
    <title>Jogo</title>
    <link rel="stylesheet" href="style.css" type="text/css">
    <!-- fonte usada em algumas partes do site-->
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Odibee+Sans&display=swap');
    </style>
</head>

<body>
Página do jogo aqui <br><br>

<?php
    session_start();
    include('verifica_login.php');
?>

<script>
    resultado = "perdeu";
    tempo = 3;
    sessionStorage.setItem("resultado", resultado);
    sessionStorage.setItem("tempo", tempo);
</script>


<button class="normal" type="button" onclick="window.location.href='configuracao.php'">Configurar Partida</button><br>
<button class="normal" type="button" onclick="window.location.href='historico.php'">Historico</button>
<button class="normal" type="button" onclick="window.location.href='ranking.php'">Ranking</button><br>
<button class="normal" type="button" onclick="window.location.href='editar.html'">Editar Perfil</button><br>
<button class="normal" type="button" onclick="window.location.href='fimdejogo.php'">Quando o jogo acabar, vá para essa página</button><br>
<button class="normal" type="button" onclick="window.location.href='logout.php'">Sair</button>

</body>
</html>