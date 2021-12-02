<!DOCTYPE html>
<html>
   <body>
		<?php
			include "valores_servidor.php";

	        echo "<p>Criando o Banco de Dados... </p>";
			
            try {
				$conn = new PDO("mysql:host=$sname", $uname, $pwd);
				$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			
				$sql = "CREATE DATABASE campominado";

				$conn->exec($sql);
				echo "<p>Banco de Dados criado com sucesso</p>";
				$conn = null;

				// evitando que seja criado um BD sem tabelas
		        echo "<p>Criando tabelas no banco de dados... </p>";
				
                try {
					$conn = new PDO("mysql:host=$sname;dbname=$BD", $uname, $pwd);
					$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

		    		$usuario = "CREATE TABLE usuario
		    					(	 
		    						nome varchar(100) NOT NULL,
									cpf varchar(15) NOT NULL,
									nascimento date NOT NULL,
									username varchar(25) NOT NULL,
									email varchar(100) NOT NULL,
									telefone varchar(15) NOT NULL,
									senha varchar(50) NOT NULL,
									PRIMARY KEY(username)
								)";
					$conn->exec($usuario);
					echo "<p>Tabela usuario criada com sucesso</p>";

					$partida = "CREATE TABLE partida 
								(
									codpartida int NOT NULL AUTO_INCREMENT,
		     						username varchar(25) NOT NULL,
		     						dimensao int NOT NULL,
                                    bombas int NOT NULL,
                                    modalidade varchar(15) NOT NULL,
		     						tempo int NOT NULL,
		     						resultado int NOT NULL, /* 0: perdeu  1: ganhou */
		     						data datetime NOT NULL, /* funcao = CURRENT_TIME */
                                    PRIMARY KEY(codpartida),
                                    FOREIGN KEY(username) REFERENCES usuario(username)
			    				)";

					$conn->exec($partida);
					echo "<p>Tabela partida criada com sucesso</p>";
					$conn = null;
				}
				catch(PDOException $e) {
					echo "Ocorreu um erro: " . $e->getMessage();
				}
			}
			catch(PDOException $e) {
				echo "Ocorreu um erro: " . $e->getMessage();
			}
		?>
   </body>
</html>