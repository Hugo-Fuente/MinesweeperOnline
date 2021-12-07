<!DOCTYPE html>
<html lang = "pt-br">
<head>
    <meta charset="UTF-8"/>
    <title>Historico</title>
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

<table id="tabelaHistorico" >
    <tr>
        <th>Username</th>
        <th>Dimensões</th>
        <th>Bombas</th>
        <th>Modalidade</th>
        <th>Tempo</th>
        <th>Resultado</th>
        <th>Data/Hora</th>
    </tr>
<?php
    include('conexao.php');
    
    $strSQL = "SELECT jogador.username,partida.dimensao,partida.qbombas,partida.modalidade,
    partida.tempo,partida.resultado,partida.datahora 
    FROM `jogador`,`partida` WHERE jogador.ncpf = partida.cpf";

    $rs = mysqli_query($conexao,$strSQL);

    while($row = mysqli_fetch_array($rs)){
        echo "<tr>";
            echo "<td>".$row['username']."</td>";
            echo "<td>".$row['dimensao']."</td>";
            echo "<td>".$row['qbombas']."</td>";
            echo "<td>".$row['modalidade']."</td>";
            echo "<td>".$row['tempo']."</td>";
            echo "<td>".$row['resultado']."</td>";
            echo "<td>".$row['datahora']."</td>";
        echo "</tr>";
    }

?>

<button class="normal" type="button" onclick="window.location.href='jogo.php'">voltar</button>

</table>

</body>
</html>