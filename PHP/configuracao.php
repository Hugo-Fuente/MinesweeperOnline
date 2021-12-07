<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8"/>
    <title>Configurações</title>
    <link rel="stylesheet" href="style.css" type="text/css">
    <!-- fonte usada em algumas partes do site-->
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Odibee+Sans&display=swap');
    </style>
</head>

<body>
    <?php
    session_start();
    include('verifica_login.php');
    ?>

    <section id="tela">
        <section class="cabecalho">
            <h1 class="titulo">Configurações</h1>
        </section>    
        
        <h4 id="invalido"></h4>
        <h4 id="invalido2"></h4>

        <form name="configuracao" action="configurar.php" method="POST">
            <p>Dimensão: <input class="pequeno" type="number" name="dimensao" required /><br>

            <p>Quantidade de Bombas: <input class="pequeno" type="number" name="qbombas" required /></p><br>

            <label for="modalidade">Modalidade:</label>
            <select name="modalidade" id="modalidade" class="box" required>
                <option value="" disabled selected>Selecione</option>
                <option value="classica">Clássica</option>
                <option value="rivotril">Rivotril</option>
            </select><br><br><br>

            <input class="normal" type="submit" value="jogar" name="configuracao"/>

            <!-- <button class="normal" type="button" onclick="window.location.href='jogo.php'">jogar</button> -->
        </form>
    </section>

</body>
</html>