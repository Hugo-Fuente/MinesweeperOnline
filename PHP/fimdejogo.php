<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8"/>
    <title>Fim de Jogo</title>
    <link rel="stylesheet" href="style.css" type="text/css">
    <!-- fonte usada em algumas partes do site-->
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Odibee+Sans&display=swap');
    </style>
</head>

<body>

    <p>FIM DE JOGO</p>

    <form name="configuracao" action="resultempo.php" method="POST">
        <input class="pequeno" name="resultado" type="hidden" id="resultado" value=""/><br>
        <input class="pequeno" name="tempo" type="hidden" id="tempo" value=""/><br>
        <input class="normal" type="submit" value="jogar novamente?" name="jogarnovamente"/>
    </form>

    <script>
        r = sessionStorage.getItem("resultado");
        t = sessionStorage.getItem("tempo");
        document.getElementById("resultado").value = r;
        document.getElementById("tempo").value = t;
    </script>

</body>
</html>