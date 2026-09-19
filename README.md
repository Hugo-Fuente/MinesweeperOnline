# 💣 Campo Minado Web

Um jogo clássico de Campo Minado totalmente jogável no navegador, desenvolvido com foco na experiência do usuário, personalização de partidas e acompanhamento de progresso. O projeto conta com um sistema de contas simples, histórico de partidas e um ranking competitivo.

## 📋 Funcionalidades

* **Sistema de Usuários:** Cadastro, login e edição de perfil de jogadores.

* **Partidas Personalizáveis:** Escolha o tamanho do grid (dimensões) e a quantidade de bombas antes de cada partida.

* **Modos de Jogo:**

  * **Clássica:** O tradicional campo minado onde você joga no seu próprio ritmo, com um cronômetro progressivo.

  * **Rivotril:** Um modo contra o relógio! O tempo limite é calculado dinamicamente com base no tamanho do grid. Pense rápido ou é *Game Over*.

* **Histórico de Partidas:** Registra todas as suas partidas jogadas, salvando dimensões, quantidade de bombas, modo de jogo, tempo final e o resultado (Vitória/Derrota).

* **Ranking Geral:** Uma tabela de classificação global (ordenada usando o algoritmo *Bubble Sort*), priorizando quem venceu nos maiores grids e no menor tempo.

* **Botão Trapaça (Cheat):** Uma ajudinha extra que revela as bombas por 5 segundos para quem estiver em apuros.

## 🛠️ Tecnologias Utilizadas

* **HTML5:** Estruturação de todas as páginas da interface (Login, Jogo, Configurações, Ranking, etc.).

* **CSS3:** Estilização da interface, grids e responsividade (com tipografia externa `Odibee Sans`).

* **JavaScript (Vanilla):** Lógica do jogo (geração do grid, revelação de espaços vazios via recursividade, cronômetros), ordenação do ranking e manipulação do DOM.

* **SessionStorage / Web Storage API:** Utilizado no Front-end para simular sessões de usuários, persistir dados de login, histórico e pontuações entre as páginas.

* **PHP:** (Estrutura de backend contida no repositório para o manejo real de dados e banco de dados).

## 📂 Estrutura do Projeto

O projeto é dividido em múltiplas páginas para manter a organização e a fluidez da navegação:

* `index.html` - Dashboard principal/Home do jogador logado.

* `cadastro.html` / `login.html` - Páginas de autenticação do usuário.

* `alteracoes.html` - Página para edição dos dados do perfil.

* `configs.html` - Setup da partida (definição de grid, bombas e modalidade).

* `jogo.html` - Onde a mágica acontece. Contém a interface do jogo e cronômetros.

* `historico.html` - Tabela com o registro de todas as partidas do jogador.

* `ranking.html` - Tabela de líderes (Top players).

* `campominado.js` - Arquivo central contendo toda a lógica JavaScript do projeto.

* `style.css` - Folha de estilos global do projeto.

## 🚀 Como Executar

1. Clone este repositório para a sua máquina local:

   ```
   git clone https://github.com/seu-usuario/campo-minado-web.git
   
   ```

2. Navegue até o diretório do projeto.

3. Como o projeto front-end utiliza HTML, CSS e JS puros com armazenamento em `sessionStorage`, você pode simplesmente abrir o arquivo `cadastro.html` ou `login.html` diretamente em seu navegador web para começar a testar.

4. *(Opcional)* Se for testar a integração com a pasta `PHP`, certifique-se de rodar o projeto em um servidor local como XAMPP, WAMP ou Apache padrão, acessando via `http://localhost/seu-diretorio`.

## 🎮 Como Jogar

1. Crie uma conta na tela de **Cadastro** e faça o **Login**.

2. Clique no ícone de Play na Home.

3. Defina as **Dimensões** do campo (ex: 10 para um campo 10x10), a **Quantidade de Bombas** e a **Modalidade**.

4. Clique no grid para revelar os espaços. Os números indicam quantas bombas existem adjacentes àquela célula.

5. Limpe todos os espaços seguros para vencer. Se clicar em uma bomba, você perde!

*Desenvolvido como projeto prático de desenvolvimento web.*
