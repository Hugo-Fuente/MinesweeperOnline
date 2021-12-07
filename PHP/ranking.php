<!DOCTYPE html>
<html lang = "pt-br">
<head>
    <meta charset="UTF-8"/>
    <title>Ranking</title>
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
        <th>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</th>
        <th>Username</th>
        <th>Dimensões</th>
        <th>Modalidade</th>
        <th>Tempo</th>
    </tr>
<?php
    include('conexao.php');
    
    $strSQL = "SELECT jogador.username,partida.dimensao,partida.modalidade,partida.tempo 
    FROM `jogador`,`partida` WHERE jogador.ncpf = partida.cpf AND partida.resultado='ganhou' 
    ORDER BY partida.tempo ASC LIMIT 10";

    $rs = mysqli_query($conexao,$strSQL);
    $ordem = 1;

    while($row = mysqli_fetch_array($rs)){
        echo "<tr>";
            echo "<td>".$ordem."</td>";
            echo "<td>".$row['username']."</td>";
            echo "<td>".$row['dimensao']."</td>";
            echo "<td>".$row['modalidade']."</td>";
            echo "<td>".$row['tempo']."</td>";
        echo "</tr>";
        $ordem = $ordem + 1;
    }

?>

<button class="normal" type="button" onclick="window.location.href='jogo.php'">voltar</button>

</table>

</body>
</html>